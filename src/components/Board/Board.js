import { useRef, useLayoutEffect,useEffect, useContext   } from "react";
import rough from "roughjs";
import BoardContext from "../../store/board-context";
import toolboxcontext from "../../store/toolbox-context";


function Board()
{
    const canvasRef = useRef();
    const {elements, boardmousDownhandaler, boardmousmovehandler,boardmousuphandler} = useContext(BoardContext);
    const {toolboxstate}=useContext(toolboxcontext);
    useEffect(()=>
        {
            const canvas=canvasRef.current;
            canvas.width=window.innerWidth;
            canvas.height=window.innerHeight;
            
        },[]) 
        useLayoutEffect(()=>
        {  

            const canvas=canvasRef.current;
            const context = canvas.getContext("2d");
            const roughCanvas=rough.canvas(canvas);
            context.save();
            // let gearetor=roughCanvas.generator;
            // let rec1=gearetor.rectangle(100,100,100,100);
            // roughCanvas.draw(rec1);
            elements.forEach(element=>
                {
                    roughCanvas.draw(element.roughele)
                })
            return()=>{
                context.clearRect(0,0,canvas.width,canvas.height);
            };
        },[elements])
        const handalmousdown =(event)=>
            {
              
                boardmousDownhandaler(event,toolboxstate);

            };
        const handalmousmove=(event)=>
            {
                boardmousmovehandler(event,toolboxstate);
            }
        const handalmousup=(event)=>{
                 boardmousuphandler(event,toolboxstate);
            }
        return(
            <canvas ref={canvasRef} onMouseDown={handalmousdown} onMouseMove={handalmousmove} onMouseUp={handalmousup}/>
        )
        
}
export default Board;
