
import rough from "roughjs/bin/rough";
import TOOL_ITEMS from "../constants";
const gen = rough.generator();
const  createElement= (id,x1,y1,x2,y2,{type}) =>{
  const newele =
  {
    id,
    x1,
    y1,
    x2,
    y2
  };
  
  
  switch(type)
  {
    case TOOL_ITEMS.LINE:
      {
        newele.roughele=gen.line(x1, y1, x2 ,y2)
        break;
      }
    case TOOL_ITEMS.RECTANGLE:
      {
         newele.roughele=gen.rectangle(x1, y1, x2-x1 ,y2-y1)
         break; 
      }
       case TOOL_ITEMS.CIRCLE:
      {
        const diameter=Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        newele.roughele=gen.circle((x2+x1)/2,(y1+y2)/2,diameter)
         break; 
      }
    default :{
      break;
    }

  }
  return newele;

}





export default createElement;