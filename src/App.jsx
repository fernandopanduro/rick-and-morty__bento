import { Routes, Route } from "react-router-dom";
import Character from "./pages/character";

import Home from "./pages/home";

function App() {
  return (
    <main>
      <div className="bg"></div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
      </Routes>
    </main>
  );
}

export default App;
