import { useState, useCallback,  useEffect } from 'react';

const Hooks = (props) => {


    const [counter, setCounter] = useState(0);
    const [message, setMessage] = useState("Hello");

    const sayHello = useCallback((text) => {
        console.log(text);
    }, []);
    useEffect(() => {
        sayHello(message);
    }, [sayHello, message]);



    return (
        <div>
            <h1>Hooks Component</h1>
            <div>
                <button onClick={() => setCounter(counter + 1)}>Click to Pluse Count{counter}</button>
            </div>
        </div>
    );
};
export default Hooks;