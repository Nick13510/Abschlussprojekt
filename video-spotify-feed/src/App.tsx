import { useState } from "react";
import reactLogo from "./assets/react.svg";
import ReactDOM from "react-dom/client";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Navbar from "./Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
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
  );
}

export default App;
