import React, {Component} from 'react';

import CalculatorScreen from "./CalculatorScreen";
import ErrorBoundary from "./ErrorBoundary";

import {DECIMAL_PERIOD, BUTTONS_TEMPLATE, NUMBERS, OPERATIONS, FUNCTIONS} from '../utilities/constants';
import {
    areEqual, buttonType,
    executeUnderlyingFunction,
    formatScreenExpression, getCalculatorRecentOperandValue,
    getMathState,
    isOperatorBinary
} from "../utilities/helpers";

import withButton from "./WithButton";
import BaseButton from "./BaseButton";
import History from "./History";

import {ReactComponent as HistoryIcon} from './../icons/history-clock.svg';
import {ReactComponent as HistoryTrash} from './../icons/trash.svg';

class Calculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstNumber: null,
            secondNumber: null,
            operator: null,
            hasError: false,
            currentScreenExpression: '',
            history: [],
            showHistory: false,
        };

        this.handleNumberClick = this.handleNumberClick.bind(this);
        this.handleOperationClick = this.handleOperationClick.bind(this);
        this.handleFunctionClick = this.handleFunctionClick.bind(this);
        this.handleHistoryClick = this.handleHistoryClick.bind(this);
        this.handleHistoryClear = this.handleHistoryClear.bind(this);
    }

    /*
    * Handles number button click
    * */
    handleNumberClick(digit) {

        digit = parseInt(digit);

        const operandName = (this.state.operator === null) ? 'firstNumber' : 'secondNumber';

        this.setState((prevState) => {

            let newOperand = digit;

            if (Number.isFinite(prevState[operandName])) {

                newOperand = parseFloat(`${prevState[operandName]}${digit}`);

            }

            const currentScreenExpression =
                formatScreenExpression(prevState.currentScreenExpression, newOperand, this.state.hasError);

            return {
                [operandName]: newOperand,
                currentScreenExpression
            };

        });

    }

    /*
     * Handles operator buttons click
     * Here we will test new operator type. If binary then we need to first
     * calculate the previous state result using previous state operator then
     * assign the new state new operator. Otherwise (unary operator), we will
     * use the new operator and execute it on the most recent entered operand
     * and keep the previous state operator intact.
     * */
    handleOperationClick(operatorName) {

        this.setState((prevState) => {

            // We will apply the new operator only if at least user has
            // entered a value for first operand
            if (prevState.firstNumber !== null) {

                let newState = {
                    firstNumber: prevState.firstNumber,
                    operator: isOperatorBinary(operatorName) ? prevState.operator : operatorName,
                    secondNumber: prevState.secondNumber
                };

                // Here, if firstNumber has a decimal point at the end without any
                // decimal fraction digits then we will remove it.
                if (String(prevState.firstNumber).includes(DECIMAL_PERIOD)) {
                    newState.firstNumber = parseFloat(prevState.firstNumber);
                }

                let functionObject = executeUnderlyingFunction('Evaluate', newState);

                newState = functionObject.newState;

                newState.operator = isOperatorBinary(operatorName) ? operatorName : prevState.operator;

                newState.currentScreenExpression = formatScreenExpression(
                    prevState.currentScreenExpression,
                    OPERATIONS[newState.operator],
                    this.state.hasError
                );


                return newState;

            }

            return prevState;

        });

    }

    /*
    * Handles function button click
    * */
    handleFunctionClick(functionName) {

        let functionObject = executeUnderlyingFunction(functionName, getMathState(this.state));

        let newState = functionObject.newState;

        // For evaluate function we will append the expression and its
        // calculated result to history of the calculator. We will only
        // add to history if the calculated state from the Evaluate
        // function is different from current state.
        if (functionName === 'Evaluate' && !areEqual(getMathState(this.state), newState)) {

            newState.history = this.state.history;

            let historyObject = {
                'expr': this.state.currentScreenExpression,
                'result': newState.firstNumber
            };

            newState.history.unshift(historyObject);

            newState.currentScreenExpression = formatScreenExpression(
                '',
                newState.firstNumber,
                this.state.hasError
            );

        }

        this.setState(newState);

    }

    /*
    * Flip the show history state member to display calculator history
    * or calculator buttons in the calculator body
    * */
    handleHistoryClick() {
        this.setState((prevState) => {
            return {showHistory: !prevState.showHistory};
        });
    }

    /*
    * Clears the calculator history
    * */
    handleHistoryClear() {
        this.setState({history: []});
    }

    /*
    * Render the component UI look
    * */
    render() {

        const screenResult = getCalculatorRecentOperandValue(this.state);

        let calculatorBody = null;
        let historySection = null;

        if (this.state.showHistory) {

            calculatorBody = (
                <History history={this.state.history} onHistoryClear={this.handleHistoryClear}/>
            );

            historySection = (
                <button onClick={this.handleHistoryClear}>
                    <HistoryTrash width={'24px'} height={'24px'}/>
                </button>
            );

        } else {

            let calculatorButtons = [];
            let buttonOptions = {};
            for (const layoutRow of BUTTONS_TEMPLATE) {
                for (const buttonKey of layoutRow) {

                    buttonOptions = {};
                    switch (buttonType(buttonKey)) {
                        case 'number':

                            const number = NUMBERS[buttonKey];

                            buttonOptions = {
                                key: buttonKey,
                                buttonValue: number,
                                buttonTitle: number,
                                onClickHandler: this.handleNumberClick,
                                classes: ['bg-gray-100', 'text-gray-600', 'border-gray-300', 'font-bold']
                            };

                            break;
                        case 'operation':

                            const operation = OPERATIONS[buttonKey];

                            buttonOptions = {
                                key: buttonKey,
                                buttonValue: buttonKey,
                                buttonTitle: operation,
                                onClickHandler: this.handleOperationClick
                            };

                            break;
                        case 'function':

                            const funcButton = FUNCTIONS[buttonKey];

                            buttonOptions = {
                                key: buttonKey,
                                onClickHandler: this.handleFunctionClick,
                                buttonValue: buttonKey,
                                buttonTitle: funcButton
                            };

                            break;
                        default:

                            buttonOptions = {
                                key: Math.random(),
                                classes: ['bg-white']
                            };

                            break;
                    }

                    calculatorButtons.push(
                        withButton(buttonOptions)(BaseButton)
                    );

                }
            }

            calculatorBody = calculatorButtons;

        }


        return (
            <ErrorBoundary>
                <section className={'w-1/4 h-auto border-4 border-gray-400'}>
                    <section className={'flex justify-between p-1'}>
                        <button onClick={this.handleHistoryClick}>
                            <HistoryIcon width={'24px'} height={'24px'}/>
                        </button>
                        {historySection}
                    </section>
                    <CalculatorScreen
                        screenExpression={this.state.currentScreenExpression}
                        screenResult={screenResult}
                    />

                    <section className={'h-72'}>
                        {calculatorBody}
                    </section>

                </section>
            </ErrorBoundary>
        );
    }
}

export default Calculator;