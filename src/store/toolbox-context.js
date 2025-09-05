import { createContext } from "react";

const toolboxcontext = createContext({
    toolboxstate: {},
    changestroke:  ()=>{},
    changefill : ()=>{},
    changeSize:  ()=>{}
});

export default toolboxcontext;
