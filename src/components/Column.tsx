import { useDroppable } from "@dnd-kit/core";
import { Column as ColumnType } from "../models/Column";
import { Task } from "../models/Task";
import { TaskCard } from "./TaskCard";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export const Column = (props: ColumnProps) => {
  const { column, tasks } = props;

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const columnColors: Record<ColumnType["id"], string> = {
    TODO: "border-blue-400",
    IN_PROGRESS: "border-yellow-400",
    DONE: "border-green-400",
  };

  return (
    <div
      className={`flex w-80 flex-col rounded-lg p-4  bg-neutral-800  border-1 ${
        columnColors[column.id]
      }`}
    >
      <div className="flex justify-between items-center mb-4 text-neutral-200">
        <h2 className="font-semibold">{column.title}</h2>
        <span>{tasks.length}</span>
      </div>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4 min-h-10">
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task}></TaskCard>;
        })}
      </div>
    </div>
  );
};
