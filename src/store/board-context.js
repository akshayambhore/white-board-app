import { createContext } from "react";
import { TOOL_ACTION_TYPES } from "../constants";
const BoardContext =createContext(
{
    
    activetoolitem: null,
    toolActionType: TOOL_ACTION_TYPES.NONE,
    elements: [],
    history:[[]],
    index:0,

    boardmousDownhandaler :() =>{},
    boardmousmovehandler :()=>{},
    boardmousuphandler :()=>{},
    handalactive :()=>{}


})
export default BoardContext;