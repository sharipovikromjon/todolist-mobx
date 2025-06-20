import { makeAutoObservable } from "mobx";

export interface Todo {
  id: number;
  text: string;
  done: boolean;
  edit: boolean;
}

class TodoStore {
  todos: Todo[] = [];
  // Watcher
  constructor() {
    makeAutoObservable(this);
    this.loadTasks();
  }
  // For adding task
  addTask(text: string) {
    this.todos.push({
      id: Date.now(),
      text,
      done: false,
      edit: false,
    });
    this.saveTasks();
  }
  // For making done or undone
  toggleTask(id: number) {
    const todoList = this.todos.find((t) => t.id === id);
    if (todoList) {
      todoList.done = !todoList.done;
      this.saveTasks();
    }
  }
  // Filter deleted tasks
  deleteTask(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveTasks();
  }
  // For editing task
  editTask(id: number) {
    const todoList = this.todos.find((t) => t.id === id);
    if (todoList) {
      todoList.edit = !todoList.edit;
    }
  }
  // Update, Show new tasks
  updateTask(id: number, newText: string) {
    const todoList = this.todos.find((t) => t.id === id);
    if (todoList) {
      todoList.text = newText;
      todoList.edit = false;
      this.saveTasks();
    }
  }
  // Save to localStorage
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.todos));
  }
  // Get from the localStorage
  loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      this.todos = JSON.parse(savedTasks);
    }
  }
  // Test
  logOut() {
    this.todos.map((item) =>
      console.log(item.id, item.text, item.done, item.edit)
    );
  }
}
export const myTodoStore = new TodoStore();
