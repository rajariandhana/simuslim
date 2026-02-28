import "./App.css";

import { Routes, Route } from "react-router";

import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import Temp from "./components/Home/Temp";
import UnderMaintenance from "./components/UnderMaintenance";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/temp" element={<Temp />} />
        <Route path="/:path" element={<UnderMaintenance />} />
      </Route>
    </Routes>
  );
}

export default App;
