"use client";

import React, { useState, useId } from "react"; // Added useId
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
} from "@dnd-kit/sortable";
import { Users, Plus, UserPlus } from "lucide-react";

import { Employee, DepartmentRow } from "./types";
import { Seat } from "./seat";

export default function OfficeFloor() {
  const bulkAdd = (name: string, role: string, dept: string) => {
    const newEmployee = {
      id: crypto.randomUUID(),
      name: name,
      role: role,
    };

    setRows((prev) => {
      // 1. Check if department exists
      const existingDept = prev.find((r) => r.deptName === dept);

      if (existingDept) {
        // 2. Add to existing dept if space (max 6)
        return prev.map((r) => {
          if (r.id === existingDept.id && r.slots.length < 6) {
            return { ...r, slots: [...r.slots, newEmployee] };
          }
          return r;
        });
      } else {
        // 3. Create new dept if it doesn't exist
        return [
          ...prev,
          {
            id: `r${Date.now()}`,
            deptName: dept,
            slots: [newEmployee, null, null, null],
          },
        ];
      }
    });
  };

  const id = useId(); // Generate stable ID for DndContext
  const [rows, setRows] = useState<DepartmentRow[]>([
    {
      id: "r1",
      deptName: "Engineering",
      slots: [{ id: "e1", name: "Lead Dev", role: "Eng" }, null],
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: `r${Date.now()}`,
        deptName: "New Dept",
        slots: [null, null, null, null],
      },
    ]);
  };

  const addEmptySeat = (rowId: string) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id === rowId && r.slots.length < 6) {
          return { ...r, slots: [...r.slots, null] };
        }
        return r;
      })
    );
  };

  const hireEmployee = (rowId: string) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== rowId) return r;
        const firstEmptyIdx = r.slots.findIndex((slot) => slot === null);
        if (firstEmptyIdx === -1) return r;

        const newSlots = [...r.slots];
        newSlots[firstEmptyIdx] = {
          id: `e${Date.now()}`,
          name: "NEW HIRE",
          role: "ROLE",
        };

        return { ...r, slots: newSlots };
      })
    );
  };

  const removeSlot = (rowId: string, slotIdx: number) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== rowId) return r;
        const newSlots = [...r.slots];
        newSlots.splice(slotIdx, 1);
        return { ...r, slots: newSlots };
      })
    );
  };

  const renameUser = (
    rowId: string,
    slotIdx: number,
    value: string,
    field: "name" | "role"
  ) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== rowId) return r;
        const newSlots = [...r.slots];
        const emp = newSlots[slotIdx];
        if (emp) newSlots[slotIdx] = { ...emp, [field]: value };
        return { ...r, slots: newSlots };
      })
    );
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    setRows((prev) => {
      const activeId = active.id;
      const overId = over.id;

      let activePos = { rIdx: -1, sIdx: -1 };
      let overPos = { rIdx: -1, sIdx: -1 };

      prev.forEach((row, rIdx) => {
        row.slots.forEach((slot, sIdx) => {
          const slotId = `slot-${row.id}-${sIdx}`;
          if (slot?.id === activeId) activePos = { rIdx, sIdx };
          if (slotId === overId || slot?.id === overId)
            overPos = { rIdx, sIdx };
        });
      });

      if (activePos.rIdx === -1 || overPos.rIdx === -1) return prev;

      const newRows = [...prev];
      const sourceRow = {
        ...newRows[activePos.rIdx],
        slots: [...newRows[activePos.rIdx].slots],
      };
      const targetRow =
        activePos.rIdx === overPos.rIdx
          ? sourceRow
          : {
              ...newRows[overPos.rIdx],
              slots: [...newRows[overPos.rIdx].slots],
            };

      const temp = sourceRow.slots[activePos.sIdx];
      sourceRow.slots[activePos.sIdx] = targetRow.slots[overPos.sIdx];
      targetRow.slots[overPos.sIdx] = temp;

      newRows[activePos.rIdx] = sourceRow;
      if (activePos.rIdx !== overPos.rIdx) newRows[overPos.rIdx] = targetRow;

      return newRows;
    });
  }

  return (
    <div className="px-12 py-10 space-y-8 bg-bg1 min-h-screen antialiased text-txt1">
      <div className="flex justify-between items-center w-full mx-auto">
        <h1 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
          <Users size={24} strokeWidth={4} /> Floor Map
        </h1>
        <button
          onClick={addRow}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-bg1 font-black rounded-lg text-xs hover:opacity-90 transition-all"
        >
          <Plus size={16} strokeWidth={3} /> Add Department
        </button>
      </div>

      <DndContext
        id={id} 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col gap-4 items-center mx-auto">
          {rows.map((row) => (
            <div
              key={row.id}
              className="w-full bg-fg1/5 p-6 rounded-3xl border border-fg1/10"
            >
              <div className="flex justify-between items-center mb-6 px-2">
                <input
                  value={row.deptName}
                  onChange={(e) =>
                    setRows(
                      rows.map((r) =>
                        r.id === row.id ? { ...r, deptName: e.target.value } : r
                      )
                    )
                  }
                  className="text-xs font-black text-accent bg-transparent border-none focus:ring-0 uppercase tracking-[0.3em] outline-none"
                />

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => bulkAdd("John Doe", "Lead", "Engineering")}
                    className="flex items-center gap-2 px-4 py-2 bg-accent text-bg1 font-black rounded-lg text-xs hover:opacity-90 transition-all"
                  >
                    <UserPlus size={16} strokeWidth={3} /> Quick Insert
                  </button>
                  <button
                    disabled={row.slots.length >= 6}
                    onClick={() => addEmptySeat(row.id)}
                    className="disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-1 px-3 py-1 bg-fg1/5 hover:bg-fg1/10 text-txt1/40 hover:text-txt1 rounded-lg text-[10px] font-bold uppercase transition-all"
                  >
                    <Plus size={14} /> Add Seat
                  </button>
                  <button
                    disabled={!row.slots.includes(null)}
                    onClick={() => hireEmployee(row.id)}
                    className="disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-1 px-3 py-1 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg text-[10px] font-bold uppercase transition-all"
                  >
                    <UserPlus size={14} strokeWidth={3} /> Add User
                  </button>
                </div>
              </div>

              <SortableContext
                items={row.slots.map((s, i) => s?.id || `slot-${row.id}-${i}`)}
                strategy={rectSortingStrategy}
              >
                <div className="grid grid-cols-6 gap-4 justify-items-center min-h-[160px]">
                  {row.slots.map((emp, i) => (
                    <Seat
                      key={`slot-${row.id}-${i}`}
                      slotId={`slot-${row.id}-${i}`}
                      employee={emp}
                      onRemove={() => removeSlot(row.id, i)}
                      onRename={(val, field) =>
                        renameUser(row.id, i, val, field)
                      }
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
