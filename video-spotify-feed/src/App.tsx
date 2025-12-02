import "./App.css";
import Navbar from "./Navbar";
import PostFeed from "./PostFeed";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostFeed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
