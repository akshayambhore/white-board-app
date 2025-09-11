import { useReducer } from "react";
import BoardContext from "./board-context";
import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "../utils/element";
import createElement from "../utils/element";
import { isPointNear } from "../utils/element";
import TOOL_ITEMS, { BOARD_ACTIONS, TOOL_ACTION_TYPES } from "../constants";


const boardReducer = (state, action) => {

    switch (action.type) {
        case BOARD_ACTIONS.CHANGE_TOOL:
            {
                return {
                    ...state,
                    activetoolitem: action.payload.tool

                }
            }


        case BOARD_ACTIONS.CHANGE_ACTION_TYPE:
            {

                return {
                    ...state,
                    toolActionType: action.payload.actionType,
                };
            }

        case BOARD_ACTIONS.DRAW_DOWN:
            {
                if (!state.activetoolitem) {
                    return state;
                }
                const { clientx, clienty, stroke, fill, size } = action.payload;

                const newele = createElement(state.elements.length, clientx, clienty, clientx, clienty, { type: state.activetoolitem, stroke, fill, size })

                console.log(newele.type);

                return {
                    ...state, toolActionType: state.activetoolitem === TOOL_ITEMS.TEXT ? TOOL_ACTION_TYPES.WRITING : TOOL_ACTION_TYPES.DRAWING,
                    elements: [...state.elements, newele]

                }


            }
        case BOARD_ACTIONS.DRAW_MOVE: {
            if (state.toolActionType === TOOL_ACTION_TYPES.WRITING) return;
            if (state.elements.length === 0 || state.toolActionType === TOOL_ACTION_TYPES.NONE) {
                return state;

            }
            const { clientx, clienty, stroke, fill, size } = action.payload;
            const newele = [...state.elements];
            const index = state.elements.length - 1;
            console.log(state.toolActionType)
            const { type } = newele[index]
            switch (type) {
                case (TOOL_ITEMS.ARROW):
                case (TOOL_ITEMS.RECTANGLE):
                case (TOOL_ITEMS.CIRCLE):
                case (TOOL_ITEMS.LINE):
                    {
                        const { x1, y1 } = newele[index];
                        const ele = createElement(index, x1, y1, clientx, clienty, { type: state.activetoolitem, stroke, fill, size })
                        newele[index] = ele;
                        return {
                            ...state,
                            elements: newele
                        };
                    };
                case (TOOL_ITEMS.BRUSH): {
                    newele[index].points = [...newele[index].points, { x: clientx, y: clienty }]
                    newele[index].path = new Path2D(getSvgPathFromStroke(getStroke(newele[index].points)))
                    return { ...state, elements: newele }
                }
               
                default:
                    throw new Error("Type not recognized");
            }

        }

        case BOARD_ACTIONS.ERASE:
            {
                const { clientx, clienty, canvas } = action.payload;
                let newelements = [...state.elements]
                newelements = newelements.filter((element) => {
                    return !isPointNear(element, clientx, clienty, canvas);
                })
                return { ...state, elements: newelements }

            }
        case BOARD_ACTIONS.DRAW_UP:
            {
                const elementscopy = [...state.elements];
                const newhistory = state.history.slice(0, state.index + 1)
                newhistory.push(elementscopy)
                return {
                    ...state,
                    history: newhistory,
                    index: state.index + 1,
                }
            }
             case (BOARD_ACTIONS.UNDO):
                    {

                        if (state.index <= 0) {
                            return state
                        }
                        return {
                            ...state,
                            elements: state.history[state.index - 1],
                            index: state.index - 1,
                        }

                    }
                case (BOARD_ACTIONS.REDO):
                    {
                        if (state.index >= state.history.length - 1) {
                            return state
                        }
                        return {
                            ...state,
                            elements: state.history[state.index + 1],
                            index: state.index + 1,
                        }
                    }
        default:
            return state

    }
}
const initioalboardstate = {
    activetoolitem: null,
    toolActionType: TOOL_ACTION_TYPES.NONE,
    elements: [],
    history: [[]],
    index: 0,
};

const BoardProvider = ({ children }) => {
    const [boardstate, dispatchboardaction] = useReducer(boardReducer, initioalboardstate)


    const handalactive = (tool) => {
        dispatchboardaction({
            type: BOARD_ACTIONS.CHANGE_TOOL,
            payload:
            {
                tool,
            }
        })

    }
    const boardmousDownhandaler = (event, toolboxstate, canvas) => {
        const clientx = event.clientX;
        const clienty = event.clientY;
        if (boardstate.activetoolitem === TOOL_ITEMS.ERASER) {
            dispatchboardaction(
                {
                    type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
                    payload:
                    {
                        actionType: TOOL_ACTION_TYPES.ERASING
                    }
                })
            return

        }
        dispatchboardaction(
            {
                type: BOARD_ACTIONS.DRAW_DOWN,
                payload:
                {
                    clientx, clienty, stroke: toolboxstate[boardstate.activetoolitem]?.stroke, fill: toolboxstate[boardstate.activetoolitem]?.fill, size: toolboxstate[boardstate.activetoolitem]?.size
                }
            })

    }
    const boardmousmovehandler = (event, toolboxstate, canvas) => {
        if (boardstate.toolActionType === TOOL_ACTION_TYPES.WRITING) return;

        const clientx = event.clientX;
        const clienty = event.clientY;
        if (boardstate.toolActionType === TOOL_ACTION_TYPES.DRAWING) {
            dispatchboardaction(
                {
                    type: BOARD_ACTIONS.DRAW_MOVE,

                    payload:
                    {
                        clientx, clienty, stroke: toolboxstate[boardstate.activetoolitem]?.stroke, fill: toolboxstate[boardstate.activetoolitem]?.fill, size: toolboxstate[boardstate.activetoolitem]?.size

                    }

                })
            return
        }
        else if (boardstate.toolActionType === TOOL_ACTION_TYPES.ERASING) {
            dispatchboardaction(
                {
                    type: BOARD_ACTIONS.ERASE,

                    payload:
                    {
                        clientx, clienty, canvas
                    }
                })
        }

    }
     const boardundohandler =()=>
        {
            dispatchboardaction(
                {
                    type: BOARD_ACTIONS.UNDO
                })
        }
    const boardredohandler =()=>
        {
              dispatchboardaction(
                {
                    type: BOARD_ACTIONS.REDO
                })
        }
    const boardmousuphandler = (event) => {
        if (boardstate.toolActionType === TOOL_ACTION_TYPES.WRITING) return;
        if (boardstate.toolActionType === TOOL_ACTION_TYPES.DRAWING) {
            dispatchboardaction
                (
                    {
                        type: BOARD_ACTIONS.DRAW_UP,
                    }
                )
        }
        dispatchboardaction(
            {
                type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
                payload: {
                    toolActionType: TOOL_ACTION_TYPES.NONE
                }
            })

    }

    const boardcontextvalue =
    {
        activetoolitem: boardstate.activetoolitem,
        elements: boardstate.elements,
        handalactive,
        boardmousDownhandaler,
        boardmousmovehandler,
        boardmousuphandler,
        undo: boardundohandler,
        redo: boardredohandler
    }
    return (
        <BoardContext.Provider value={boardcontextvalue}>{children} </BoardContext.Provider>
    );
};
export default BoardProvider;