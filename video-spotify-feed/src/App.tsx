import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import PostFeed from "./PostFeed";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <div>
      <>
        <Navbar />
        const root = document.getElementById("root");
        ReactDOM.createRoot(root).render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/" element={<App />} />
          </Routes>
        </BrowserRouter>
        , );
      </>
    </div>
  );
}

export default App;
