import { Task, TaskCategory, TaskPriority } from "@/types/task";

// Generate mock data for the dashboard
const categories: TaskCategory[] = ["Study", "Work", "Health", "Personal", "Coding", "Reading"];
const priorities: TaskPriority[] = ["Low", "Medium", "High", "Critical"];

const today = new Date();
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d;
};

const randomCategory = () => categories[Math.floor(Math.random() * categories.length)];
const randomPriority = () => priorities[Math.floor(Math.random() * priorities.length)];

let idCounter = 1;

const createTask = (
  title: string,
  completed: boolean,
  daysOffset: number,
  priority?: TaskPriority,
  category?: TaskCategory
): Task => ({
  id: String(idCounter++),
  title,
  completed,
  priority: priority || randomPriority(),
  category: category || randomCategory(),
  dueDate: daysAgo(-daysOffset),
  createdAt: daysAgo(daysOffset + 5),
  completedAt: completed ? daysAgo(Math.max(0, daysOffset - 1)) : undefined,
  estimatedMinutes: Math.floor(Math.random() * 120) + 15,
  tags: [],
  subtasks: [],
  notes: "",
  recurrence: "none",
});

export const mockTasks: Task[] = [
  createTask("Complete React dashboard", true, -2, "High", "Coding"),
  createTask("Read 30 pages of Atomic Habits", true, -1, "Medium", "Reading"),
  createTask("Morning workout routine", true, 0, "High", "Health"),
  createTask("Review pull requests", false, 1, "Critical", "Work"),
  createTask("Study data structures chapter 5", false, 1, "High", "Study"),
  createTask("Write blog post on productivity", false, 2, "Medium", "Personal"),
  createTask("Fix authentication bug", false, 0, "Critical", "Coding"),
  createTask("Meditate for 15 minutes", true, 0, "Low", "Health"),
  createTask("Prepare weekly report", false, 1, "High", "Work"),
  createTask("Learn TypeScript generics", false, 3, "Medium", "Study"),
  createTask("Update portfolio website", false, 4, "Low", "Coding"),
  createTask("Read 2 research papers", true, -1, "Medium", "Reading"),
  createTask("Plan sprint retrospective", true, -2, "High", "Work"),
  createTask("Solve 5 LeetCode problems", false, 2, "High", "Coding"),
  createTask("Journal session", true, 0, "Low", "Personal"),
];

// Weekly data for charts
export const weeklyData = [
  { day: "Mon", completed: 8, total: 10 },
  { day: "Tue", completed: 6, total: 9 },
  { day: "Wed", completed: 9, total: 11 },
  { day: "Thu", completed: 5, total: 8 },
  { day: "Fri", completed: 7, total: 9 },
  { day: "Sat", completed: 4, total: 6 },
  { day: "Sun", completed: 3, total: 5 },
];

// Monthly data
export const monthlyData = [
  { week: "W1", completed: 28, total: 35, target: 30 },
  { week: "W2", completed: 32, total: 38, target: 30 },
  { week: "W3", completed: 25, total: 40, target: 30 },
  { week: "W4", completed: 30, total: 36, target: 30 },
];

// Category distribution
export const categoryData = [
  { name: "Coding", value: 32, fill: "hsl(175 80% 40%)" },
  { name: "Study", value: 24, fill: "hsl(260 60% 55%)" },
  { name: "Work", value: 20, fill: "hsl(35 90% 55%)" },
  { name: "Health", value: 12, fill: "hsl(340 70% 55%)" },
  { name: "Reading", value: 8, fill: "hsl(120 50% 45%)" },
  { name: "Personal", value: 4, fill: "hsl(210 80% 55%)" },
];

// Heatmap data (last 12 weeks)
export const heatmapData: number[][] = Array.from({ length: 12 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 8))
);

// Productivity score
export const productivityScore = {
  overall: 78,
  completionRate: 82,
  onTimeRate: 74,
  streakConsistency: 85,
  delayFrequency: 15,
};
