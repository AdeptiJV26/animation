"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Users, User, GripVertical, Plus, Trash2, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
interface Employee {
  id: string;
  name: string;
  role: string;
}

interface DepartmentRow {
  id: string;
  deptName: string;
  slots: (Employee | null)[];
}

// --- Draggable Employee Card ---
// --- Draggable Employee Card ---
function Desk({
  employee,
  onRemove,
  onRename,
}: {
  employee: Employee;
  onRemove: () => void;
  onRename: (value: string, field: "name" | "role") => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: employee.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group flex flex-col items-center p-3 rounded-xl border-2 border-fg1/10 bg-bg1 w-full h-64 transition-all shadow-sm",
        isDragging ? "opacity-50 scale-105 border-accent shadow-xl" : "hover:border-accent/40"
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 cursor-grab active:cursor-grabbing text-txt1/20 hover:text-accent"
      >
        <GripVertical size={14} strokeWidth={3} />
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500 transition-opacity"
      >
        <Trash2 size={12} />
      </button>

      <div className="bg-fg1/5 p-2 rounded-full mt-1 shrink-0">
        <User className="text-accent" size={20} strokeWidth={3} />
      </div>

      <div className="flex flex-col justify-start items-center gap-1 w-full flex-1 min-h-0 mt-2 overflow-hidden">
        {/* [NEW_CODE] Removed shrink-0, overflow-hidden to allow wrap; added flex-1 to distribute space */}
        <textarea
          value={employee.role}
          onChange={(e) => onRename(e.target.value, "role")}
          className="text-[9px] font-bold text-accent/70 bg-transparent border-none focus:ring-0 w-full text-center uppercase outline-none resize-none leading-tight py-0 overflow-hidden flex-1"
        />
        {/* [NEW_CODE] Changed h-full to flex-[2] to give name more priority; changed overflow-y-auto to hidden to prevent scrollbars */}
        <textarea
          value={employee.name}
          onChange={(e) => onRename(e.target.value, "name")}
          className="text-[11px] font-black text-txt1 bg-transparent border-none focus:ring-0 w-full flex-[2] text-center uppercase outline-none resize-none py-1 overflow-hidden"
        />
      </div>
    </div>
  );
}

// --- Dynamic Seat Slot ---
function Seat({
  slotId,
  employee,
  onRemove,
  onRename,
}: {
  slotId: string;
  employee: Employee | null;
  onRemove: () => void;
  onRename: (v: string, f: "name" | "role") => void;
}) {
  const { setNodeRef, isOver } = useSortable({ id: slotId });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative group w-36 h-64 rounded-xl border-2 border-dashed transition-all flex items-center justify-center shrink-0 overflow-hidden",
        isOver ? "border-accent bg-accent/5" : "border-fg1/10 bg-fg1/[0.02]"
      )}
    >
      {!employee && (
        <button
          onClick={onRemove}
          className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 text-txt1/20 hover:text-red-500 transition-opacity"
        >
          <Trash2 size={12} />
        </button>
      )}

      {employee ? (
        <Desk employee={employee} onRemove={onRemove} onRename={onRename} />
      ) : (
        <span className="text-[10px] font-black text-fg1/10 uppercase tracking-widest select-none text-center px-2">
          Empty Seat
        </span>
      )}
    </div>
  );
}

