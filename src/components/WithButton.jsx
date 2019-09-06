import React from 'react';

/*
 * A HOC function that will be responsible on rendering buttons
 * in the calculator. The component returns a higer-order function
 * that accepts the button component to render and pass props to it.
 *
 * */
function withButton(props) {

    return (WrappedComponent) => {
        return <WrappedComponent {...props}/>
    };
}

export default withButton;