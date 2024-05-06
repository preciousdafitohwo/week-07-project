import { useState } from "react";

export default function AddPost (){
    const [form, setForm] = useState({name: "", comment: "", category: ""});

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:8080/add", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {"Content-Type": "application/json"}
        })
        .then(() => {
            // Clear form fields after successful submission
            setForm({ name: "", comment: "", category: "" });
        })
        .catch(error => console.error("Error submitting form:", error));
    }

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h1>Choose a category and make a related post/comment</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" placeholder="type in your name" required value={form.name} onChange={handleChange}/>
                <label htmlFor="comment">Comment:</label>
                <textarea name="comment" placeholder="type your post" required value={form.comment} onChange={handleChange}></textarea>
                <label htmlFor="category">Choose a Category:</label>
                <select name="category" value={form.category} onChange={handleChange} required>
                    <option value="" required>--Please choose an option--</option>
                    <option value="Art">Art</option>
                    <option value="Education">Education</option>
                    <option value="Employment">Employment</option>
                    <option value="Health">Health</option>
                    <option value="Sports">Sports</option>
                </select>
                <input type="submit" value="Add Post" id="add-post"/>
            </form>
        </div>
    )
}