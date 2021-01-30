import React from 'react';


class B extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log('nextProps B', nextProps);
        console.log('nextState B', nextState);
        if (nextProps.text === this.props.text)
            return false;
        return true;
    }
    render() {
        console.log('Render B');
        return (
            <div>

            </div>
        )
    }
}

export default B;