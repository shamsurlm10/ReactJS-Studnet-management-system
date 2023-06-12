import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/student-form';

const init = {
    name: '',
    age: '',
    address: '',
    phone: '',
    email: '',
    dob: '',
    eob: '',
    gender: '',
    program: '',
    comment: ''
};

const Create = () => {
    const [state, setState] = useState({ ...init });

    let history = useNavigate();

    const onChangeHandler = (e) => {
        const newState = JSON.parse(JSON.stringify(state));
        newState[e.target.name] = e.target.value;
        setState({ ...newState })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const student = {
            name: state.name, age: state.age,
            address: state.address, phone: state.phone,
            email: state.email, dob: state.dob,
            eob: state.eob, gender: state.gender,
            program: state.program, comment: state.comment
        };

        try {
            const response = await fetch('http://localhost:5001/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            const data = await response.json();

            if (response.status === 201) {
                alert('Created');
            } else {
                alert('Error');
                console.log(data.error || 'Error');
            }
        } catch (e) {
            console.log(e.message);
        }

        history('/');
    };

    return (<StudentForm name={state.name} age={state.age}
        address={state.address} phone={state.phone}
        email={state.email} dob={state.dob}
        eob={state.eob} gender={state.gender}
        program={state.program} comment={state.comment}
        handleSubmit={handleSubmit} onChangeHandler={onChangeHandler} />)
};

export default Create;
