import React, { useReducer } from "react";
import BoardContext from "./board-context";

import createElement from "../utils/element";

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
                    const { clientx, clienty } = action.payload;

                    const newele = createElement(state.elements.length, clientx, clienty, clientx, clienty, { type: state.activetoolitem })

                    console.log(newele.roughele);
                    return {
                        ...state, isDrawing: true,
                        elements: [...state.elements, newele]

                    }
                

            }
        case ("Move_Down"): {
            if (state.elements.length === 0 || !state.isDrawing) {
                return state;

            }
            const { clientx, clienty } = action.payload;
            const newele = [...state.elements];
            const index = state.elements.length - 1;
            const { x1, y1 } = newele[index];
            const ele = createElement(index, x1, y1, clientx, clienty, { type: state.activetoolitem })
            newele[index] = ele;
            return {
                ...state,
                elements: newele
            };

        }
        case ("Move_up"):
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
    const boardmousDownhandaler = (event) => {
        const clientx = event.clientX;
        const clienty = event.clientY;

        dispatchboardaction(
            {
                type: "Draw_Down",
                payload:
                {
                    clientx, clienty
                }
            })

    }
    const boardmousmovehandler = (event) => {
        const clientx = event.clientX;
        const clienty = event.clientY;

        dispatchboardaction(
            {
                type: "Move_Down",
                payload:
                {
                    clientx, clienty
                }
            })
    }
    const boardmousuphandler = (event) => {
        dispatchboardaction(
            {
                type: "Move_up",

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