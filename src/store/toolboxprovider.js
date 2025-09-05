import React, {  useReducer } from "react";
import toolboxcontext from "./toolbox-context";
import {TOOL_ITEMS,TOOLBOX_ACTIONS, COLORS } from "../constants";
function toolboxReducer(state, action) {
    switch(action.type)
    {
        case  TOOLBOX_ACTIONS.CHANGE_STROKE:
        {
            const newstate={...state}
            newstate[action.payload.tool].stroke=action.payload.stroke;
            return newstate
            
        }
         case  TOOLBOX_ACTIONS.CHANGE_FILL:
        {
            const newstate={...state}
            newstate[action.payload.tool].fill=action.payload.fill;
            return newstate
            
        }
        case  TOOLBOX_ACTIONS.CHANGE_SIZE:
        {
            const newstate={...state}
            newstate[action.payload.tool].size=action.payload.size;
            return newstate
            
        }
        default :
        {
            return state;
        }
      
         
    }

}
const intialtoolboxstate =
{
    [TOOL_ITEMS.LINE]:
    {
        stroke: COLORS.BLACK,
        size: 1,
    },
    [TOOL_ITEMS.ARROW]:
    {
        stroke: COLORS.BLACK,
        size: 1,
    },

    [TOOL_ITEMS.RECTANGLE]:
    {
        stroke: COLORS.BLACK,
        size: 1,
        fill: NaN
    },
    [TOOL_ITEMS.CIRCLE]:
    {
        stroke: COLORS.BLACK,
        size: 1,
        fill: null
    },
}

const Toolboxprovider = ({ children }) => {
    const [toolboxstate , dispatchtoolbooxaction] = useReducer(toolboxReducer, intialtoolboxstate);
    const  handalestrokechang = (tool,stroke)=>{

        dispatchtoolbooxaction(
            {
                type:TOOLBOX_ACTIONS.CHANGE_STROKE,
                payload:{tool,stroke}
            })
        
    }
    const handalefillechang =(tool,fill)=>
    {
          dispatchtoolbooxaction(
            {
                type:TOOLBOX_ACTIONS.CHANGE_FILL,
                payload:{tool,fill}
            })
    }
     const handalesizechang =(tool,size)=>
    {
          dispatchtoolbooxaction(
            {
                type:TOOLBOX_ACTIONS.CHANGE_SIZE,
                payload:{tool,size}
            })
    }
    const toolboxcontextvalue =
    {
        toolboxstate,
        changestroke:handalestrokechang,
       changefill:handalefillechang ,
       changeSize:handalesizechang,

    };

    return (<toolboxcontext.Provider value={toolboxcontextvalue}>{children}</toolboxcontext.Provider>)
}

export default Toolboxprovider;
