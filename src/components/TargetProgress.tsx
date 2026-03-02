import { Task } from "@/types/task";
import { motion } from "framer-motion";
import { Target } from "lucide-react";

interface TargetProgressProps {
  tasks: Task[];
}

export const TargetProgress = ({ tasks }: TargetProgressProps) => {
  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const monthlyTarget = 80;
  const currentRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isOnTrack = currentRate >= monthlyTarget * 0.7;

  const targets = [
    { label: "Monthly Target", current: currentRate, target: monthlyTarget, unit: "%" },
    { label: "Weekly Tasks", current: completed, target: 25, unit: " tasks" },
    { label: "Daily Minimum", current: 3, target: 5, unit: " tasks" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="bg-card border border-border rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center gap-2 mb-5">
        <Target className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-card-foreground">Target vs Actual</h3>
      </div>

      <div className="space-y-5">
        {targets.map((t) => {
          const pct = Math.min(100, Math.round((t.current / t.target) * 100));
          return (
            <div key={t.label}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">{t.label}</span>
                <span className="font-mono font-medium text-card-foreground">
                  {t.current}{t.unit} / {t.target}{t.unit}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={`h-full rounded-full ${pct >= 70 ? "gradient-primary" : "bg-warning"}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className={`mt-5 p-3 rounded-lg text-xs font-medium ${isOnTrack ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
        {isOnTrack
          ? "✨ You're on track to meet your monthly target!"
          : "⚠️ You're falling behind — pick up the pace!"}
      </div>
    </motion.div>
  );
};
