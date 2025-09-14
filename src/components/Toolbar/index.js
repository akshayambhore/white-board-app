import TOOL_ITEMS from "../../constants";
import classNames from "classnames";
import {  useContext } from "react";
import {
  FaSlash,
  FaRegCircle,
  FaArrowRight,
  FaPaintBrush,
  FaEraser,
  FaFont,
  FaUndoAlt,
  FaRedoAlt,
  FaDownload,
} from "react-icons/fa";
import{
LuRectangleHorizontal 
} from "react-icons/lu";
import "./toolbar.css";
import BoardContext from "../../store/board-context";
function Toolbar ()
{
    const {activetoolitem, handalactive,undo,redo}=useContext(BoardContext);
     const handaldawenload =()=>
        {
            const canvas=document.getElementById("canvas");
            console.log(canvas)
            const data = canvas.toDataURL("image/jpg");
            const anchor = document.createElement("a");
            anchor.href=data;
            anchor.download="board.jpg";
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);

        }


    return(
        <>
        <div className="toolbar-container">

            <div className={classNames("toolItem",{active:activetoolitem===TOOL_ITEMS.LINE})} onClick={()=>handalactive(TOOL_ITEMS.LINE) }><FaSlash /></div>
            <div className={classNames("toolItem",{active:activetoolitem===TOOL_ITEMS.RECTANGLE})} onClick={()=>handalactive(TOOL_ITEMS.RECTANGLE) }><LuRectangleHorizontal/></div>
            <div className={classNames("toolItem",{active:activetoolitem===TOOL_ITEMS.CIRCLE})} onClick={()=>handalactive(TOOL_ITEMS.CIRCLE) }><FaRegCircle /></div>
            <div className={classNames("toolItem",{active:activetoolitem===TOOL_ITEMS.ARROW})} onClick={()=>handalactive(TOOL_ITEMS.ARROW) }><FaArrowRight/></div>
            <div className={classNames("toolItem",{active:activetoolitem===TOOL_ITEMS.BRUSH})} onClick={()=>handalactive(TOOL_ITEMS.BRUSH) }><FaPaintBrush /></div>
            <div className={classNames("toolItem",{active:activetoolitem===TOOL_ITEMS.ERASER})} onClick={()=>handalactive(TOOL_ITEMS.ERASER) }><  FaEraser/></div>
            <div className={classNames("toolItem",{active:activetoolitem===TOOL_ITEMS.TEXT})} onClick={()=>handalactive(TOOL_ITEMS.TEXT) }><FaFont/></div>
            <div className="toolItem" onClick={ undo }>< FaUndoAlt /></div> 
            <div className="toolItem"onClick={ redo }>< FaRedoAlt /></div> 
            <div className="toolItem"onClick={ handaldawenload }><FaDownload /></div>
        </div>
        </>
    )
}
export default Toolbar;



