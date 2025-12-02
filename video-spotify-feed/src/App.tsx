import "./App.css";
import Navbar from "./Navbar";
import PostFeed from "./PostFeed";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostFeed />} />
      </Routes>
    </div>
  );
}

export default App;
