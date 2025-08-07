import { useRef, useEffect   } from "react";
import rough from "roughjs";


function Board()
{
    const canvasRef = useRef();
    useEffect(()=>
        {
            const canvas=canvasRef.current;
            canvas.width=window.innerWidth;
            canvas.height=window.innerHeight;
            // const context = getContext("2d");
            const roughCanvas=rough.canvas(canvas);
            let gearetor=roughCanvas.generator;
            let rec1=gearetor.rectangle(10,10,100,100);
            roughCanvas.draw(rec1);
        })
        return(
            <canvas ref={canvasRef}/>
        )
        
}
export default Board;
