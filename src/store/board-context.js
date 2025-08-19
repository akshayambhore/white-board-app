import { createContext } from "react";
const BoardContext =createContext(
{
    activetoolitem : "",
    elements: [],
    boardmousDownhandaler :() =>{},
    boardmousmovehandler :()=>{},
    boardmousuphandler :()=>{},
    handalactive :()=>{}


})
export default BoardContext;