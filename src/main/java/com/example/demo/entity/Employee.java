package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "employees")
public class Employee {

    @Id
    private String id;

    private String name;
    private String email;
    private String department;
    private BigDecimal salary;
    
    private LocalDate hireDate;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;

    // 🔹 Constructors
    public Employee() {}

    public Employee(String name, String email, String department) {
        this.name = name;
        this.email = email;
        this.department = department;
    }

    public Employee(String name, String email, String department, BigDecimal salary, LocalDate hireDate) {
        this.name = name;
        this.email = email;
        this.department = department;
        this.salary = salary;
        this.hireDate = hireDate;
    }

    // 🔹 Getters & Setters (IMPORTANT)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {   // ✅ FIX
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {  // ✅ FIX
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {  // ✅ FIX
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public LocalDate getHireDate() {
        return hireDate;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
