import { useState } from "react";

type TaskCardProps = {
  onAddTask: (title: string, description: string) => void;
};

export const NewTask = (props: TaskCardProps) => {
  const { onAddTask } = props;

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    onAddTask(newTaskTitle, newTaskDescription);

    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  return (
    <form
      onSubmit={handleAddTask}
      className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4"
    >
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="font-semibold text-neutral-100">New Task</h2>
      </div>
      <div className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md">
        <input
          type="text"
          placeholder="Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          required
          className="w-full bg-transparent border-b border-neutral-400 text-neutral-100 focus:outline-none focus:border-neutral-200"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="mt-2 w-full bg-transparent border-b border-neutral-400 text-neutral-400 focus:outline-none focus:border-neutral-200"
        />
        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-green-600 hover:bg-green-500 text-white p-2 transition duration-200"
        >
          Add
        </button>
      </div>
    </form>
  );
};
