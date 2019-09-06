import ClearFunction from './functions/ClearFunction';
import EvaluateFunction from './functions/EvaluateFunction';
import PeriodFunction from './functions/PeriodFunction';
import NegateFunction from './functions/NegateFunction';
import DeleteRecentFunction from './functions/DeleteRecentFunction';
import ClearRecentEntryFunction from './functions/ClearRecentEntryFunction';

/*
* Define the calculator function classes
*
* */
const classes = {
    ClearFunction,
    ClearRecentEntryFunction,
    EvaluateFunction,
    PeriodFunction,
    NegateFunction,
    DeleteRecentFunction
};

/*
* Factory method that return a new instance of a requested
* function factory class for the calculator.
*
* */
export default function functionClassFactory(functionClass, ...args) {
    return (new (classes[functionClass])(...args));
}
