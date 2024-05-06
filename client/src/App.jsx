import Home from "./Pages/HomePage";
import Post from "./Pages/PostsPage";
import AddPost from "./Pages/AddPostPage";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import PostsByCategory from "./Pages/PostByCategory";

export default function App() {
  return (
    <div className="main-div">
      <h1 id="h1">Welcome to Post-Book</h1>
      <nav>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/posts">View Posts</Link>
        <Link className="nav-link" to="/posts-by-category">View by Category</Link>
        <Link className="nav-link" to="/add">Add Posts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/posts-by-category" element={<PostsByCategory />} />
        <Route path="/add" element={<AddPost />} />
      </Routes>

      <footer>Made by Precious Dafitohwo &copy; 2024</footer>
    </div>
  );
}