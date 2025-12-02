import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import PostFeed from "./PostFeed";

function App() {
  return (
    <div>
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
    </>
=======
      <PostFeed />
    </div>
>>>>>>> d0b5f1ff547d45a5a32c5dd5dd4a2353c679a6b2
  );
}

export default App;
