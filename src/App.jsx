import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [task, setTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : [
          {
            text: "Learn React JS",
            date: "30-09-2026, 3:54:34 pm",
            completed: false,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!task.trim()) return;
    const newTodo = {
      id: crypto.randomUUID(),
      text: task,
      date: new Date().toLocaleString(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTask("");
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const saveEdit = (index) => {
    if (!editText.trim()) return;
    const newTodos = [...todos];
    newTodos[index].text = editText;
    setTodos(newTodos);
    setEditIndex(null);
    setEditText("");
  };

  const toggleCompleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container">
      <div className="stats">
        <h1 className="title">Prathyusha's TODO LIST</h1>
      </div>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Your Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>ADD Task</button>
        <button
          onClick={() => {
            setTodos([]);
          }}
        >
          Clear All
        </button>
        <input
          type="text"
          placeholder="Search Task"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="stats">
        <div className="card">
          <h3>Total Tasks</h3>
          <p>{todos.length}</p>
        </div>
        <div className="card">
          <h3>Completed</h3>
          <p>{todos.filter((todo) => todo.completed).length}</p>
        </div>
        <div className="card">
          <h3>Pending</h3>
          <p>{todos.filter((todo) => !todo.completed).length}</p>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Date Created</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.length === 0 ? (
              <tr>
                <td colSpan="4">No Tasks Found</td>
              </tr>
            ) : (
              filteredTodos.map((todo, index) => (
                <tr key={index}>
                  <td>
                    {editIndex === index ? (
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                    ) : (
                      todo.text
                    )}
                  </td>

                  <td>{todo.date}</td>

                  <td>
                    <button
                      className={`complete-btn  ${todo.completed ? "red" : "green"}`}
                      onClick={() => toggleCompleted(index)}
                    >
                      {todo.completed ? "Pending" : "Completed"}
                    </button>
                  </td>

                  <td>
                    {editIndex === index ? (
                      <button onClick={() => saveEdit(index)}>Save</button>
                    ) : (
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditIndex(index);
                          setEditText(todo.text);
                        }}
                      >
                        Edit
                      </button>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => deleteTodo(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
