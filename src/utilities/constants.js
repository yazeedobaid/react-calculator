/*
* Define calculator math operations.
* The key on each element of the object represent the
* handler name in mathHelpers module. Value
* is displayed to user as button title.
*
* */
export const OPERATIONS = {
    'add': '+',
    'sub': '-',
    'mul': '*',
    'div': '/',
    'percentage': '%',
    'root': '√',
    'double': "x^2",
    'flipOverOne': '1/x'
};

/*
* Define calculator special function/control buttons.
* The key on each element of the object represent the
* handler class name. Value is displayed to user as
* button title.
*
* */
export const FUNCTIONS = {
    'Clear': 'C',
    'ClearRecentEntry': 'CE',
    'Negate': '±',
    'Evaluate': '=',
    'Period': '.',
    'DeleteRecent': '⌫'
};

/*
* Define calculator number buttons
*
* */
export const NUMBERS = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
};

/*
* How calculator screen looks like when empty.
*
* */
export const EMPTY_SCREEN = '0';

/*
* How calculator screen looks like when something went wrong!
*
* */
export const ERROR_SCREEN = 'ERROR';

/*
* In-valid input screen
*
* */
export const INVALID_INPUT_SCREEN = 'INVALID INPUT';
/*
* Decimal period character.
*
* */
export const DECIMAL_PERIOD = '.';

/*
* Calculator buttons template.
*
* */
export const BUTTONS_TEMPLATE = [
    ['percentage', 'root', 'double', 'flipOverOne'],
    ['Clear', 'ClearRecentEntry', 'DeleteRecent', 'div'],
    ['7', '8', '9', 'mul'],
    ['4', '5', '6', 'sub'],
    ['1', '2', '3', 'add'],
    ['Negate', '0', 'Period', 'Evaluate']
];