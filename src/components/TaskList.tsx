import { useState } from "react";
import { Task, TaskPriority, TaskCategory } from "@/types/task";
import { Check, Trash2, Plus, Flag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd?: (task: Task) => void;
  onDeleteAll?: () => void;
  compact?: boolean;
}

const priorityStyles: Record<TaskPriority, string> = {
  Critical: "text-priority-critical",
  High: "text-priority-high",
  Medium: "text-priority-medium",
  Low: "text-priority-low",
};

const categoryColors: Record<TaskCategory, string> = {
  Study: "bg-chart-2/15 text-chart-2",
  Work: "bg-chart-3/15 text-chart-3",
  Health: "bg-chart-4/15 text-chart-4",
  Personal: "bg-info/15 text-info",
  Coding: "bg-primary/15 text-primary",
  Reading: "bg-chart-5/15 text-chart-5",
};

export const TaskList = ({ tasks, onToggle, onDelete, onAdd, onDeleteAll, compact }: TaskListProps) => {
  const [newTitle, setNewTitle] = useState("");
  const [recurrence, setRecurrence] = useState<Task["recurrence"]>("daily");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filtered = compact
    ? tasks
    : tasks.filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    });

  const handleAdd = () => {
    if (!newTitle.trim() || !onAdd) return;
    const task: Task = {
      id: String(Date.now()),
      title: newTitle.trim(),
      completed: false,
      priority: "Medium",
      category: "Personal",
      dueDate: new Date(Date.now() + 86400000),
      createdAt: new Date(),
      estimatedMinutes: 30,
      tags: [],
      subtasks: [],
      notes: "",
      recurrence: recurrence,
    };
    onAdd(task);
    setNewTitle("");
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
      <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-card-foreground">
          {compact ? "Upcoming Tasks" : "All Tasks"}
        </h3>
        {!compact && (
          <div className="flex flex-wrap gap-2 items-center text-xs w-full sm:w-auto">
            <div className="flex flex-wrap gap-1 bg-secondary/50 p-1 rounded-lg">
              {(["all", "active", "completed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-md font-medium transition-colors capitalize ${filter === f
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {onDeleteAll && tasks.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete all tasks? This action cannot be undone.")) {
                    onDeleteAll();
                  }
                }}
                className="px-3 py-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-1.5 font-medium border border-transparent hover:border-destructive/20 ml-1"
                title="Delete all tasks"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete All</span>
              </button>
            )}
          </div>
        )}
      </div>

      {onAdd && (
        <div className="px-5 py-3 border-b border-border flex flex-col sm:flex-row gap-3 sm:items-center bg-muted/10">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a new task..."
            className="flex-1 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
          />

          <select
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value as Task["recurrence"])}
            className="text-xs bg-secondary border border-border rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"
          >
            <option value="none">Once</option>
            <option value="daily">Daily Reset</option>
            <option value="weekly">Weekly Reset</option>
            <option value="monthly">Monthly Reset</option>
          </select>

          <button
            onClick={handleAdd}
            className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className={compact ? "max-h-80 overflow-auto" : ""}>
        <AnimatePresence>
          {filtered.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="flex items-center gap-3 px-5 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors group"
            >
              <button
                onClick={() => onToggle(task.id)}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${task.completed
                  ? "bg-primary border-primary"
                  : "border-border hover:border-primary"
                  }`}
              >
                {task.completed && <Check className="w-3 h-3 text-primary-foreground" />}
              </button>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${task.completed ? "line-through text-muted-foreground" : "text-card-foreground"
                    }`}
                >
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${categoryColors[task.category]}`}>
                    {task.category}
                  </span>
                  <Flag className={`w-3 h-3 ${priorityStyles[task.priority]}`} />
                  <span className="text-xs text-muted-foreground">
                    {task.dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5 text-destructive" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center text-sm text-muted-foreground">No tasks to show</div>
      )}
    </div>
  );
};
