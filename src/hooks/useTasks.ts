import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { mockTasks } from "@/data/mockData";
import { isSameDay, isSameWeek, isSameMonth } from "date-fns";

const TASKS_STORAGE_KEY = "prodify_tasks";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
        if (!savedTasks) {
            return mockTasks;
        }

        try {
            const parsed = JSON.parse(savedTasks);
            return parsed.map((task: any) => ({
                ...task,
                dueDate: new Date(task.dueDate),
                createdAt: new Date(task.createdAt),
                completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
            }));
        } catch (e) {
            console.error("Failed to parse tasks from local storage", e);
            return mockTasks;
        }
    });

    // Handle task resets based on recurrence
    useEffect(() => {
        const now = new Date();
        let hasChanges = false;

        const updatedTasks = tasks.map((task) => {
            // If task is not completed, no need to reset
            if (!task.completed || !task.completedAt || !task.recurrence || task.recurrence === "none") {
                return task;
            }

            let shouldReset = false;

            switch (task.recurrence) {
                case "daily":
                    shouldReset = !isSameDay(now, task.completedAt);
                    break;
                case "weekly":
                    shouldReset = !isSameWeek(now, task.completedAt, { weekStartsOn: 1 }); // Assuming week starts on Monday
                    break;
                case "monthly":
                    shouldReset = !isSameMonth(now, task.completedAt);
                    break;
            }

            if (shouldReset) {
                hasChanges = true;
                return {
                    ...task,
                    completed: false,
                    completedAt: undefined,
                };
            }

            return task;
        });

        if (hasChanges) {
            setTasks(updatedTasks);
        }
    }, []); // Run once on mount

    // Save to local storage whenever tasks change
    useEffect(() => {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const toggleTask = (id: string) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id
                    ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date() : undefined }
                    : t
            )
        );
    };

    const addTask = (task: Task) => {
        setTasks((prev) => [task, ...prev]);
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const deleteAllTasks = () => {
        setTasks([]);
    };

    return {
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        deleteAllTasks,
    };
};
