import "./App.css";

import { Routes, Route } from "react-router";

import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import UnderMaintenance from "./components/UnderMaintenance";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:path" element={<UnderMaintenance />} />
      </Route>
    </Routes>
  );
}

export default App;
