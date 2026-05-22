package com.example.demo.service;

import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Optional<Employee> getEmployeeById(String id) {
        return repository.findById(id);
    }

    public Employee saveEmployee(Employee employee) {
        LocalDateTime now = LocalDateTime.now();

        employee.setCreatedAt(now);
        employee.setUpdatedAt(now);

        return repository.save(employee);
    }

    public Optional<Employee> updateEmployee(String id, Employee employee) {
        return repository.findById(id).map(existing -> {

            existing.setName(employee.getName());
            existing.setEmail(employee.getEmail());
            existing.setDepartment(employee.getDepartment());
            existing.setSalary(employee.getSalary());
            existing.setHireDate(employee.getHireDate());

            existing.setUpdatedAt(LocalDateTime.now());

            return repository.save(existing);
        });
    }

    public void deleteEmployee(String id) {
        repository.deleteById(id);
    }
}