import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./components/register";
import Doorprize from "./components/doorprize";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Register />} />
          <Route path="/doorprize" element={<Doorprize />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