// --- Main Floor Map ---
export default function OfficeFloor() {
  const [rows, setRows] = useState<DepartmentRow[]>([
    {
      id: "r1",
      deptName: "Engineering",
      slots: [
        { id: "e1", name: "Lead Developer", role: "Engineering" },
        null,
        { id: "e2", name: "New Hire", role: "Junior" },
        null,
      ],
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addRow = () => {
    setRows([...rows, { id: `r${Date.now()}`, deptName: "New Dept", slots: [null, null, null, null] }]);
  };

  const addEmptySeat = (rowId: string) => {
    setRows(prev => prev.map(r => r.id === rowId ? { ...r, slots: [...r.slots, null] } : r));
  };

  const hireEmployee = (rowId: string) => {
    setRows(prev => prev.map(r => r.id === rowId 
      ? { ...r, slots: [...r.slots, { id: `e${Date.now()}`, name: "NEW HIRE", role: "ROLE" }] } 
      : r
    ));
  };

  const removeSlot = (rowId: string, slotIdx: number) => {
    setRows(prev => prev.map(r => {
      if (r.id !== rowId) return r;
      const newSlots = [...r.slots];
      newSlots.splice(slotIdx, 1);
      return { ...r, slots: newSlots };
    }));
  };

  const renameUser = (rowId: string, slotIdx: number, value: string, field: "name" | "role") => {
    setRows(prev => prev.map(r => {
      if (r.id !== rowId) return r;
      const newSlots = [...r.slots];
      const emp = newSlots[slotIdx];
      if (emp) newSlots[slotIdx] = { ...emp, [field]: value };
      return { ...r, slots: newSlots };
    }));
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    setRows((prev) => {
      const activeId = active.id;
      const overId = over.id;

      let activeRowIdx = -1, activeSlotIdx = -1;
      let overRowIdx = -1, overSlotIdx = -1;

      prev.forEach((row, rIdx) => {
        row.slots.forEach((slot, sIdx) => {
          const slotId = `slot-${row.id}-${sIdx}`;
          if (slot?.id === activeId) { activeRowIdx = rIdx; activeSlotIdx = sIdx; }
          if (slotId === overId || slot?.id === overId) { overRowIdx = rIdx; overSlotIdx = sIdx; }
        });
      });

      if (activeRowIdx === -1 || overRowIdx === -1) return prev;

      const newRows = [...prev];
      const sourceRow = { ...newRows[activeRowIdx], slots: [...newRows[activeRowIdx].slots] };
      const targetRow = activeRowIdx === overRowIdx ? sourceRow : { ...newRows[overRowIdx], slots: [...newRows[overRowIdx].slots] };

      const temp = sourceRow.slots[activeSlotIdx];
      sourceRow.slots[activeSlotIdx] = targetRow.slots[overSlotIdx];
      targetRow.slots[overSlotIdx] = temp;

      newRows[activeRowIdx] = sourceRow;
      if (activeRowIdx !== overRowIdx) newRows[overRowIdx] = targetRow;

      return newRows;
    });
  }

  return (
    <div className="px-12 py-10 space-y-8 bg-bg1 min-h-screen antialiased text-txt1">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
          <Users size={24} strokeWidth={4} /> Floor Map
        </h1>
        <button onClick={addRow} className="flex items-center gap-2 px-4 py-2 bg-accent text-bg1 font-black rounded-lg text-xs hover:opacity-90 transition-all">
          <Plus size={16} strokeWidth={3} /> Add Department
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-col gap-10 items-center max-w-7xl mx-auto">
          {rows.map((row) => (
            <div key={row.id} className="w-full bg-fg1/5 p-6 rounded-3xl border border-fg1/10">
              <div className="flex justify-between items-center mb-6 px-2">
                <input
                  value={row.deptName}
                  onChange={(e) => setRows(rows.map(r => r.id === row.id ? { ...r, deptName: e.target.value } : r))}
                  className="text-xs font-black text-accent bg-transparent border-none focus:ring-0 uppercase tracking-[0.3em] outline-none"
                />
                
                <div className="flex items-center gap-3">
                  <button onClick={() => addEmptySeat(row.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-fg1/5 hover:bg-fg1/10 text-txt1/40 hover:text-txt1 rounded-lg text-[10px] font-bold uppercase transition-all">
                    <Plus size={14} strokeWidth={3} /> Add Seat
                  </button>
                  <button onClick={() => hireEmployee(row.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg text-[10px] font-bold uppercase transition-all">
                    <UserPlus size={14} strokeWidth={3} /> Hire
                  </button>
                </div>
              </div>

              <SortableContext 
                items={row.slots.map((s, i) => s?.id || `slot-${row.id}-${i}`)} 
                strategy={rectSortingStrategy}
              >
                <div className="flex flex-row flex-wrap gap-6 justify-start min-h-[160px]">
                  {row.slots.map((emp, i) => (
                    <Seat
                      key={`slot-${row.id}-${i}`}
                      slotId={`slot-${row.id}-${i}`}
                      employee={emp}
                      onRemove={() => removeSlot(row.id, i)}
                      onRename={(val, field) => renameUser(row.id, i, val, field)}
                    />
                  ))}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
}