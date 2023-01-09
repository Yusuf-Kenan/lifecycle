import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState(null);
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(false);
  const [resultM, setResultM] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const todoDlt = (id) => {
    axios
      .delete(`http://localhost:3005/todos/${id}`)
      .then((reponse) => {
        setResult(true);
        setResultM("Successfull Done");
      })
      .catch((error) => {
        setResult(true);
        setResultM("Successfull Done");
      });
  };

  const changeCompleted = (todo) => {
    console.log(todo);
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };
    axios
      .put(`http://localhost:3005/todos/${todo.id}`, updatedTodo)
      .then((reponse) => {
        setResult(true);
        setResultM("Successfully Done");
      })
      .catch((error) => {
        setResult(true);
        setResultM("An Error Occured");
      });
  };

  //const editTodo = (id) => {console.log(id);};

  useEffect(() => {
    axios
      .get("http://localhost:3005/todos")
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [result]);

  const handleForm = (event) => {
    event.preventDefault();
    if (title === "") {
      alert("cant be empty");
      return;
    }
    const newTodo = {
      id: String(new Date().getTime()),
      title: title,
      date: new Date().toLocaleString(),
      completed: false,
    };
    axios
      .post("http://localhost:3005/todos", newTodo)
      .then((response) => {
        setTitle("");
        setResult(true);
        setResultM("Successfully DOne");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditForm = (event) => {
    event.preventDefault();
    if (editTitle === "") {
      alert("cant be empty");
      return;
    }
    const updatedTodo = {
      ...editTodo,
      title: editTitle,
    };
    axios.put(`http://localhost:3005/todos/${editTodo.id}`,updatedTodo)
    .then((response)=>{
      setResult(true);
      setResultM("Successfully Done");
      setEditForm(false)
    })
    .catch((error)=>{
      setResult(true);
        setResultM("An Error Occur");
    })
  };

  if (todos === null) {
    return null;
  }
  return (
    <div className="container ">
      {result === true && (
        <div
          style={{
            position: "absulute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgraundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div className="alert alert-warning" role="alert">
            <p>{resultM}</p>
            <div className="d-flex justify-content-center">
              <button
                onClick={() => setResult(false)}
                className="btn btn-sm btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleForm}>
        <div className="input-group my-5">
          <input
            type="text"
            className="form-control"
            placeholder="Type your duty"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <button className="btn btn-primary" type="submit">
            ADD
          </button>
        </div>
      </form>

      {editForm === true && (
        <div
          style={{
            position: "absulute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgraundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <form onSubmit={handleEditForm}>
            <div className="input-group my-5">
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={editTitle}
                onChange={(event) => {
                  setEditTitle(event.target.value);
                }}
              />
              <button
                onClick={() => {
                  setEditForm(false);
                }}
                type="button"
                className="btn btn-danger"
              >
                QUIT
              </button>
              <button type="submit" className="btn btn-warning">
                EDIT
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={
              todo.completed === true
                ? "alert alert-success d-flex justify-content-between"
                : "alert alert-danger d-flex justify-content-between"
            }
          >
            <div>
              <h1>{todo.title}</h1>
              <p>{todo.date}</p>
            </div>
            <div className="btn-group" role="group">
              <button
                onClick={() => {
                  changeCompleted(todo);
                }}
                type="button"
                className="btn btn-sm btn-success"
              >
                {todo.completed === true ? "UNDONE" : "DO"}
              </button>
              <button
                onClick={() => {
                  setEditForm(true);
                  setEditTodo(todo);
                  setEditTitle(todo.title);
                }}
                type="button"
                className="btn btn-sm btn-warning"
              >
                EDIT
              </button>
              <button
                onClick={() => todoDlt(todo.id)}
                type="button"
                className="btn btn-sm btn-danger"
              >
                DLT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
