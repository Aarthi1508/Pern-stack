import './App.css';
import React, {Fragment} from "react";

// components

import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';

function App() {
  return (
    <Fragment>
      <div className="container">
      <InputTodo>
      </InputTodo>
      </div>
      <div className="container">
      <ListTodos>
      </ListTodos>
      </div>
    </Fragment>
  );
}

export default App;
