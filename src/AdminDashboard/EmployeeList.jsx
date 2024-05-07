import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const EmployeeList = () => {
  // Sample data
  const [employees, setEmployees] = useState([
    { id: 1, code: 'E001', name: 'John Doe', team: 'Engineering', manager: 'Jane Smith', position: 'Software Engineer', status: 'activated' },
    { id: 2, code: 'E002', name: 'Alice Johnson', team: 'Marketing', manager: 'Bob Brown', position: 'Marketing Manager', status: 'deactivated' },
    // Add more employee data as needed
  ]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Get current employees
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Employee List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee Code</th>
            <th>Employee Name</th>
            <th>Team Name</th>
            <th>Manager Name</th>
            <th>Position</th>
            <th>Employee Status</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.code}</td>
              <td>{employee.name}</td>
              <td>{employee.team}</td>
              <td>{employee.manager}</td>
              <td>{employee.position}</td>
              <td>
                <Button variant={employee.status === 'activated' ? 'success' : 'danger'}>{employee.status}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <ul className="pagination">
          {[...Array(Math.ceil(employees.length / itemsPerPage)).keys()].map((number) => (
            <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
              <Button onClick={() => paginate(number + 1)} className="page-link">{number + 1}</Button>
            </li>
          ))}
        </ul>
        <p>Showing {indexOfFirstEmployee + 1} to {indexOfLastEmployee > employees.length ? employees.length : indexOfLastEmployee} of {employees.length} items</p>
      </div>
    </div>
  );
};

export default EmployeeList;
