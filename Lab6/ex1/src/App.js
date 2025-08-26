import React, { useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, addTodo, toggleTodo, deleteTodo } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoInput() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim() !== "") {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
            onClick={() => dispatch(toggleTodo(todo.id))}
          >
            {todo.text}
          </span>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="container mt-4">
        <h2 className="text-center mb-4">✅ Todo List with Redux</h2>
        <TodoInput />
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
