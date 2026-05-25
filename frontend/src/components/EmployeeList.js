import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner, Modal } from 'react-bootstrap';
import EmployeeService from '../services/EmployeeService';
import EmployeeForm from './EmployeeForm';
import EmployeeView from './EmployeeView';
import { useToast } from '../context/ToastContext';

const EmployeeList = () => {
    const { success, error: showError } = useToast();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showView, setShowView] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchEmployees();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchEmployees = () => {
        setLoading(true);
        EmployeeService.getAllEmployees()
            .then(response => {
                setEmployees(response.data);
                setError('');
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
                setError('Failed to fetch employees. Please check if backend is running.');
                showError('Failed to fetch employees. Please check if backend is running.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            EmployeeService.deleteEmployee(id)
                .then(() => {
                    fetchEmployees();
                    success('Employee deleted successfully!');
                })
                .catch(error => {
                    console.error('Error deleting employee:', error);
                    showError('Failed to delete employee.');
                });
        }
    };

    const handleView = (employee) => {
        setSelectedEmployee(employee);
        setShowView(true);
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setEditMode(true);
        setShowForm(true);
    };

    const handleAdd = () => {
        setSelectedEmployee(null);
        setEditMode(false);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setSelectedEmployee(null);
        fetchEmployees();
    };

    const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};


    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Employee</h2>
                <Button variant="primary" onClick={handleAdd}>
                    <i className="fa fa-plus me-2"></i> <strong>Add Employee</strong>
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p>Loading employees...</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <Table striped bordered hover className="shadow-sm">
                        <thead className="table-dark">
                            <tr className='text-center'>
                                <th><strong>S.No</strong></th>
                                <th><strong>Employee ID</strong></th>
                                <th><strong>Name</strong></th>
                                <th><strong>Email</strong></th>
                                <th><strong>Department</strong></th>
                                <th><strong>Salary</strong></th>
                                <th><strong>Hire Date</strong></th>
                                <th><strong>Actions</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No employees found. Add your first employee!
                                    </td>
                                </tr>
                            ) : (
                                employees.map((employee, index) => (
                                    <tr key={employee.id} className='text-center'>
                                    <td>
  {`${index + 1}`}
</td>
                                        <td>
                                            {`EMP${employee.id.slice(-5).toUpperCase()}`}
                                        </td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                            <span >
                                                {employee.department || 'N/A'}
                                            </span>
                                        </td>
                                        <td>
    {employee.salary
        ? `${(employee.salary / 100000).toFixed(1)} LPA`
        : 'N/A'}
</td>
                                        <td>{formatDate(employee.hireDate)}</td>
                                        <td>
                                            <Button 
                                                variant="info" 
                                                size="sm" 
                                                className="me-2 btn-sm"
                                                onClick={() => handleView(employee)}
                                            >
                                                <i className="fas fa-eye"></i>
                                            </Button>
                                            <Button 
                                                variant="warning" 
                                                size="sm" 
                                                className="me-2 btn-sm"
                                                onClick={() => handleEdit(employee)}
                                            >
                                                <i className="fas fa-pencil"></i>
                                            </Button>
                                            <Button className="btn-sm"
                                                variant="danger" 
                                                size="sm"
                                                onClick={() => handleDelete(employee.id)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>
            )}

            {/* View Modal */}
            <Modal show={showView} onHide={() => setShowView(false)} size="lg" backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title><strong>Employee Details</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EmployeeView employee={selectedEmployee} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowView(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add/Edit Modal */}
            <Modal show={showForm} onHide={handleFormClose} size="lg" backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editMode ? <strong>Edit Employee</strong> : <strong>Add Employee</strong>}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EmployeeForm 
                        employee={selectedEmployee}
                        editMode={editMode}
                        onClose={handleFormClose}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EmployeeList;