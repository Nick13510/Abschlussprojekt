import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostFeed />} />
      </Routes>
    </BrowserRouter>
=======
    <>
      <div>
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
      </div>
    </>
>>>>>>> 12bc6246428a09feebe62f4d28fbc7b43bafb9c9
  );
}

export default App;
