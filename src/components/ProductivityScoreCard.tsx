import { motion } from "framer-motion";
import { productivityScore } from "@/data/mockData";

export const ProductivityScoreCard = () => {
  const { overall, completionRate, onTimeRate, streakConsistency, delayFrequency } = productivityScore;

  const circumference = 2 * Math.PI * 58;
  const offset = circumference - (overall / 100) * circumference;

  const breakdown = [
    { label: "Completion", value: completionRate, weight: "40%" },
    { label: "On-time", value: onTimeRate, weight: "30%" },
    { label: "Streak", value: streakConsistency, weight: "20%" },
    { label: "Delay (−)", value: delayFrequency, weight: "10%" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="bg-card border border-border rounded-xl p-6 shadow-card"
    >
      <h3 className="text-sm font-semibold text-card-foreground mb-4">Productivity Score</h3>

      <div className="flex items-center justify-center mb-5">
        <div className="relative">
          <svg width="140" height="140" className="-rotate-90">
            <circle cx="70" cy="70" r="58" fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
            <circle
              cx="70"
              cy="70"
              r="58"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(175 80% 40%)" />
                <stop offset="100%" stopColor="hsl(260 60% 55%)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-card-foreground">{overall}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {breakdown.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {item.label} <span className="text-muted-foreground/60">({item.weight})</span>
            </span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-primary rounded-full transition-all duration-700"
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="font-mono font-medium text-card-foreground w-8 text-right">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
