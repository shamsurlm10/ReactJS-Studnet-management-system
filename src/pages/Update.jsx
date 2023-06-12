import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const Update = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [state, setState] = useState({ ...init });

    useEffect(() => {
        fetch(`http://localhost:5001/${params.id}`, {
            method: 'GET',
            mode: 'cors',
        })
            .then((res) => res.json())
            .then((data) => {
                const tempState = {
                    name: data.name,
                    age: data.age,
                    address: data.address,
                    phone: data.phone,
                    email: data.email,
                    dob: data.dob,
                    eob: data.eob,
                    gender: data.gender,
                    program: data.program,
                    comment: data.comment
                };
                setState(tempState);
                setIsLoading(false);
            })
            .catch((e) => console.log(e));
    }, []);
    let history = useNavigate();

    const onChangeHandler = (e) => {
        const newState = { ...state, [e.target.name]: e.target.value };
        setState(newState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedStudent = {
            id: params.id,
            name: state.name,
            age: state.age,
            address: state.address,
            phone: state.phone,
            email: state.email,
            dob: state.dob,
            eob: state.eob,
            gender: state.gender,
            program: state.program,
            comment: state.comment
        };
    
        try {
            const response = await fetch(`http://localhost:5001/${params.id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStudent),
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                alert('Updated');
                history(`/update/${params.id}`);
            } else {
                alert('Error');
                console.log(data.error || 'Error');
            }
        } catch (e) {
            console.log(e.message);
        }
    };
    

    return (<StudentForm name={state.name} age={state.age}
        address={state.address} phone={state.phone}
        email={state.email} dob={state.dob}
        eob={state.eob} gender={state.gender}
        program={state.program} comment={state.comment}
        handleSubmit={handleSubmit} onChangeHandler={onChangeHandler} />
    );
};

export default Update;
