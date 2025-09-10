
import rough from "roughjs/bin/rough";
import TOOL_ITEMS from "../constants";
import { getArrowHead } from "./math";
import getStroke from "perfect-freehand";
import { isPointCloseToLine } from "./math";
const gen = rough.generator();
const  createElement= (id,x1,y1,x2,y2,{type,stroke,fill,size}) =>{
  const newele =
  {
    id,
    x1,
    y1,
    x2,
    y2,
    type,
    fill,
    stroke,
    size,
    
  };
  let options=
  {
    seed:id+1,
    fillStyle:"solid"
    
  }
  if(stroke)
    {
      options.stroke=stroke
    }
  if(fill)
    {
      options.fill=fill
    }
    if(size)
      {
        options.strokeWidth=size;
      }
  switch(type)
  {
     case TOOL_ITEMS.BRUSH:
      {
        const brushElement = 
        {id,
          points: [{x:x1,y:y1}],
          path: new Path2D(getSvgPathFromStroke(getStroke([{ x: x1, y: y1 }]))),type,stroke};
        return brushElement;
      }
    case TOOL_ITEMS.LINE:
      {
        newele.roughele=gen.line(x1, y1, x2 ,y2,options)
        break;
      }
    case TOOL_ITEMS.RECTANGLE:
      {
         newele.roughele=gen.rectangle(x1, y1, x2-x1 ,y2-y1,options)
         break; 
      }
    case TOOL_ITEMS.CIRCLE:
      {
        
        newele.roughele=gen.ellipse((x2+x1)/2,(y1+y2)/2,x2-x1 ,y2-y1,options)
         break; 
      }
    case TOOL_ITEMS.ARROW:
      {
        // const dist =Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const{x3,y3,x4,y4}=getArrowHead(x1,y1,x2,y2)

        newele.roughele=gen.linearPath([[x1,y1],[x2,y2],[x3,y3],[x2,y2],[x4,y4]],options)
        break; 
      }
    default :{
      break;
    }

  }
  return newele;

}





export const isPointNear = (element, pointX, pointY,canvas) => {
  const { x1, y1, x2, y2, type } = element;
  console.log("sdrrts");
  // const canves = document.getElementById("canvas");
  const context=canvas.getContext("2d");
  switch (type) {
    case TOOL_ITEMS.LINE:
    case TOOL_ITEMS.ARROW:
      return isPointCloseToLine(x1, y1, x2, y2, pointX, pointY);
    case TOOL_ITEMS.RECTANGLE:
    case TOOL_ITEMS.CIRCLE:
      return (
        isPointCloseToLine(x1, y1, x2, y1, pointX, pointY) ||
        isPointCloseToLine(x2, y1, x2, y2, pointX, pointY) ||
        isPointCloseToLine(x2, y2, x1, y2, pointX, pointY) ||
        isPointCloseToLine(x1, y2, x1, y1, pointX, pointY)
      );
    case TOOL_ITEMS.BRUSH:
      return context.isPointInPath(element.path, pointX, pointY);
    case TOOL_ITEMS.TEXT:
      context.font = `${element.size}px Caveat`;
      context.fillStyle = element.stroke;
      const textWidth = context.measureText(element.text).width;
      const textHeight = parseInt(element.size);
      context.restore();
      return (
        isPointCloseToLine(x1, y1, x1 + textWidth, y1, pointX, pointY) ||
        isPointCloseToLine(
          x1 + textWidth,
          y1,
          x1 + textWidth,
          y1 + textHeight,
          pointX,
          pointY
        ) ||
        isPointCloseToLine(
          x1 + textWidth,
          y1 + textHeight,
          x1,
          y1 + textHeight,
          pointX,
          pointY
        ) ||
        isPointCloseToLine(x1, y1 + textHeight, x1, y1, pointX, pointY)
      );
    default:
      throw new Error("Type not recognized");
  }
};

export default createElement;

export const getSvgPathFromStroke = (stroke) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};
