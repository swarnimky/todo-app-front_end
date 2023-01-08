import "./App.css";
import { Fragment, useEffect, useState } from "react";
import TodoItem from "./components/todoItem";

function App() {
  const [todoItems, setTodoItems] = useState(null);

  useEffect(() => {
    //do something on load
    console.log("Hey I loaded up");

    if (!todoItems) {
      fetch("http://localhost:8080/api/todoItems")
        .then((response) => response.json())
        .then((data) => {
          console.log("Todo items list : ", data);
          setTodoItems(data);
        });
    }
  }, [todoItems]);

  function addNewTodoItem() {
    fetch("http://localhost:8080/api/todoItems", {
      headers: {
        "content-type": "application/json",
      },
      method: "post",
    })
      .then((response) => response.json())
      .then((aTodoItem) => {
        setTodoItems([...todoItems, aTodoItem]);
      });
  }
  function handleDeleteTodoItem(item) {
    const updatedTodoItems = todoItems.filter(
      (aTodoItem) => aTodoItem.id !== item.id
    );
    console.log("Updated todo items", updatedTodoItems);
    setTodoItems([...updatedTodoItems]);
  }
  return (
    <>
      <div>
        <button onClick={addNewTodoItem}> Add new Item</button>
      </div>
      <div>
        {todoItems
          ? todoItems.map((todoItem) => {
              return (
                <TodoItem
                  key={todoItem.id}
                  data={todoItem}
                  emitDeleteTodoItem={handleDeleteTodoItem}
                />
              );
            })
          : "loading data from the server..."}
      </div>
    </>
  );
}

export default App;
