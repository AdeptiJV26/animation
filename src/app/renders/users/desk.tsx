import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { User, GripVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Employee } from "./types";
export function Desk({ employee, onRemove, onRename }: {
  employee: Employee;
  onRemove: () => void;
  onRename: (value: string, field: "name" | "role") => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = 
    useSortable({ id: employee.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className={cn(
        "relative group flex flex-col items-center p-3 rounded-xl border-2 border-fg1/10 bg-bg1 w-full h-64 transition-all shadow-sm cursor-grab active:cursor-grabbing",
        isDragging ? "opacity-50 scale-105 border-accent shadow-xl" : "hover:border-accent/40"
      )}
    >
      <div className="absolute top-2 right-2 text-txt1/20 group-hover:text-accent transition-colors">
        <GripVertical size={14} strokeWidth={3} />
      </div>

      <button 
        onClick={(e) => { 
          e.stopPropagation();
          onRemove(); 
        }} 
        className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500"
      >
        <Trash2 size={12} />
      </button>

      <div className="bg-fg1/5 p-2 rounded-full mt-1"><User className="text-accent" size={20} /></div>
      
      <div className="flex flex-col gap-1 w-full mt-2 overflow-hidden">
        <textarea 
          onPointerDown={(e) => e.stopPropagation()} 
          value={employee.role} 
          onChange={(e) => onRename(e.target.value, "role")} 
          className="text-[9px] font-bold text-accent/70 bg-transparent text-center uppercase resize-none outline-none" 
        />
        <textarea 
          onPointerDown={(e) => e.stopPropagation()} 
          value={employee.name} 
          onChange={(e) => onRename(e.target.value, "name")} 
          className="text-[11px] font-black text-txt1 bg-transparent text-center uppercase resize-none outline-none" 
        />
      </div>
    </div>
  );
}