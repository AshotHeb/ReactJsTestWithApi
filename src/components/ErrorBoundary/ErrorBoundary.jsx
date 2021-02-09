import React from 'react';


class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        errorMessage: ''
    }
    render() {
        const { hasError, errorMessage } = this.state;
        if (hasError) {
            return <div>{errorMessage} </div>
        } else {
            return this.props.children;
        }
    }
    componentDidCatch(error, info) {
        console.log('error' ,error.message);
        this.setState({
            hasError: true,
            errorMessage: error.message
        })
    }
}


export default ErrorBoundary;