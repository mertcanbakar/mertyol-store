import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Basket from "./pages/basket/Basket";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </>
  );
}

export default App;
