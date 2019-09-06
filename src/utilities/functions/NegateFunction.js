/*
* A calculator function class that handles negate function.
* The class negate an operand.
*
* */
export default class NegateFunction {

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

        if (this.newState.operator === null) {

            this.newState.firstNumber *= -1;
            return;

        }

        this.newState.secondNumber *= -1;

    }

}