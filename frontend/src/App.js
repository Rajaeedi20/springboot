import React from 'react';
import { Container } from 'react-bootstrap';
import EmployeeList from './components/EmployeeList';
import ToastContainer from './components/ToastContainer';
import { ToastProvider } from './context/ToastContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
    return (
        <ToastProvider>
            <div className="App">
                <nav className="navbar navbar-dark bg-dark mb-4">
                    <Container>
                        <span className="navbar-brand mb-0 h1">
                            <i className="bi bi-people-fill me-2"></i>
                            Employee Management System
                        </span>
                        <span className="text-light">
                            Spring Boot + React 
                        </span>
                    </Container>
                </nav>
                
                <ToastContainer />
                
                <Container>
                    <EmployeeList />
                </Container>

                <footer className="mt-5 py-3 bg-light text-center">
                    <Container>
                        <p className="mb-0 text-muted">
                            © 2026 Employee Management System. 
                    </p>
                </Container>
            </footer>
            </div>
        </ToastProvider>
    );
}

export default App;