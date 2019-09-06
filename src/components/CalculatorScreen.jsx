import React from 'react';

function CalculatorScreen(props) {

    return (

        <div className={'h-24 px-4 py-2 flex flex-col bg-gray-100 text-right'}>

            <p className={'h-10 text-gray-400'}>
                {props.screenExpression}
            </p>

            <h2 className={'h-12 text-gray-700 md:text-2xl font-bold sm:text-base'}>
                {props.screenResult}
            </h2>

        </div>

    );

}

export default CalculatorScreen;