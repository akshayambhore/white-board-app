
import classNames from "classnames";
import { useContext } from "react";
import {
  FaSlash,
  FaRegCircle,
  FaArrowRight,
  FaPaintBrush,
  FaEraser,
  FaUndoAlt,
  FaRedoAlt,
  FaFont,
  FaDownload,
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

            <div className={classNames("toolItem",{active:activeicon==="A"})} onClick={()=>handalactive("A") }><FaSlash /></div>
            <div className={classNames("toolItem",{active:activeicon==="B"})} onClick={()=>handalactive("B") }><LuRectangleHorizontal/></div>
            <div className={classNames("toolItem",{active:activeicon==="C"})} onClick={()=>handalactive("C") }><FaRegCircle /></div>
            <div className={classNames("toolItem",{active:activeicon==="D"})} onClick={()=>handalactive("D") }><FaArrowRight/></div>
            <div className={classNames("toolItem",{active:activeicon==="E"})} onClick={()=>handalactive("E") }><FaPaintBrush /></div>
            <div className={classNames("toolItem",{active:activeicon==="F"})} onClick={()=>handalactive("F") }><  FaEraser/></div>
            <div className={classNames("toolItem",{active:activeicon==="G"})} onClick={()=>handalactive("G") }>< FaUndoAlt /></div> 
            <div className={classNames("toolItem",{active:activeicon==="H"})} onClick={()=>handalactive("H") }>< FaRedoAlt /></div> 
            <div className={classNames("toolItem",{active:activeicon==="I"})} onClick={()=>handalactive("I") }><FaFont/></div>
            <div className={classNames("toolItem",{active:activeicon==="J"})} onClick={()=>handalactive("J") }><FaDownload /></div>
        </div>
        </>
    )
}
export default Toolbar;



