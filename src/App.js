import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import All from "./All";
import Next from "./Next";
import Prev from "./Prev";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">all</Link>
          </li>
          <li>
            <Link to="/next">next</Link>
          </li>
          <li>
            <Link to="/prev">prev</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<All />} />
        <Route path="/next" element={<Next />} />
        <Route path="/prev" element={<Prev />} />
      </Routes>
    </>
  );
}

export default App;
