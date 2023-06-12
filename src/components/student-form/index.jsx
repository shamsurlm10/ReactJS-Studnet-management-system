import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const StudentForm = ({ name, age, address, phone, email, dob, eob, gender, program, comment, onChangeHandler, handleSubmit }) => {
    const [validated, setValidated] = useState(false);

  const handleFormSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    handleSubmit(event);
};
    
return (
    <div className='row'>
      <div className="col-md-6">
        <Form className="d-grid gap-2" style={{ margin: '3rem' }} noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="forName">
            <Form.Control
              type="text"
              placeholder="Enter Name"
              required
              value = {name}
              name="name"
              onChange={onChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="forAge">
            <Form.Control
              type="text"
              placeholder="Enter Age"
              required
              value = {age}
              name="age"
              onChange={onChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide an age.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="forAddress">
            <Form.Control
              type="text"
              placeholder="Enter Address"
              required
              value = {address}
              name="address"
              onChange={onChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide an address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="forPhone">
            <Form.Control
              type="text"
              placeholder="Enter Phone"
              required
              value = {phone}
              name="phone"
              onChange={onChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a phone number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="forEmail">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              required
              value = {email}
              name="email"
              onChange={onChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="forDob">
            <Form.Control
              type="date"
              required
              value={dob}
              name="dob"
              onChange={onChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a date of birth.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="forEob">
            <Form.Control
              type="date"
              required
              value={eob}
              name="eob"
              onChange={onChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a date of enrollment.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="forGender">
            <Form.Check
              type="radio"
              label="Male"
              value="male"
              name="gender"
              checked={gender === 'male'}
              onChange={onChangeHandler}
              required
            />
            <Form.Check
              type="radio"
              label="Female"
              value="female"
              name="gender"
              checked={gender === 'female'}
              onChange={onChangeHandler}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please select a gender.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="forProgram">
            <Form.Control
              as="select"
              required
              value={program}
              name="program"
              onChange={onChangeHandler}
            >
              <option value="">Select Program</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Data Science">Data Science</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select a program.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="forComment">
            <Form.Control
              as="textarea"
              required
              value={comment}
              name="comment"
              onChange={onChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a comment.
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className="col-md-6 ">
        <img src="https://img.freepik.com/free-vector/graphic-design-geometric-wallpaper_52683-34399.jpg" alt="" style={{ marginTop: '4rem' }} />
      </div>
    </div>
  );
};

export default StudentForm;