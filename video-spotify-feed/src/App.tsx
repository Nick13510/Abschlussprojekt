import "./App.css";
import Login from "./Login";
import Navbar from "./Navbar";
import PostFeed from "./PostFeed";
import { Routes, Route } from "react-router";
import RegisterPage from "./Register";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostFeed />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
