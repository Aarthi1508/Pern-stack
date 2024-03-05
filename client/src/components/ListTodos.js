import React, {useEffect, useState, Fragment} from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodos = async(id) => {
    try{
        const deleteTodo = await fetch(`http://127.0.0.1:5000/todos/${id}`,{
          "method":"DELETE"
        });
        console.log("Delete todos", deleteTodo);
        setTodos(todos.filter(todo => todo.todo_id != id))
    }
    catch(err){
      console.error(err.message);
    }
  }




  const getTodos = async() => {
  try{
      const response = await fetch("http://127.0.0.1:5000/todos")
      const jsonData = await response.json()
      setTodos(jsonData);
      console.log("json", jsonData)
    }
    catch (err){
      console.error(err.message);
    }
  }
  // console.log("todos updated", todos)

  

  useEffect(()=> {
    getTodos();
  }, []) // to just one request instead of throughout requesting it
    return (
    <Fragment>
        <h1 class="text-center mt-5">List Todos</h1>
        <Fragment>
        <table class="table text-center mt-5">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr key={todo.todo_id}>
          <td>{todo.description}</td>
          <td><EditTodo todo={todo}></EditTodo></td>
          <td><button className="btn btn-danger" onClick={() => deleteTodos(todo.todo_id)}>Delete</button></td>
        </tr>
      ))}
        
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
    </tbody>
  </table>
        </Fragment>
    </Fragment>
    );
}

export default ListTodos;