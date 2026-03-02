import { heatmapData } from "@/data/mockData";
import { motion } from "framer-motion";

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getColor = (value: number) => {
  if (value === 0) return "bg-muted";
  if (value <= 2) return "bg-primary/20";
  if (value <= 4) return "bg-primary/40";
  if (value <= 6) return "bg-primary/70";
  return "bg-primary";
};

export const ProductivityHeatmap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
      className="bg-card border border-border rounded-xl p-6 shadow-card"
    >
      <h3 className="text-sm font-semibold text-card-foreground mb-4">Productivity Heatmap</h3>
      <div className="flex gap-4">
        <div className="flex flex-col gap-1 pt-0.5">
          {dayLabels.map((d) => (
            <div key={d} className="h-4 text-[10px] text-muted-foreground leading-4">
              {d}
            </div>
          ))}
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {heatmapData.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((val, di) => (
                <div
                  key={di}
                  className={`w-4 h-4 rounded-sm ${getColor(val)} transition-colors`}
                  title={`${val} tasks completed`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-4 text-[10px] text-muted-foreground">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-muted" />
        <div className="w-3 h-3 rounded-sm bg-primary/20" />
        <div className="w-3 h-3 rounded-sm bg-primary/40" />
        <div className="w-3 h-3 rounded-sm bg-primary/70" />
        <div className="w-3 h-3 rounded-sm bg-primary" />
        <span>More</span>
      </div>
    </motion.div>
  );
};
