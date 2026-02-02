import { useSortable } from "@dnd-kit/sortable";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Employee } from "./types";
import { Desk } from "./desk"; // <--- Add this import

export function Seat({ slotId, employee, onRemove, onRename }: {
  slotId: string;
  employee: Employee | null;
  onRemove: () => void;
  onRename: (v: string, f: "name" | "role") => void;
}) {
  const { setNodeRef, isOver } = useSortable({ id: slotId });

  return (
    <div ref={setNodeRef} className={cn(
      "relative w-36 h-64 rounded-xl border-2 border-dashed transition-all flex items-center justify-center shrink-0",
      isOver ? "border-accent bg-accent/5" : "border-fg1/10 bg-fg1/[0.02]"
    )}>
      {!employee && (
        <button onClick={onRemove} className="absolute top-2 left-2 opacity-0 hover:opacity-100 text-red-500">
          <Trash2 size={12} />
        </button>
      )}
      {employee ? (
        <Desk employee={employee} onRemove={onRemove} onRename={onRename} />
      ) : (
        <span className="text-[10px] opacity-10 uppercase">Empty</span>
      )}
    </div>
  );
}