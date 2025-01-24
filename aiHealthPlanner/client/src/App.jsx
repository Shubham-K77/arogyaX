import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import View from "./pages/View";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-plan" element={<Create />} />
      <Route path="/view-plan/:id" element={<View />} />
    </Routes>
  );
};

export default App;
