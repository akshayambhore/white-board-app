import Board from "./components/Board/Board"
import Toolbar from "./components/Toolbar";
import BoardProvider from "./store/boardprovider"
import Toolboxprovider from "./store/toolboxprovider";
import Toolbox from "./components/Toolbox";


function App() {
  return (
        
      <BoardProvider>
        <Toolboxprovider>
          <Board/>
          <Toolbox/>
          <Toolbar/>  
        </Toolboxprovider>
      </BoardProvider>

        

   
  );
}

export default App;
