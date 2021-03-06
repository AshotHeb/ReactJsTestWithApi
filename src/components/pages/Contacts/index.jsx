import styles from './contacts.module.css';
import React from 'react';
import Input from '../../Input';
import TextArea from '../../TextArea';
import { Button } from 'react-bootstrap';
import { emailValidator, maxLength, minLength, isRequired } from '../../../utils/validators';

const inputsInfo = [
    {
        name: 'name',
        type: 'text',
        placeholder: 'Name',
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
    },
    {
        name: 'phonenumber',
        type: 'number',
        placeholder: 'PhoneNumber',
    },
    {
        name: 'message',
        type: 'text',
        placeholder: 'Message',
        textarea: true,
        rows: 5

    }
]



class Contacts extends React.Component {
    state = {
        inputs: {
            name: {
                inputValue: '',
                valid: false,
                errorsArray: [],
                touched: false
            },
            email: {
                inputValue: '',
                valid: false,
                errorsArray: [],
                touched: false
            },
            phonenumber: {
                inputValue: '',
                valid: false,
                errorsArray: [],
                touched: false
            },
            message: {
                inputValue: '',
                valid: false,
                errorsArray: [],
                touched: false
            }
        },
        isFormValid: false
    }
    handleSubmit = () => {
        const { name, email, phonenumber, message } = this.state.inputs;
        const formData = {
            name: name.inputValue,
            email: email.inputValue,
            phonenumber: phonenumber.inputValue,
            message: message.inputValue
        };
        console.log('formData', formData);
    }
    handleChange = ({ target: { name, value } }) => {
        const validators = {
            isReq: {
                validator: isRequired,
                errorMsg: 'Input is Required!'
            },
            maxLength25: {
                validator: maxLength(25),
                errorMsg: 'Max length is 25!'
            },
            minLength3: {
                validator: minLength(3),
                errorMsg: 'Min length is 3!'
            },
            maxLength100: {
                validator: maxLength(100),
                errorMsg: 'Max length is 100!'
            },
            emailVal: {
                validator: emailValidator,
                errorMsg: 'Invalid Email Address!'
            }
        };
        const { maxLength25, minLength3, emailVal, isReq, maxLength100 } = validators;

        //Validation One INput
        let valid = true;
        let errorsArray = [];
        switch (name) {
            case 'name':
            case 'email':
            case 'phonenumber':
            case 'message':
                {
                    if (!isReq.validator(value)) {
                        valid = false;
                        errorsArray.push(isReq.errorMsg);
                    }
                    if (name === 'email' && !emailVal.validator(value)) {
                        valid = false;
                        errorsArray.push(emailVal.errorMsg);
                    }
                    if (name === 'message' && !maxLength100.validator(value)) {
                        valid = false;
                        errorsArray.push(maxLength100.errorMsg);
                    }
                    if (!minLength3.validator(value)) {
                        valid = false;
                        errorsArray.push(minLength3.errorMsg);
                    }
                    if (!maxLength25.validator(value) && name !== 'message') {
                        valid = false;
                        errorsArray.push(maxLength25.errorMsg);
                    }

                    break;
                }
            default: return;
        };
        //Validation All inputs
        let isFormValid = false;
        const inputObjectsValues = Object.values(this.state.inputs);
        for (let item of inputObjectsValues) {
            if (item.valid) {
                isFormValid = true;
            } else {
                isFormValid = false;
                break;
            }
        }
        this.setState({
            inputs: {
                ...this.state.inputs,
                [name]: {
                    inputValue: value,
                    valid,
                    errorsArray,
                    touched: true
                }
            },
            isFormValid
        });
    }
    render() {

        const form = inputsInfo.map(input => {
            const inputState = { ...this.state.inputs[input.name] };
            if (input.textarea) {
                delete input.textarea;
                return <TextArea
                    key={input.name}
                    textarea={{ ...input }}
                    onChange={this.handleChange}
                    value={inputState.inputValue}
                    errorMessage={inputState.errorsArray.length && inputState.touched ? inputState.errorsArray[0] : ''}
                />
            }
            return <Input
                key={input.name}
                input={{ ...input }}
                onChange={this.handleChange}
                value={inputState.inputValue}
                errorMessage={inputState.errorsArray.length && inputState.touched ? inputState.errorsArray[0] : ''}
            />
        });

        return (
            <div className={styles.contacts}>
                <h1>Contacts Page</h1>
                <div className={styles.form}>
                    {form}
                    <Button
                        variant="primary"
                        disabled={!this.state.isFormValid}
                        onClick={this.handleSubmit}
                    >
                        Send
                        </Button>
                </div>
            </div>
        );
    }
};

export default Contacts;