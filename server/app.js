const express = require('express');
const app = express();

const fs = require('fs');
const shortid = require('shortid');
const cors = require('cors');
const morgan = require('morgan');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

/**
 * reads all students from JSON file
 * @returns {Array} array of students
 */
const getAllStudents = () => {
    return JSON.parse(fs.readFileSync('./db/student-data.json', 'utf8'));
};

/**
 * GET: '/'
 * Get all students
 */
app.get('/', (req, res) => {
    const { name, gender, program } = req.query;
  
    let students = getAllStudents();
  
    // Perform search based on name, gender, and program
    if (name) {
      students = students.filter((student) => student.name.toLowerCase().includes(name.toLowerCase()));
    }
  
    if (gender) {
      students = students.filter((student) => student.gender.toLowerCase() === gender.toLowerCase());
    }
  
    if (program) {
      students = students.filter((student) => student.program.toLowerCase().includes(program.toLowerCase()));
    }
  
    return res.json(students).status(200);
  });
/**
 * GET: '/id'
 * Get a student by their ID
 */
app.get('/:id', (req, res, next) => {
    const { id } = req.params;

    let content = getAllStudents();
    content.forEach((student) => {
        if (student.id == id) return res.json(student).status(200);
    });
    res.json({ error: 'student not found' }).status(404);
});

/**
 * POST: '/'
 * Create a student
 */
app.post('/', (req, res, next) => {
    const { name, age, address, phone, email, dob, eob, gender, program, comment } = req.body;

    // Validation
    if (!name || !age || !address || !phone || !email || !dob || !eob || !gender || !program || !comment) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    let content = getAllStudents();

    const student = {
        id: shortid.generate(),
        name: name,
        age: age,
        address: address,
        phone: phone,
        email: email,
        dob: dob,
        eob: eob,
        gender: gender,
        program: program,
        comment: comment,
    };

    // Appending the new student to the array
    content.push(student);

    // Writing to the file
    fs.writeFileSync('./db/student-data.json', JSON.stringify(content));

    res.status(201).json(student);
});


/**
 * PUT: '/id'
 * Change a student's info by their ID
 */
app.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, age, address, phone, email, dob, eob, gender, program, comment } = req.body;

    // if validation needs then do it here
    if (!name || !age || !address || !phone || !email || !dob || !eob || !gender || !program || !comment) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedStudent = {
        id: id,
        name: name,
        age: age,
        address: address,
        phone: phone,
        email: email,
        dob: dob,
        eob: eob,
        gender: gender,
        program: program,
        comment: comment,
    };

    let flag = true;
    let content = getAllStudents();

    const newData = content.map((student) => {
        if (student.id === id) {
            flag = false;
            return updatedStudent;
        } else {
            return student;
        }
    });

    if (flag) return res.status(404).json({ error: 'Student not found' });

    // writing to the file
    fs.writeFileSync('./db/student-data.json', JSON.stringify(newData));

    return res.status(200).json(updatedStudent);
});


/**
 * DELETE: '/id'
 * Delete a student by their ID
 */
app.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    let content = getAllStudents();
    const newData = content.filter((student) => student.id !== id);

    // writing to the file
    fs.writeFileSync('./db/student-data.json', JSON.stringify(newData));

    return res.json({ message: 'success' }).status(200);
});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
