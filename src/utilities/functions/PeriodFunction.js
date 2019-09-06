import {DECIMAL_PERIOD} from '../constants';

/*
* A calculator function class that handles period function.
* The class add the decimal period to an operand.
*
* */
export default class PeriodFunction {

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

        // We will add period once and when calculator cursor is on firstNumbr
        // or second number
        if ((this.newState.firstNumber !== null)
            && (this.newState.operator === null)
            && (!String(this.newState.firstNumber).includes(DECIMAL_PERIOD))) {

            this.newState.firstNumber += DECIMAL_PERIOD;


        } else if ((this.newState.secondNumber !== null)
            && (!String(this.newState.secondNumber).includes(DECIMAL_PERIOD))) {

            this.newState.secondNumber += DECIMAL_PERIOD;

        }

    }

}