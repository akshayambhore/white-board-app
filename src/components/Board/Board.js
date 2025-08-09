import { useRef, useEffect, useContext   } from "react";
import rough from "roughjs";
import BoardContext from "../../store/board-context";


function Board()
{
    const canvasRef = useRef();
    const {elements, boardmousDownhandaler} = useContext(BoardContext);
    useEffect(()=>
        {
            const canvas=canvasRef.current;
            canvas.width=window.innerWidth;
            canvas.height=window.innerHeight;
            
        },[])
    useEffect(()=>
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
              
                boardmousDownhandaler(event);

            };
        return(
            <canvas ref={canvasRef} onMouseDown={handalmousdown}/>
        )
        
}
export default Board;
