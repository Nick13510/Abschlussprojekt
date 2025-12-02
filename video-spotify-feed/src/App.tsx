import "./App.css";
import Login from "./Login";
import Navbar from "./Navbar";
import PostFeed from "./PostFeed";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostFeed />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
