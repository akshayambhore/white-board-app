import { createContext } from "react";
const BoardContext =createContext(
{
    activetoolitem : "",
    elements: [],
    boardmousDownhandaler :() =>{},
    handalactive :()=>{}


})
export default BoardContext;