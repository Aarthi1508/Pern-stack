const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db") 

// by using a pool we can run queries in postgres

//middleware
app.use(cors())
app.use(express.json()) // access to request the body

//ROUTES//


// Create todo table if not exists
// pool.query(
//     "CREATE TABLE IF NOT EXISTS todo (todo_id SERIAL PRIMARY KEY,  description VARCHAR(255))"
// ).then(() => {
//     console.log("todo table created successfully");
// }).catch((err) => {
//     console.error("Error creating todo table:", err);
// });

// #Check if the table exist first 

// psql -U <user> \c <database_name>

//1. create a todo

app.post("/todos", async(req, res) => {
    try{
        const { description } = req.body;
        // You're destructuring the req.body object and extracting the description property from it. So, description will be a variable containing the value of req.body.description.
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", 
        [description]
        );
        res.json(newTodo.rows[0]);
    }
    catch (err){
        console.error(err.message);
    }

})

// async -> to wait for the function to complete before it continues

// 2. get all todos


app.get("/todos", async(req, res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo;")
        res.json(allTodos.rows);
    }
    catch (err){
        console.error(err.message);
    }
});


// 3. get a todo by req body

// app.get("/todo/", async(req, res) => {
//     try{
//         const { todo_id } = req.body;
//         const retrievedTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", 
//         [todo_id]);
//         res.json(retrievedTodo.rows[0]);
//     }
//     catch (err){
//         console.error(err.message);
//     }
// });

// 3. get a todo by query param

app.get("/todos/:id", async(req, res) => {
    try{
        console.log(req.params)
        const { id } = req.params;
        const retrievedTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", 
        [id]);
        res.json(retrievedTodo.rows[0]);
    }
    catch (err){
        console.error(err.message);
    }
});

// update a todo by request body
// app.put("/todo/", async(req, res) => {
//     try {
//         const { todo_id } = req.body;
//         const { description } = req.body;
//         const updatedTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
//         [description, todo_id]
//         );
//         res.json(updatedTodo.rows[0]);
//     }
//     catch (err){
//         console.error(err.message);
//     }

// });

// update a todo
app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params; // id from params
        const { description } = req.body; // description from body
        const updatedTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
        [description, id]
        );
        res.json(updatedTodo.rows[0]);
    }
    catch (err){
        console.error(err.message);
    }

});

// delete a todo
app.delete("/todos/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const deletedItem = await pool.query("DELETE FROM todo WHERE todo_id = $1 RETURNING *", 
        [id]
        );
        res.json(deletedItem.rows[0])
    }
    catch (err){
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("Server has started on my port 5000");
}
)

// app.listen
// the first argument specifies the port number on which the server will listen for incoming requests.
// second argument passed to the app.listen() method in Express.js is an optional callback function that is executed once the server has started and is ready to accept incoming requests. This function is typically used to perform actions such as logging a message to indicate that the server has started successfully.