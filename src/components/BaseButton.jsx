import React from 'react';

function BaseButton(props) {

    const baseClasses = [
        'w-1/4',
        'h-12',
        'border',
        'hover:text-white',
        'hover:bg-gray-400',
        'hover:border-0'
    ];

    const defaultClasses = [
        'bg-gray-200',
        'border-gray-300',
        'text-gray-600'
    ];

    let buttonClasses = baseClasses;
    if (props.classes === undefined) {
        buttonClasses.push(...defaultClasses);
    } else {
        buttonClasses.push(...props.classes);
    }

    buttonClasses = buttonClasses.join(' ');

    return (
        <button onClick={e => handleButtonClick(e, props)}
                className={buttonClasses}>
            {props.buttonTitle}
        </button>
    );

}

/*
 * Handle button click, the click event calls parent passed callback handler
* */
function handleButtonClick(e, props) {
    e.preventDefault();

    props.onClickHandler(props.buttonValue);

}

export default BaseButton;