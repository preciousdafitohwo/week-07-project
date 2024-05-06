import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dbconnectionString = process.env.DATABASE_URL;

const db = new pg.Pool({ connectionString: dbconnectionString });

app.get("/", (req, res) => {
  res.send("This is the Route Route of this database Server");
});

app.get("/posts", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        posts.*, categories.category
      FROM 
        posts
      JOIN 
        posts_categories_junction AS pcj ON posts.id = pcj.post_id
      JOIN 
        categories ON pcj.categories_id = categories.id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.get("/posts-by-category", async (req, res) => {
  const category = req.query.category;

  let query = `
    SELECT 
      posts.*, categories.category
    FROM 
      posts
    JOIN 
      posts_categories_junction AS pcj ON posts.id = pcj.post_id
    JOIN 
      categories ON pcj.categories_id = categories.id
  `;

  if (category) {
    query += ` WHERE categories.category = $1`;
  }

  try {
    const result = await db.query(query, [category]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/add", async (req, res) => {
  try {
    const name = req.body.name;
    const comment = req.body.comment;
    const category = req.body.category;

    // Insert into posts table
    const postInsertion = await db.query(
      `INSERT INTO posts (name, comment) VALUES ($1, $2) RETURNING id`,
      [name, comment]
    );
    const postId = postInsertion.rows[0].id;

    // Get category id
    const categoryResult = await db.query(
      `SELECT id FROM categories WHERE category = $1`,
      [category]
    );
    const categoryId = categoryResult.rows[0].id;

    // Insert into junction table
    await db.query(
      `INSERT INTO posts_categories_junction (post_id, categories_id) VALUES ($1, $2)`,
      [postId, categoryId]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    // Delete post from the junction table using post_id
    await db.query(`DELETE FROM posts_categories_junction WHERE post_id = $1`, [
      postId,
    ]);

    res.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(8080, () => console.log("i am running on port 8080"));