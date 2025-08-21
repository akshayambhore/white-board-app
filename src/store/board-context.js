import { createContext } from "react";
const BoardContext =createContext(
{
    activetoolitem : "",
    isDrawing:"",
    elements: [],

    boardmousDownhandaler :() =>{},
    boardmousmovehandler :()=>{},
    boardmousuphandler :()=>{},
    handalactive :()=>{}


})
export default BoardContext;