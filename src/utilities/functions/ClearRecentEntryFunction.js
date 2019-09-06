/*
* A calculator function class that handles the clear recent
* entry function. The class resets the calculator most recent
* entered input operand.
*
* */
export default class ClearRecentEntryFunction {

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

        if (this.newState.secondNumber !== null) {

            this.newState.secondNumber = null;
            return;

        }

        if ((this.newState.firstNumber !== null) && (this.newState.operator === null)) {

            this.newState.firstNumber = null;

        }

    };

}