import {binaryOperators, unaryOperators} from "../mathHelpers";
import {OPERATIONS} from './../constants';
import {getMostRecentOperand, isOperatorBinary, isOperatorUnary, isStateFull} from "../helpers";

/*
* A calculator function class that handles evaluation function.
* The class evaluate the calculator expression and reset the state.
*
* */
export default class EvaluateFunction {

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

        // If operator is null or not with in defined operators then we will return
        // and do nothing!
        const operator = this.newState.operator;
        if ((operator === null) || (OPERATIONS[operator] === undefined)) {
            return;
        }

        const mathHelperName = `${this.newState.operator}Operator`;

        let result = null;

        if (isStateFull(this.newState) && isOperatorBinary(this.newState.operator)) {

            result = binaryOperators[mathHelperName](
                parseFloat(this.newState.firstNumber),
                parseFloat(this.newState.secondNumber)
            );

            this.newState.firstNumber = parseFloat(result);
            this.newState.operator = null;
            this.newState.secondNumber = null;


        } else if (isOperatorUnary(this.newState.operator)) {
            // Here we will execute the unary operator on the most recent
            // entered operand and assign calculated value to that recent
            // operand
            const mostRecentOperand = getMostRecentOperand(this.newState);

            result = unaryOperators[mathHelperName](
                parseFloat(this.newState[mostRecentOperand])
            );

            result = Number.isFinite(result) ? parseFloat(result) : result;
            this.newState[mostRecentOperand] = result;

        }

    }

}