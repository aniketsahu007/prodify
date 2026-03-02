export type TaskPriority = "Low" | "Medium" | "High" | "Critical";
export type TaskCategory = "Study" | "Work" | "Health" | "Personal" | "Coding" | "Reading";
export type TaskRecurrence = "none" | "daily" | "weekly" | "monthly";

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate: Date;
  createdAt: Date;
  completedAt?: Date;
  estimatedMinutes: number;
  tags: string[];
  subtasks: Subtask[];
  notes: string;
  recurrence?: TaskRecurrence;
}
