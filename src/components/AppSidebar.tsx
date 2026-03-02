import { LayoutDashboard, CheckSquare, BarChart3, Target, Zap } from "lucide-react";

type View = "dashboard" | "tasks" | "analytics";

interface AppSidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const navItems = [
  { id: "dashboard" as View, label: "Dashboard", icon: LayoutDashboard },
  { id: "tasks" as View, label: "Tasks", icon: CheckSquare },
  { id: "analytics" as View, label: "Analytics", icon: BarChart3 },
];

export const AppSidebar = ({ currentView, onViewChange }: AppSidebarProps) => {
  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col min-h-screen shrink-0">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-accent-foreground">Prodify</h1>
            <p className="text-xs text-sidebar-foreground/60">Intelligent Productivity</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border flex flex-col items-center">
        <div className="flex items-center gap-3 px-3 py-2 w-full">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
            <Target className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-sidebar-accent-foreground">Monthly Goal</p>
            <p className="text-xs text-sidebar-foreground/60">78% achieved</p>
          </div>
        </div>

        <div className="mt-4 text-[10px] text-muted-foreground/40 font-semibold select-none pointer-events-none">
          Created by Aniket Sahu
        </div>
      </div>
    </aside>
  );
};
