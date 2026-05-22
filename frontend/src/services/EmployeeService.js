import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + "/employees";

class EmployeeService {
    getAllEmployees() {
        return axios.get(API_URL);
    }

    getEmployeeById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    createEmployee(employee) {
        return axios.post(API_URL, employee);
    }

    updateEmployee(id, employee) {
        return axios.put(`${API_URL}/${id}`, employee);
    }

    deleteEmployee(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new EmployeeService();