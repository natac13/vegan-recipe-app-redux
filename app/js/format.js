import R from 'ramda';
import { List, fromJS } from 'immutable';
/**
 * capitalize :: String a -> a
 * takes in a string and will return a new string with the first letter upperCased
 * @param  {string} string a string to capitalize
 * @return {string}
 */
export const capitalize = (string) => {
    return R.toUpper(string.slice(0,1)) + R.toLower(string.slice(1));
};

const replace = R.curry((regex, func, string) => {
    return string.replace(regex, func);
});

/**
 * \b word boundary
 * \d{3} 3 digits
 * \s? optional space
 * [f|c] an f or a c
 * \b word boundary
 * ig - ignorecase and global
 * @type {RegExp}
 */
const re = /\b\d{3}\s?[f|c]\b/ig;


export function normalizeTemperature(match) {
    return `${match.slice(0, 3)}\u00B0${(match.length === 4 ?
                                        match.slice(3) :
                                        match.slice(4)).toUpperCase()}`;
}

export const tempFixer = replace(re, normalizeTemperature);
/**
 * presentation :: String a -> String a
 * @type {function}
 * @param {String}
 * @return Same string but trimmed capitalized and any temperature normalized.
 */
export const presentation = R.compose(tempFixer, capitalize, R.trim);


/**
 * itemify :: [String a] -> [Object b]
 * @param  {[type]} options.item   [description]
 * @param  {[type]} options.amount [description]
 * @return {[type]}                [description]
 */
export const convertToItemObject = ( [ item, amount ] ) => {
    return {
        item: presentation(item),
        amount: amount
    };
};

/**
 * Will check if the item coerces to a boolean true
 * @param  {string} item
 * @return {boolean}
 */
const emptyString = (item) => {
    return !!R.trim(item);
};

const itemify = R.compose(convertToItemObject, R.filter(emptyString), R.split(':'));

const trace = R.curry((tag, x) => {
    console.log(tag, x);
    return x;
});
/**
 * format :: String a -> Function b
 * @param  {string} property a string which is used to determine which function
 * formatter to return
 * @return {function}          A function that takes in a value string from the
 * user and will convert the plain string to an array of directions or
 * ingredient objects so that they can be added to the recipe object later
 */
const format = (property) => {
    if (property === 'directions') {
        // return a function :: a -> [a]
        return R.compose(fromJS, R.map(presentation), R.filter(emptyString), R.split(';'));
    }
    if (property === 'ingredients') {
        // function :: String a -> [Object b]
        return R.compose(fromJS, R.map(itemify), R.filter(emptyString), R.split(';'));
    }
    // was the name property so just pass through
    if (property === 'name') {
        return R.compose(presentation, R.trim);
    }
    return false;
};

export default format;

/**
 * Takes in the Immutable List forms of ingredients and directions to return
 * an object that has string versions on them respectively
 * @param  {Immutable List} ingredients
 * @param  {Immutable List} directions
 * @return {object}             ingredients, directions properties
 */
export const stringifyRecipeArrays = (ingredients, directions) => {
    let strIngredients,
        strDirections;
    if (!!ingredients) {
        strIngredients = ingredients.reduce((prev, ingredient, index) => {
            if (index === 0) return `${ingredient.get('item')}:${ingredient.get('amount')}`;
            return `${prev};${ingredient.get('item')}:${ingredient.get('amount')}`;
        }, '');
    }

    if (!!directions) {
        strDirections = directions.reduce((prev, direction, index) => {
            if (index === 0) return direction;
            return `${prev};${direction}`;
        },  '');
    }

    return {
        ingredients: strIngredients,
        directions: strDirections
    };
};