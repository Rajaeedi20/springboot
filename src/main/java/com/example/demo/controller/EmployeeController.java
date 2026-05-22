package com.example.demo.controller;

import com.example.demo.entity.Employee;
import com.example.demo.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(service.getAllEmployees());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String id) {
        return service.getEmployeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        Employee saved = service.saveEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable String id,
            @RequestBody Employee employee) {

        return service.updateEmployee(id, employee)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String id) {
        service.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully");
    }
}