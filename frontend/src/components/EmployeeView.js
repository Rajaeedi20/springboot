import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

const EmployeeView = ({ employee }) => {
    if (!employee) {
        return <div className="text-center">No employee data available</div>;
    }

    const formatCurrency = (amount) => {
        if (!amount) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getDepartmentColor = (dept) => {
        const colors = {
            'IT': 'primary',
            'HR': 'success',
            'Finance': 'warning',
            'Marketing': 'info',
            'Sales': 'danger',
            'Operations': 'secondary'
        };
        return colors[dept] || 'dark';
    };

    return (
        <Card>
             
            <Card.Body>
                <Row className="mb-4">
                    <Col md={8}>
                        <h3>Name: {employee.name}</h3>
                        <p className="text-muted">Employee ID: {`EMP${employee.id.slice(-5).toUpperCase()}`}</p>
                    </Col>
                    <Col md={4} className="text-end">
                        <Badge bg={getDepartmentColor(employee.department)} className="fs-6 p-2">
                            {employee.department || 'Not Assigned'}
                        </Badge>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                        <div className="mb-3">
                            <h6 className="text-muted">Contact Information</h6>
                            <p className="mb-1">
                                <strong>Email:</strong> {employee.email}
                            </p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mb-3">
                            <h6 className="text-muted">Employment Details</h6>
                            <p className="mb-1">
                                <strong>Hire Date:</strong> {formatDate(employee.hireDate)}
                            </p>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="mb-3">
                            <h6 className="text-muted">Financial Information</h6>
                            <p className="mb-1">
                                <strong>Salary:</strong> {formatCurrency(employee.salary)}
                            </p>
                        </div>
                    </Col>
                </Row>

                

                <div className="mt-4 p-3 bg-light rounded">
                    <h6>Quick Actions</h6>
                    <p className="mb-0 text-muted small">
                        Employee ID: {`EMP${employee.id.slice(-5).toUpperCase()}`} | 
                        Status: <span className="text-success fw-bold">Active</span>
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default EmployeeView;