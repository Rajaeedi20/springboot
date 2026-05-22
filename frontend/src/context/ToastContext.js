import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info', duration = 4000) => {
        const id = Date.now();
        const newToast = { id, message, type };
        
        setToasts(prev => [...prev, newToast]);
        
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
        
        return id;
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const success = (message, duration = 4000) => addToast(message, 'success', duration);
    const error = (message, duration = 4000) => addToast(message, 'danger', duration);
    const warning = (message, duration = 4000) => addToast(message, 'warning', duration);
    const info = (message, duration = 4000) => addToast(message, 'info', duration);

    return (
        <ToastContext.Provider value={{ addToast, removeToast, toasts, success, error, warning, info }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};
