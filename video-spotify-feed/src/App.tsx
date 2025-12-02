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
<<<<<<< HEAD
        <Route path="/register" element={<RegisterPage />} />
=======
        <Route path="Login" element={<Login />} />
>>>>>>> 102f08fec8a18d3c86f20c29ab17172a7f1f7f8c
      </Routes>
    </div>
  );
}

export default App;
