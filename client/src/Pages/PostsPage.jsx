import { useState, useEffect } from "react";


export default function Post() {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        getPosts();
        
    }, []);

    async function getPosts() {
        const response = await fetch("http://localhost:8080/posts");
        const data = await response.json();
        setPosts(data);
    }

    
    async function handleDeletePost(id) {
        
        await fetch(`http://localhost:8080/posts/${id}`, {
            method: "DELETE"
        });
        // After deleting, fetch posts again to update the page
        getPosts();
    }

    return (
        <div className="post-container">
            <h1>View Previously left Comments</h1>
            
            {posts.map((post) => {
                return (
                    <div key={post.id} className="posts-div">
                        <h2>{post.name}, Said:</h2>
                        <p>{post.comment}</p>
                        <h4>Category: {post.category}</h4>
                        <button id="delete" onClick={() => handleDeletePost(post.id)}>Delete</button>
                        
                    </div>
                )
            })}
        </div>
    )
}