import { CheckCircle2, Clock, TrendingUp, Flame } from "lucide-react";
import { Task } from "@/types/task";
import { motion } from "framer-motion";

interface MetricsGridProps {
  tasks: Task[];
}

export const MetricsGrid = ({ tasks }: MetricsGridProps) => {
  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  const overdue = tasks.filter((t) => !t.completed && t.dueDate < new Date()).length;
  const streak = 7; // mock

  const metrics = [
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      change: "+5% from last week",
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-accent",
    },
    {
      label: "Tasks Completed",
      value: `${completed}/${total}`,
      change: `${total - completed} remaining`,
      icon: CheckCircle2,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Overdue Tasks",
      value: String(overdue),
      change: overdue > 0 ? "Needs attention" : "All on track!",
      icon: Clock,
      color: overdue > 0 ? "text-warning" : "text-success",
      bg: overdue > 0 ? "bg-warning/10" : "bg-success/10",
    },
    {
      label: "Current Streak",
      value: `${streak} days`,
      change: "Personal best: 12 days",
      icon: Flame,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35 }}
          className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
            <div className={`p-2 rounded-lg ${metric.bg}`}>
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-card-foreground">{metric.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
        </motion.div>
      ))}
    </div>
  );
};
