import { useDraggable } from "@dnd-kit/core";
import { Task } from "../models/Task";
import { GripVertical } from "lucide-react";

type TaskCardProps = {
  task: Task;
};

export const TaskCard = (props: TaskCardProps) => {
  const { task } = props;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md flex  justify-between place-items-center"
      style={style}
    >
      <div className="overflow-hidden">
        <h3 className="font-medium text-neutral-100 truncate">{task.title}</h3>
        <p className="mt-2 text-sm text-neutral-400 truncate">
          {task.description}
        </p>
      </div>
      <GripVertical />
    </div>
  );
};
