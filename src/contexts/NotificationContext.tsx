import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface Notification {
    id: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (title: string, message: string) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 'welcome-notification',
            title: 'Welcome to Prodify',
            message: 'Your productivity dashboard is ready. Start by adding a new task!',
            read: false,
            createdAt: new Date(),
        }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const addNotification = useCallback((title: string, message: string) => {
        const newNotification: Notification = {
            id: Math.random().toString(36).substring(2, 9),
            title,
            message,
            read: false,
            createdAt: new Date(),
        };
        setNotifications(prev => [newNotification, ...prev]);
    }, []);

    const markAsRead = useCallback((id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    }, []);

    const markAllAsRead = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }, []);

    const removeNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                addNotification,
                markAsRead,
                markAllAsRead,
                removeNotification
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
