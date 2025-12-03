import "./App.css";
import Login from "./Login";
import Navbar from "./Navbar";
import PostFeed from "./PostFeed";
import { Routes, Route } from "react-router";
import RegisterPage from "./Register";
import DetailPage from "./components/DetailPage";
import SearchPage from "./SearchPage";
import UserProfile from "./UserProfile";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostFeed />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="detail/:id" element={<DetailPage />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
