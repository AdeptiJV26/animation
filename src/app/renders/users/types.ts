export interface Employee {
  id: string;
  name: string;
  role: string;
}

export interface DepartmentRow {
  id: string;
  deptName: string;
  slots: (Employee | null)[];
}