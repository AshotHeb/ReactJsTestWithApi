import { useState, useEffect, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import { isRequired } from '../../../utils/validators';

const inputs = [
    {
        type: "text",
        name: "name",
        placeholder: "Name",
    },
    {
        type: "text",
        name: "surname",
        placeholder: "Surname",
    },
    {
        type: "email",
        name: "email",
        placeholder: "Email",
    },
    {
        type: "password",
        name: "password",
        placeholder: "Password",
    },
    {
        type: "password",
        name: "confirmPassword",
        placeholder: "Confirm Password",
    }
]
const Registration = (props) => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setError] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        confirmPassword: null
    });
    const handleChange = useCallback((e) => {
        const { value, name } = e.target;
        let error = isRequired(value) || null;
        if (error) {
            setError({
                ...errors,
                [name]: error
            });
        }
        setFormData({
            ...formData,
            [name]: value
        });
    }, [setFormData, formData, setError, errors]);

    const handleSubmit = () => {


        fetch('http://localhost:3001/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)

        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                props.history.push("/login");

            })
            .catch(error => {
                console.log('Error Add Task', error);
            })
    }
    const inputsJsx = inputs.map((input, index) => {
        return (
            <Form.Group key={index}>
                <Form.Control
                    {...input}
                    onChange={handleChange}
                    value={formData[input.name]}
                />
                <Form.Text style={{ color: "red", fontSize: "12px" }}>{errors[input.name]}</Form.Text>
            </Form.Group>
        );
    });
    return (
        <Form
            onSubmit={(e) => e.preventDefault()}
            style={{ width: "300px", margin: "0 auto" }}
            className="mt-5"
        >
            {inputsJsx}
            <Button onClick={handleSubmit}>Send</Button>
        </Form>
    );
}

export default Registration;