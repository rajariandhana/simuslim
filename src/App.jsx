import "./App.css";

import { Routes, Route } from "react-router";

import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import Qibla from "./components/Qibla/Qibla";
import UnderMaintenance from "./components/UnderMaintenance";
import Temp from "./components/Temp";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/qibla" element={<Qibla />} />
        <Route path="/temp" element={<Temp />} />
        <Route path="/:path" element={<UnderMaintenance />} />
      </Route>
    </Routes>
  );
}

export default App;
