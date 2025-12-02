<<<<<<< HEAD
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import ReactDOM from "react-dom/client";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router";
=======
>>>>>>> aab59614d0f01f7009fdb9739a0ff2ad5dab5e7c
import "./App.css";
import Navbar from "./Navbar";
import PostFeed from "./PostFeed";

function App() {
  return (
    <>
      <Navbar />
<<<<<<< HEAD
      const root = document.getElementById("root");
      ReactDOM.createRoot(root).render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
      , );
      <button className="btn">Default</button>
=======
      <PostFeed />
>>>>>>> aab59614d0f01f7009fdb9739a0ff2ad5dab5e7c
    </>
  );
}

export default App;
