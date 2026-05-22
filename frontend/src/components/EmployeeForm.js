import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import EmployeeService from '../services/EmployeeService';
import { useToast } from '../context/ToastContext';

const EmployeeForm = ({ employee, editMode, onClose }) => {
    const { success, error: showError } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        salary: '',
        hireDate: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name || '',
                email: employee.email || '',
                department: employee.department || '',
                salary: employee.salary || '',
                hireDate: employee.hireDate ? employee.hireDate.substring(0, 10) : ''
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.department.trim()) {
            newErrors.department = 'Department is required';
        }
        
        if (formData.salary && isNaN(formData.salary)) {
            newErrors.salary = 'Salary must be a number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setSubmitError('');

        const employeeData = {
            ...formData,
            salary: formData.salary ? parseFloat(formData.salary) : null,
            hireDate: formData.hireDate || null
        };

        const apiCall = editMode 
            ? EmployeeService.updateEmployee(employee.id, employeeData)
            : EmployeeService.createEmployee(employeeData);

        apiCall
            .then(() => {
                const message = editMode ? 'Employee updated successfully!' : 'Employee added successfully!';
                success(message);
                onClose();
            })
            .catch(error => {
                console.error('Error saving employee:', error);
                const errorMessage = error.response?.data?.message || 
                    `Failed to ${editMode ? 'update' : 'add'} employee. Please try again.`;
                setSubmitError(errorMessage);
                showError(errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Support'];

    return (
        <Form onSubmit={handleSubmit}>
            {submitError && <Alert variant="danger">{submitError}</Alert>}
            
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Full Name *</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Email *</strong></Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Department *</strong></Form.Label>
                        <Form.Select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            isInvalid={!!errors.department}
                        >
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.department}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Salary</strong></Form.Label>
                        <Form.Control
                            type="number"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="Enter salary"
                            step="0.01"
                            min="0"
                            isInvalid={!!errors.salary}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.salary}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label><strong>Hire Date</strong></Form.Label>
                        <Form.Control
                            type="date"
                            name="hireDate"
                            value={formData.hireDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={onClose} disabled={loading}>
                    <strong>Cancel</strong>
                </Button>
                <Button 
                    variant={editMode ? "warning" : "primary"} 
                    type="submit"
                    disabled={loading}
                >
                    {loading ? <strong>Saving...</strong> : (editMode ? <strong>Update Employee</strong> : <strong>Add Employee</strong>)}
                </Button>
            </div>
        </Form>
    );
};

export default EmployeeForm;