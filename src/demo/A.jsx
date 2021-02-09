import React from 'react';
import B from './B';

class A extends React.Component {
    state = {
        text: 'Text to B',
        counter: 0
    }
    plusCounter = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }
    render() {
        console.log('Render A');
        return (
            <div>
                <B text={this.state.text} />
                <p>Counter : {this.state.counter}</p>
                <button onClick={this.plusCounter}>+</button>
            </div>
        )
    }
}

export default A;