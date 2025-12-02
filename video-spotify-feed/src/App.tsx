import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Navbar from "./Navbar";
import PostFeed from "./PostFeed";

function App() {
  return (
    <div>
      <Navbar />
      <PostFeed />
      const root = document.getElementById("root");
      ReactDOM.createRoot(root).render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
      , );
    </div>
  );
}

export default App;
