import React, { useReducer} from "react";
import BoardContext from "./board-context";
import rough from "roughjs/bin/rough"
const gen=rough.generator();
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
                const { clientx, clienty } = action.payload;
                const newele =
                {
                    id: state.elements.length,
                    x1: clientx,
                    y1: clienty,
                    x2: clientx,
                    y2: clienty,
                    roughele: gen.line(clientx, clienty, clientx, clienty)


                }
                console.log(newele.roughele);
                return {
                    ...state,
                    elements: [...state.elements, newele]

                }
            }
        case ("Move_Down"): {
            if(state.elements.length===0)
                {
                    return state;

                }
            const { clientx, clienty } = action.payload;


            const newele = [...state.elements];
            const index = state.elements.length - 1;
            newele[index].x2 = clientx;
            newele[index].y2 = clienty;
            newele[index].roughele = gen.line(newele[index].x1, newele[index].y1, clientx, clienty);
            return {
                ...state,
                elements:newele
            };
        }

        default:
            return state

    }
}
const initioalboardstate =
{
    activetoolitem: "A",
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
        // setactive(tool);
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
    const boardcontextvalue =
    {
        activetoolitem: boardstate.activetoolitem,
        elements: boardstate.elements,
        handalactive,
        boardmousDownhandaler,
        boardmousmovehandler

    }
    return (
        <BoardContext.Provider value={boardcontextvalue}>{children} </BoardContext.Provider>
    );
};
export default BoardProvider;