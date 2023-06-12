import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import StudentList from '../components/student-list';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    gender: '',
    program: ''
  });

  useEffect(() => {
    fetch(`http://localhost:5001/?name=${searchCriteria.name}&gender=${searchCriteria.gender}&program=${searchCriteria.program}`, {
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [searchCriteria]);

  const handleInputChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <div>
        <div className="row">
            <div className="col-md-4">

            </div>
            <div className="col-md-4">
                
            </div>
            <div className="col-md-4">
                
            </div>
        </div>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={searchCriteria.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="male"
              checked={searchCriteria.gender === 'male'}
              onChange={handleInputChange}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="female"
              checked={searchCriteria.gender === 'female'}
              onChange={handleInputChange}
            />
          </div>
        </Form.Group>

        <Form.Group controlId="formProgram">
          <Form.Label>Program</Form.Label>
          <Form.Control
            as="select"
            name="program"
            value={searchCriteria.program}
            onChange={handleInputChange}
          >
            <option value="">All Programs</option>
            <option value="">Select Program</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Data Science">Data Science</option>
          </Form.Control>
        </Form.Group>
      </Form>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <StudentList students={students} />
      )}
    </div>
  );
};

export default Home;
