import R from 'ramda';
import { List, fromJS } from 'immutable';
/**
 * capitalize :: String a -> a
 * takes in a word and will return a new word with the first letter upperCased
 * @param  {string} word a word to capitalize
 * @return {string}
 */
export const capitalize = (word) => {
    return R.toUpper(word.slice(0,1)) + R.toLower(word.slice(1));
}

const presentation = R.compose(capitalize, R.trim)
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
    }
}


/**
 * Will check if the item coerces to a boolean true
 * @param  {string} item
 * @return {boolean}
 */
const emptyString = (item) => {
    return !!R.trim(item);
}

const itemify = R.compose(convertToItemObject, R.filter(emptyString), R.split(':'));

const trace = R.curry((tag, x) => {
    console.log(tag, x);
    return x;
})
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
        return R.compose(fromJS, R.map(itemify), R.filter(emptyString), R.split(';'))
    }
    // was the name property so just pass through
    if (property === 'name') {
        return R.trim;
    }
    return false;
}

export default format;