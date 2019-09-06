/*
* Define the binary math operators
* */
import {INVALID_INPUT_SCREEN} from "./constants";

export const binaryOperators = {
    /*
    * Helper function to add two numbers
    * */
    addOperator: (firstNumber, secondNumber) => {
        return firstNumber + secondNumber;
    },

    /*
    * Helper function to subtract two numbers
    * */
    subOperator: (firstNumber, secondNumber) => {
        return firstNumber - secondNumber;
    },

    /*
    * Helper function to multiply two numbers
    * */
    mulOperator: (firstNumber, secondNumber) => {
        return firstNumber * secondNumber;
    },

    /*
    * Helper function to divide two numbers
    * */
    divOperator: (firstNumber, secondNumber) => {
        return firstNumber / secondNumber;
    }
};

/*
* Define the unary math operators
* */
export const unaryOperators = {

    /*
    * Helper function to find percentage of a number
    * */
    percentageOperator: (operand) => {
        return operand / 100;
    },

    /*
    * Helper function to find square root of a number
    * */
    rootOperator: (operand) => {
        if (operand < 0) {
            return INVALID_INPUT_SCREEN;
        }
        return Math.sqrt(operand);
    },

    /*
    * Helper function to find double of a number
    * */
    doubleOperator: (operand) => {
        return Math.pow(operand, 2);
    },

    /*
    * Helper function to find inverse of a number
    * */
    flipOverOneOperator: (operand) => {
        return 1 / operand;
    }

};