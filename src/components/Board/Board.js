import { useRef, useLayoutEffect, useEffect, useContext } from "react";
import rough from "roughjs";
import BoardContext from "../../store/board-context";
import toolboxcontext from "../../store/toolbox-context";
import TOOL_ITEMS, { TOOL_ACTION_TYPES } from "../../constants";


function Board() {
    const canvasRef = useRef();
    const { elements, boardmousDownhandaler, boardmousmovehandler, boardmousuphandler,toolActionType,undo,redo } = useContext(BoardContext);
    const { toolboxstate } = useContext(toolboxcontext);
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }, [])
    useEffect (()=>
        {
            function handelkeydown(event)
            {
                if(event.ctrlKey&&event.key==="z")
                    {
                        undo();
                    }
                else if(event.ctrlKey&&event.key==="y")
                    {
                        redo();
                    }
            }

            document.addEventListener("keydown",handelkeydown)
            return ()=>{
                document.removeEventListener("keydown" , handelkeydown)
            }
        },[undo,redo])

    useLayoutEffect(() => {

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const roughCanvas = rough.canvas(canvas);
        context.save();
        // let gearetor=roughCanvas.generator;
        // let rec1=gearetor.rectangle(100,100,100,100);
        // roughCanvas.draw(rec1);

        elements.forEach(element => {
            switch (element.type) {
                case TOOL_ITEMS.LINE:
                case TOOL_ITEMS.RECTANGLE:
                case TOOL_ITEMS.CIRCLE:
                case TOOL_ITEMS.ARROW:
                    roughCanvas.draw(element.roughele);
                    break;
                case TOOL_ITEMS.BRUSH:
                    context.fillStyle = element.stroke;
                    context.fill(element.path);
                   
                    break;
                case TOOL_ITEMS.TEXT:
                    console.log("dkfjhbgvnio");
                    break;
                default:
                    
                    throw new Error("Type not recog");

            }

        })
         context.restore();
        return () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [elements])
    const handalmousdown = (event) => {

        boardmousDownhandaler(event, toolboxstate,canvasRef.current);

    };
    const handalmousmove = (event) => {
        boardmousmovehandler(event, toolboxstate,canvasRef.current);
    }
    const handalmousup = () => {
        boardmousuphandler();
    }
    return (
        <>
        { toolActionType === TOOL_ACTION_TYPES.WRITING&&<textarea
        type="text"
        style={{
            top:elements[elements.length-1].y1,
            left:elements[elements.lastIndexOf-1].x1,
            fontSize:`${elements[elements.length-1]?.size}px`,
            color:elements[elements.length-1]?.stroke,
        }}
        // onBlur={()=>textareablur(event.target.value)}
        />}
        <canvas id="canvas" ref={canvasRef} onMouseDown={handalmousdown} onMouseMove={handalmousmove} onMouseUp={handalmousup} /></> 
        )

}
export default Board;
