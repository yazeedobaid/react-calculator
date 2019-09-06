/*
* A calculator function class that handles delete recent
*  function. The class deletes the most recent entered number, operator or period
* from the calculator screen output and state.
*
* */
import {DECIMAL_PERIOD} from "../constants";

export default class DeleteRecentFunction {

    newState = {
        firstNumber: null,
        secondNumber: null,
        operator: null
    };

    /*
    * Class constructor
    *
    * */
    constructor(state) {
        this.newState = state;
    }

    /*
    * Executing the function
    *
    * */
    execute() {

        let secondNumber = this.newState.secondNumber;
        let firstNumber = this.newState.firstNumber;

        if (secondNumber !== null) {

            secondNumber = String(secondNumber).slice(0, -1);

            this.newState.secondNumber = this.parseOperandAfterDeletingRecent(secondNumber);

        } else if (this.newState.operator !== null) {

            this.newState.operator = null;

        } else if (firstNumber !== null) {

            firstNumber = String(firstNumber).slice(0, -1);

            this.newState.firstNumber = this.parseOperandAfterDeletingRecent(firstNumber);

        }


    };


    /*
    * Here we will format the operand by its value to not output un-expected
    * results for user.
    *
    * */
    parseOperandAfterDeletingRecent = operand => {

        if (operand === '') {
            return null;
        }

        if (operand.includes(DECIMAL_PERIOD)) {
            return operand;
        }

        return parseFloat(operand);

    };

}