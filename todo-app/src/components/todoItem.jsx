import React, { useState, useEffect } from "react";

const TodoItem = (props) => {
  const { emitDeleteTodoItem } = props;
  const [todoItem, setTodoItem] = useState(props.data);
  const [isDirty, setDirty] = useState(false);
  useEffect(() => {
    if (isDirty) {
      fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {
        method: "put",

        headers: {
          "content-type": " application/json",
        },
        body: JSON.stringify(todoItem),
      })
        .then((response) => response.json())
        .then((data) => {
          setDirty(false);
          setTodoItem(data);
        });
    }
  }, [todoItem, isDirty]);

  function updateTask(e) {
    setDirty(true);
    setTodoItem({ ...todoItem, task: e.target.value });
  }
  function deleteTodoItem() {
    fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {
      method: "DELETE",
      headers: {
        "content-type": " application/json",
      },
      body: JSON.stringify(todoItem),
    }).then((response) => {
      emitDeleteTodoItem(todoItem);
    });
  }
  return (
    <div>
      <input
        type="checkbox"
        checked={todoItem.isDone}
        onChange={() => {
          setDirty(true);
          setTodoItem({ ...todoItem, isDone: !todoItem.isDone });
        }}
      />
      {todoItem.isDone ? (
        <span style={{ textDecoration: "line-through" }}>{todoItem.task}</span>
      ) : (
        <input type="text" value={todoItem.task} onChange={updateTask} />
      )}
      <span
        style={{ marginLeft: "2rem", cursor: "pointer" }}
        onClick={deleteTodoItem}
      >
        🗑️
      </span>
    </div>
  );
};

export default TodoItem;
