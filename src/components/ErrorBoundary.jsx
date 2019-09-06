import React from 'react';

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            errorInfo: null
        };
    }

    /*
    * Catching the error that has occured.
    * */
    componentDidCatch(error, errorInfo) {

        this.setState({
            error,
            errorInfo
        });

        console.error(`An Error has occured`, errorInfo);
    }

    /*
    * Updating the state so in the next render the returned state
    * from this hook will be used.
    * */
    static getDerivedStateFromError(error) {

        return {
            firstNumber: null,
            operator: null,
            secondNumber: null,
            hasError: true
        };
    }

    /*
    * Render the component UI look. Here we will return null,
    * since we don't want to replace the whole clculator UI
    * with the error boundary look. Instead, the calculator
    * screen component will display the ERROR_SCREEN message
    * to user.
    * */
    render() {

        if (this.state.hasError) {
            return (
                <div>Something went Wrong! Please refresh the page</div>
            );
        }
        return this.props.children;

    }

}


export default ErrorBoundary;