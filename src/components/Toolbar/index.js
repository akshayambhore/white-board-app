import TOOL_ITEMS from "../../constants";
import classNames from "classnames";
import { useContext } from "react";
import {
  FaSlash,
  FaRegCircle,
  FaArrowRight,
  FaPaintBrush,
//   FaEraser,
//   FaFont,
//   FaUndoAlt,
//   FaRedoAlt,
//   FaDownload,
} from "react-icons/fa";
import{
LuRectangleHorizontal 
} from "react-icons/lu";
import "./toolbar.css";
import BoardContext from "../../store/board-context";
function Toolbar ()
{
    const {activeicon, handalactive}=useContext(BoardContext);


    return(
        <>
        <div className="toolbar-container">

            <div className={classNames("toolItem",{active:activeicon===TOOL_ITEMS.LINE})} onClick={()=>handalactive(TOOL_ITEMS.LINE) }><FaSlash /></div>
            <div className={classNames("toolItem",{active:activeicon===TOOL_ITEMS.RECTANGLE})} onClick={()=>handalactive(TOOL_ITEMS.RECTANGLE) }><LuRectangleHorizontal/></div>
            <div className={classNames("toolItem",{active:activeicon===TOOL_ITEMS.CIRCLE})} onClick={()=>handalactive(TOOL_ITEMS.CIRCLE) }><FaRegCircle /></div>
            <div className={classNames("toolItem",{active:activeicon===TOOL_ITEMS.ARROW})} onClick={()=>handalactive(TOOL_ITEMS.ARROW) }><FaArrowRight/></div>
            <div className={classNames("toolItem",{active:activeicon===TOOL_ITEMS.BRUSH})} onClick={()=>handalactive(TOOL_ITEMS.BRUSH) }><FaPaintBrush /></div>
            {/* <div className={classNames("toolItem",{active:activeicon===TOOL_ITEMS.ERASER})} onClick={()=>handalactive("F") }><  FaEraser/></div> */}
            {/* <div className onClick={ undo }>< FaUndoAlt /></div> 
            <div classNameonClick={ redo }>< FaRedoAlt /></div>  */}
            {/* <div className={classNames("toolItem",{active:activeicon==="TOOL_ITEMS.TEXT"})} onClick={()=>handalactive("I") }><FaFont/></div> */}
            {/* <div onClick={()=>handaldawenload() }><FaDownload /></div> */}
        </div>
        </>
    )
}
export default Toolbar;



