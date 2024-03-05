import React, {useEffect, useState, Fragment} from "react";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
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
  console.log("todos updated", todos)

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
        <tr>
          <td>{todo.description}</td>
          <td>Edit</td>
          <td><button className="btn btn-danger">Delete</button></td>
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