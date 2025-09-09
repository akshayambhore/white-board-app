import { useReducer } from "react";
import BoardContext from "./board-context";
import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "../utils/element";
import createElement from "../utils/element";
import TOOL_ITEMS from "../constants";


const boardReducer = (state, action) => {

    switch (action.type) {
        case "change_tool":
            {
                return {
                    ...state,
                    activetoolitem: action.payload.tool

                }
            }

        case ("Draw_Down"):
            {
                if (!state.activetoolitem) {
                    return state;
                }
                const { clientx, clienty, stroke, fill, size } = action.payload;

                const newele = createElement(state.elements.length, clientx, clienty, clientx, clienty, { type: state.activetoolitem, stroke, fill, size })

                console.log(newele.type);

                return {
                    ...state, isDrawing: true,
                    elements: [...state.elements, newele]

                }


            }
        case ("Draw_Move"): {
            if (state.elements.length === 0 || !state.isDrawing) {
                return state;

            }
            const { clientx, clienty, stroke, fill, size } = action.payload;
            const newele = [...state.elements];
            const index = state.elements.length - 1;
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
        case ("Draw_up"):
            {
                return {
                    ...state,
                    isDrawing: false,
                }
            }

        default:
            return state

    }
}
const initioalboardstate =
{
    activetoolitem: null,
    isDrawing: false,
    elements: []

};
const BoardProvider = ({ children }) => {
    const [boardstate, dispatchboardaction] = useReducer(boardReducer, initioalboardstate)


    const handalactive = (tool) => {
        dispatchboardaction({
            type: "change_tool",
            payload:
            {
                tool,
            }
        })

    }
    const boardmousDownhandaler = (event, toolboxstate) => {
        const clientx = event.clientX;
        const clienty = event.clientY;

        dispatchboardaction(
            {
                type: "Draw_Down",
                payload:
                {
                    clientx, clienty, stroke: toolboxstate[boardstate.activetoolitem]?.stroke, fill: toolboxstate[boardstate.activetoolitem]?.fill, size: toolboxstate[boardstate.activetoolitem]?.size
                }
            })

    }
    const boardmousmovehandler = (event, toolboxstate) => {
        const clientx = event.clientX;
        const clienty = event.clientY;

        dispatchboardaction(
            {
                type: "Draw_Move",
                payload:
                {
                    clientx, clienty, stroke: toolboxstate[boardstate.activetoolitem]?.stroke, fill: toolboxstate[boardstate.activetoolitem]?.fill, size: toolboxstate[boardstate.activetoolitem]?.size

                }
            })
    }
    const boardmousuphandler = (event) => {
        dispatchboardaction(
            {
                type: "Draw_up",

            })

    }
    const boardcontextvalue =
    {
        activetoolitem: boardstate.activetoolitem,
        elements: boardstate.elements,
        handalactive,
        boardmousDownhandaler,
        boardmousmovehandler,
        boardmousuphandler

    }
    return (
        <BoardContext.Provider value={boardcontextvalue}>{children} </BoardContext.Provider>
    );
};
export default BoardProvider;