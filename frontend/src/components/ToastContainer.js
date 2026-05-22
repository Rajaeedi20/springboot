import React from 'react';
import { Toast, ToastContainer as BootstrapToastContainer } from 'react-bootstrap';
import { useToast } from '../context/ToastContext';

const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    return (
        <BootstrapToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    onClose={() => removeToast(toast.id)}
                    show={true}
                    delay={4000}
                    autohide
                    bg={toast.type}
                    className="text-white"
                >
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            ))}
        </BootstrapToastContainer>
    );
};

export default ToastContainer;
