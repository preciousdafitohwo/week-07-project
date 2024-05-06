import { useState, useEffect } from "react";

export default function PostsByCategory() {
  // State to store posts and selected category
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch posts by category
  useEffect(() => {
    if (selectedCategory) {
      fetchPostsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Function to fetch posts by category
  async function fetchPostsByCategory(category) {
    const response = await fetch(`https://post-book-server.onrender.com/posts-by-category?category=${category}`);
    const data = await response.json();
    setPosts(data);
  }

  // Function to handle category selection
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  // Function to handle post deletion
  async function handleDeletePost(id) {
    await fetch(`https://post-book-server.onrender.com/posts/${id}`, {
      method: "DELETE"
    });
    // After deleting, fetch posts again to update the page
    fetchPostsByCategory(selectedCategory);
  }

  return (
    <div className="post-container">
      <h1>View Posts by Category</h1>
      <select id="select" value={selectedCategory} onChange={handleCategoryChange} required>
        <option value="">Select a category</option>
        <option value="Art">Art</option>
        <option value="Education">Education</option>
        <option value="Employment">Employment</option>
        <option value="Health">Health</option>
        <option value="Sports">Sports</option>
      </select>
    
      {posts.map((post) => (
        <div key={post.id} className="posts-div">
          <h2>{post.name}, Said:</h2>
          <p>{post.comment}</p>
          <p>Category: {post.category}</p>
          <button id="delete" onClick={() => handleDeletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}