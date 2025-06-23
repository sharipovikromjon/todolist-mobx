import {
  TodoEditInput,
  TodoDeleteButton,
  TodoToggleCheckbox,
  TodoAddInput,
} from "../Todo";
import { observer } from "mobx-react-lite";
import { myTodoStore } from "../../stores/todoStore";
import { useState } from "react";
import { Typography } from "antd";
import { CiCircleCheck } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
const { Title } = Typography;

const TodoList: React.FC = observer(() => {
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
      <Title style={{ textAlign: "center", textTransform: "uppercase" }}>
        Todo List
      </Title>

      {/* Add task input */}
      <TodoAddInput />

      {/* List of tasks */}
      <ul
        style={{
          marginTop: "1rem",
          listStyle: "none",
          textAlign: "center",
          padding: "0",
        }}
      >
        {myTodoStore.todos.map((item) => (
          <li
            key={item.id}
            style={{
              marginBottom: "20px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => myTodoStore.toggleTask(item.id)}
                style={{
                  marginRight: "17px",
                  width: "26px",
                  height: "26px",
                  marginTop: "20px  ",
                }}
              />
              <div>
                {item.edit ? (
                  <input
                    type="text"
                    defaultValue={item.text}
                    onBlur={(e) => {
                      const newText = e.target.value.trim();
                      if (newText !== "") {
                        myTodoStore.updateTask(item.id, newText);
                      } else {
                        <ToastContainer />;
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const newText = (
                          e.target as HTMLInputElement
                        ).value.trim();
                        if (newText !== "") {
                          myTodoStore.updateTask(item.id, newText);
                        } else {
                          toast.error("Input field should not be empty");
                        }
                      }
                    }}
                    autoFocus
                    style={{
                      fontFamily: "Kanit",
                      fontSize: "16px",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "5px",
                      marginTop: "20px",
                      width: "700px",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      textDecoration: item.done ? "line-through" : "none",
                      cursor: "pointer",
                      fontFamily: "Kanit",
                      fontSize: "18px",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      marginTop: "15px",
                      display: "flex",
                      alignItems: "center", // Ensure alignment with the checkbox
                    }}
                  >
                    {item.text.charAt(0).toUpperCase() + item.text.slice(1)}
                  </span>
                )}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {item.edit ? (
                <CiCircleCheck
                  style={{ width: "18px", height: "18px", cursor: "pointer" }}
                />
              ) : (
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => myTodoStore.editTask(item.id)}
                  src="/icons/edit-icon.svg"
                  alt="edit"
                />
              )}
              {!item.edit && (
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => myTodoStore.deleteTask(item.id)}
                  src="/icons/delete-icon.svg"
                  alt="delete"
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TodoList;
