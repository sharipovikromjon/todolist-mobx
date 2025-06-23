import { useState } from "react";
import { Input, Button, Space, message } from "antd";
import { myTodoStore } from "../../stores/todoStore";
import colors from "../../constants/colors";

const TodoAddInput = () => {
  const [text, setText] = useState("");

  const handleAddTask = () => {
    const trimmed = text.trim();
    if (trimmed) {
      myTodoStore.addTask(trimmed);
      setText("");
    } else {
      message.warning("Task cannot be empty");
    }
  };

  return (
    <Space.Compact
      style={{
        width: "100%",
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        columnGap: "1rem",
        justifyContent:"center"
      }}
    >
      <Input
        placeholder="Add Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onPressEnter={handleAddTask}
        style={{
          width: "50%",
          padding: "11px 16px",
          color: colors.black,
          letterSpacing: "1px",
        }}
      />
      <Button
        type="primary"
        onClick={handleAddTask}
        style={{
          padding: "22px 10px",
          fontFamily: "Kanit",
          fontSize: "18px",
          lineHeight: "100%",
          fontWeight: "500",
          textTransform: "uppercase",
        }}
      >
        Add
      </Button>
    </Space.Compact>
  );
};

export default TodoAddInput;
