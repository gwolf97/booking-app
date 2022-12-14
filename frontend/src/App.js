import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Hotel from "./pages/hotel/Hotel";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login isLogin={true}/>}/>
        <Route path="/register" element={<Login isLogin={false}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;