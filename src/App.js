import Board from "./components/Board/Board"
import Toolbar from "./components/Toolbar";
import BoardProvider from "./store/boardprovider"


function App() {
  return (
        
      <BoardProvider>
          <Board/>
          <Toolbar/>  
      </BoardProvider>

        

   
  );
}

export default App;
