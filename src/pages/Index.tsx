import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { MetricsGrid } from "@/components/MetricsGrid";
import { WeeklyChart } from "@/components/charts/WeeklyChart";
import { CategoryChart } from "@/components/charts/CategoryChart";
import { ProductivityHeatmap } from "@/components/charts/ProductivityHeatmap";
import { ProductivityScoreCard } from "@/components/ProductivityScoreCard";
import { TaskList } from "@/components/TaskList";
import { TargetProgress } from "@/components/TargetProgress";
import { Watermark } from "@/components/Watermark";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";
import { useNotification } from "@/contexts/NotificationContext";

type View = "dashboard" | "tasks" | "analytics";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const { addNotification } = useNotification();
  const { tasks, toggleTask, addTask, deleteTask, deleteAllTasks } = useTasks();

  const handleToggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    const isCompleting = task && !task.completed;

    if (isCompleting) {
      addNotification(
        "Task Completed 🎯",
        `Great job completing "${task.title}"!`
      );
    }

    toggleTask(id);
  };

  const handleAddTask = (task: Task) => {
    addTask(task);
    addNotification(
      "New Task Added 📝",
      `"${task.title}" has been added to your list.`
    );
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-auto">
        <DashboardHeader view={currentView} />
        <div className="p-6 space-y-6">
          {currentView === "dashboard" && (
            <>
              <MetricsGrid tasks={tasks} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <WeeklyChart />
                </div>
                <ProductivityScoreCard />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TaskList
                  tasks={tasks.filter((t) => !t.completed).slice(0, 5)}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  compact
                />
                <TargetProgress tasks={tasks} />
              </div>
            </>
          )}
          {currentView === "tasks" && (
            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onAdd={handleAddTask}
              onDeleteAll={deleteAllTasks}
            />
          )}
          {currentView === "analytics" && (
            <>
              <MetricsGrid tasks={tasks} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WeeklyChart />
                <CategoryChart />
              </div>
              <ProductivityHeatmap />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProductivityScoreCard />
                <TargetProgress tasks={tasks} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
