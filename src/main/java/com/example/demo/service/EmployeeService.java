package com.example.demo.service;

import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Employee getEmployeeById(String id) {
        return repository.findById(id).orElse(null);
    }

    public Employee saveEmployee(Employee employee) {
        LocalDateTime now = LocalDateTime.now();
        employee.setCreatedAt(now);
        employee.setUpdatedAt(now);
        return repository.save(employee);
    }

    public Employee updateEmployee(String id, Employee employee) {
        Employee existing = repository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(employee.getName());
            existing.setEmail(employee.getEmail());
            existing.setDepartment(employee.getDepartment());
            if (employee.getSalary() != null) {
                existing.setSalary(employee.getSalary());
            }
            if (employee.getHireDate() != null) {
                existing.setHireDate(employee.getHireDate());
            }
            existing.setUpdatedAt(LocalDateTime.now());
            return repository.save(existing);
        }
        return null;
    }

    public void deleteEmployee(String id) {
        repository.deleteById(id);
    }
}
