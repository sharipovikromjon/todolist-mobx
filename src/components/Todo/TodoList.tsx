import {
  TodoAddInput,
  TodoEditInput,
  TodoDeleteButton,
  TodoToggleCheckbox,
} from "../Todo";
import { observer } from "mobx-react-lite";
import { myTodoStore } from "../../stores/todoStore";
import { useState } from "react";
import { Input } from "antd";

const TodoList = observer(() => {
  const [text, setText] = useState("");

  // To clean the input field and trim the empty spaces
  const handleAddTask = () => {
    if (text.trim()) {
      myTodoStore.addTask(text);
      setText("");
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      {/* Add task input */}
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add Task"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTask();
          }
        }}
        style={{ width: "50%" }}
      />
      <button onClick={handleAddTask}>Add</button>
      {/* List of tasks */}
      <ul style={{ marginTop: "1rem" }}>
        {myTodoStore.todos.map((item) => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => myTodoStore.toggleTask(item.id)}
            />
            {item.edit ? (
              <input
                type="text"
                defaultValue={item.text}
                onBlur={(e) => {
                  const newText = e.target.value.trim();
                  if (newText) {
                    myTodoStore.updateTask(item.id, newText);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    myTodoStore.updateTask(
                      item.id,
                      (e.target as HTMLInputElement).value.trim()
                    );
                  }
                }}
                autoFocus
              />
            ) : (
              <span
                style={{
                  textDecoration: item.done ? "line-through" : "none",
                  marginLeft: "10px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onDoubleClick={() => myTodoStore.toggleTask(item.id)}
              >
                {item.text.charAt(0).toUpperCase() + item.text.slice(1)}
              </span>
            )}
            <button onClick={() => myTodoStore.editTask(item.id)}>
              {item.edit ? "Done" : "Edit"}
            </button>
            {!item.edit && (
              <button onClick={() => myTodoStore.deleteTask(item.id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TodoList;
