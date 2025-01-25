import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Column as ColumnType } from "./models/Column";
import { Task } from "./models/Task";
import { Column } from "./components";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { NewTask } from "./components/NewTask";
import { v4 as uuidv4 } from "uuid"; // Import uuid

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const INITIAL_TASKS: Task[] = [
  {
    id: uuidv4(),
    title: "Task 1",
    description: "This is a description",
    status: "TODO",
  },
  {
    id: uuidv4(),
    title: "Task 2",
    description: "This is a description",
    status: "IN_PROGRESS",
  },
  {
    id: uuidv4(),
    title: "Task 4",
    description: "This is a description",
    status: "IN_PROGRESS",
  },
  {
    id: uuidv4(),
    title: "Task 3",
    description: "This is a description",
    status: "DONE",
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks from localStorage if available
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : INITIAL_TASKS;
  });

  useEffect(() => {
    // Save tasks to localStorage whenever they change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }, []);

  const handleAddTask = (title: string, description: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: "TODO",
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="p-4">
      <div className="flex gap-8 flex-col md:flex-row">
        <NewTask onAddTask={handleAddTask} />
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {
            const columnTasks = tasks.filter(
              (task) => task.status === column.id
            );
            return (
              <Column key={column.id} column={column} tasks={columnTasks} />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
}

export default App;
