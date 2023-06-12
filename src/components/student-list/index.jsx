import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StudentList = ({ students }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedStudentId, setDeletedStudentId] = useState(null);

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/${id}`, {
        method: 'DELETE',
        mode: 'cors',
      });

      if (response.status === 200) {
        alert('Student deleted successfully');
        setDeletedStudentId(id);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete student');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while deleting the student');
    }
  };

  const pageSize = 4; // Number of rows per page
  const totalPages = Math.ceil(students.length / pageSize); // Calculate the total number of pages
  const startIndex = (currentPage - 1) * pageSize; // Calculate the starting index for the current page
  const endIndex = startIndex + pageSize; // Calculate the ending index for the current page
  const paginatedStudents = students.slice(startIndex, endIndex); // Get the students for the current page

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredStudents = paginatedStudents.filter((student) => student.id !== deletedStudentId);

  return (
    <div>
      {!filteredStudents || filteredStudents.length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <h1>Empty List</h1>
        </div>
      ) : (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Enrollment Date</th>
                <th>Gender</th>
                <th>Program</th>
                <th>Comment</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.address}</td>
                  <td>{student.phone}</td>
                  <td>{student.email}</td>
                  <td>{student.dob}</td>
                  <td>{student.eob}</td>
                  <td>{student.gender}</td>
                  <td>{student.program}</td>
                  <td>{student.comment}</td>
                  <td>
                    <div className="d-flex">
                      <Button
                        type="submit"
                        className="btn-success"
                        onClick={() => handleUpdate(student.id)}
                      >
                        Update
                      </Button>
                      <Button
                        type="submit"
                        className="btn-danger"
                        style={{ marginLeft: '4px', width: '77px' }}
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination" style={{ gap: '8px' }}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <Button
                key={page}
                className={currentPage === page ? 'active' : ''}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
