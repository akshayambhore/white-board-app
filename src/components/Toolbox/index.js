import { useContext } from "react";
import { COLORS, FILL_TOOL_TYPES, SIZE_TOOL_TYPES, STROKE_TOOL_TYPES } from "../../constants";
import "./toolbox.css"
import toolboxcontext from "../../store/toolbox-context";
import BoardContext from "../../store/board-context";
const Toolbox = () => {
    const { activetoolitem } = useContext(BoardContext)
    const { toolboxstate, changestroke, changefill,changeSize } = useContext(toolboxcontext);
    const strokecolore = toolboxstate[activetoolitem]?.stroke;
    const fillcolore = toolboxstate[activetoolitem]?.fill;
    const size = toolboxstate[activetoolitem]?.size;
  
    return (
        <>
        <div className="maincontainer">
            {(STROKE_TOOL_TYPES.includes(activetoolitem)) && 
            (<div className="stroke-container">
                <div className="stroke">
                    STROKE COLOR
                </div>
                <div className="colores">
                    <div>
                            <input
                                className="coolorPicker"
                                type="color"
                                value={strokecolore}
                                onChange={(e) => changestroke(activetoolitem, e.target.value)}
                            ></input>
                            </div>
                    {Object.keys(COLORS).map(colorname => {
                        return (<div key={colorname} className={strokecolore === COLORS[colorname] ? "colore-a" : "colore"} style={{ background: COLORS[colorname] }} onClick={() => changestroke(activetoolitem, COLORS[colorname])}>

                        </div>)
                    })}

                </div>
            </div>)}
            {(FILL_TOOL_TYPES.includes(activetoolitem)) && (<div className="fill-container">
                <div className="stroke">
                    FILL COLOR
                    </div>
                    <div className="colores">
                        <div>
                            <input
                                className="coolorPicker"
                                type="color"
                                value={fillcolore}
                                onChange={(e) => changefill(activetoolitem, e.target.value)}
                            ></input>
                        </div>
                        {Object.keys(COLORS).map(colorname => {
                        
                        return (<div key={colorname} className={fillcolore === COLORS[colorname] ? "colore-a" : "colore"} style={{ background: COLORS[colorname] }} onClick={() => changefill(activetoolitem, COLORS[colorname])}>

                        </div>)
                    })}

                </div>
            </div>)
            }
            {(SIZE_TOOL_TYPES.includes(activetoolitem)) && (<div className="container">
                <div className="Size">
                    BRUSH SIZE
                </div>
                <div >
                    <input
                        type="range"
                        min={1}
                        max={10}
                        step={1}

                        value={size}
                        onChange={(event) => changeSize(activetoolitem, event.target.value)}
                    ></input>
                </div>
            </div>)
            }
        </div>
        </>

    )
}
export default Toolbox;