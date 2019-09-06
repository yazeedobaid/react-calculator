import {EMPTY_SCREEN, ERROR_SCREEN, FUNCTIONS, NUMBERS, OPERATIONS} from "./constants";
import functionClassFactory from "./functionClassFactory";
import {binaryOperators, unaryOperators} from "./mathHelpers";

/*
* Determine button type!
*
* */
export function buttonType(buttonKey) {

    if (OPERATIONS.hasOwnProperty(buttonKey)) {
        return 'operation';
    }

    if (FUNCTIONS.hasOwnProperty(buttonKey)) {
        return 'function';
    }

    if (NUMBERS.hasOwnProperty(buttonKey)) {
        return 'number';
    }

    return 'empty';

}

/*
* Execute function button class and get answer back to caller
*
* */
export function executeUnderlyingFunction(functionName, state) {

    let functionClass = `${functionName}Function`;

    let functionObject = functionClassFactory(functionClass, state);

    functionObject.execute();

    return functionObject;

}

/*
* Check if we have a full state. A full state is when the calculator state
* properties are all filled by user with a value!
*
* */
export function isStateFull(state) {
    return state.firstNumber !== null && state.operator !== null && state.secondNumber !== null;
}

/*
* Check if we have an empty state. An empty state is when the calculator state
* properties are all nulled!
*
* */
export function isStateEmpty(state) {
    return state.firstNumber === null && state.operator === null && state.secondNumber === null;
}

/*
* Checks if given operator is a binary operator
*
* */
export function isOperatorBinary(operatorName) {
    return binaryOperators.hasOwnProperty(`${operatorName}Operator`);
}

/*
* Checks if given operator is a unary operator
*
* */
export function isOperatorUnary(operatorName) {
    return unaryOperators.hasOwnProperty(`${operatorName}Operator`);
}

/*
* Format the screen expression output by constructing an
* algebraic equation.
* */
export function formatScreenExpression(currentScreenExpression, expressionPart, hasError) {

    let screenOutput = currentScreenExpression;

    if (hasError) {

        screenOutput = ERROR_SCREEN;

    } /*else if (isStateEmpty(state)) {
        // If state is empty or operator is null then user has
        // either entered the first operand only or it evaluates
        // an expression. In both cases expression is empty.

        screenOutput = '';

    } else if (state.secondNumber !== null) {

        screenOutput += ` ${state.secondNumber}`;

    } else if (state.operator !== null) {

        screenOutput += ` ${OPERATIONS[state.operator]}`;

    } else if (state.firstNumber !== null) {

        screenOutput += ` ${state.firstNumber}`;

    }*/

    screenOutput += ` ${expressionPart}`;

    screenOutput = screenOutput.replace('null', '')
                               .replace('undefined', '')
                               .trim();


    return screenOutput;

}

/*
* Get the most entered operand value by user
* */
export function getCalculatorRecentOperandValue(state) {
    let operandValue = state[getMostRecentOperand(state)];
    return operandValue === null ? EMPTY_SCREEN : operandValue;
}

/*
* Get the most recent entered operand name by user
* */
export function getMostRecentOperand(state) {
    return (state.secondNumber === null) ? 'firstNumber' : 'secondNumber';
}

/*
* get the Math state of the calculator. The Math state is used
* in calculator calculations
* */
export function getMathState(state) {

    return {
        firstNumber: state.firstNumber,
        operator: state.operator,
        secondNumber: state.secondNumber
    }

}

/*
* Helper that checks if two objects are the same by comparing
* their respective properties
* */
export function areEqual(firstObject, secondObject) {

    const firstPropsNames = Object.getOwnPropertyNames(firstObject);
    const secondPropsNames = Object.getOwnPropertyNames(secondObject);

    if (firstPropsNames.length !== secondPropsNames.length) {
        return false;
    }

    for (const propName of firstPropsNames) {
        if (firstObject[propName] !== secondObject[propName]) {
            return false;
        }
    }

    return true;

}