// i created and seeded my database on supabase but below is a copy of my SQL seed and query

// -- Creating the posts table
// CREATE TABLE IF NOT EXISTS posts (
//   id SERIAL PRIMARY KEY, 
//   name TEXT,
//   comment TEXT
// );

// -- Creating the categories table
// CREATE TABLE IF NOT EXISTS categories (
//   id SERIAL PRIMARY KEY, 
//   category TEXT
// );

// -- Creating the junction table for posts and categories
// CREATE TABLE IF NOT EXISTS posts_categories_junction (
//   pcj_id SERIAL PRIMARY KEY,
//   post_id INT REFERENCES posts(id),
//   categories_id INT REFERENCES categories(id)
// );

// -- Inserting data into the posts table
// INSERT INTO posts (name, comment) VALUES
// ('John', 'Great book about astrophysics'),
// ('Rose', 'Really good advice on meal prep and planning'),
// ('Mark', 'Great motivation to remain disciplined in sports'),
// ('Lucy', 'Good read on the pros and cons of working from home'),
// ('Tom', 'Must read for up and coming artists and designers!');

// -- Inserting data into the categories table
// INSERT INTO categories (category) VALUES
// ('Education'), ('Health'), ('Sports'), ('Employment'), ('Art');

// -- Inserting relationships into the junction table
// INSERT INTO posts_categories_junction (post_id, categories_id) VALUES 
// (1,1), (2,2), (3,3), (4,4), (5,5);