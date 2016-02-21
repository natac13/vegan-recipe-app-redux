import R from 'ramda';
import moment from 'moment';
import { Map, fromJS } from 'immutable';

import {
  tempFixer,
  formatDate
} from './formatting/helpers';

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
  if (property === 'imageURL') {
    return R.trim;
  }
  return false;
};

export default format;


/**
 * capitalize :: String a -> a
 * Takes in a string and will return a new string with the first letter
 * upperCased
 *
 * @param {string} string A string to capitalize
 *
 * @return {string}
 */
export const capitalize = (string) => {
  return R.toUpper(string.slice(0,1)) + R.toLower(string.slice(1));
};

/**
 * presentation :: String a -> String a
 * @type {function}
 *
 * @param {String} A string from user input that is to be first trimmed of white
 * space. Then run through the capitalize function. The onto an temperature
 * fixing.
 *
 * @return Same string but in final presentation form.
 */
export const presentation = R.compose(tempFixer, capitalize, R.trim);


/**
 * itemify :: Array -> Object
 *
 * Will destructure an array and return the values in a object after running the
 * item through the presentation function.
 *
 * @param  {string} item From passed in array -- Array[0]
 *
 * @param  {string} amount From passed in array -- Array[1]
 *
 * @return {object} basically a conversion from an array to object
 */
export const convertToItemObject = ( [ item, amount ] ) => {
  return {
    item: presentation(item),
    amount
  };
};

/**
 * emptyString :: string -> boolean
 * Will check if the item coerces to a boolean true
 *
 * First run trim on the string then use double ! to coerce to boolean.
 *
 * @param  {string} item
 *
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


export const lineify = R.replace(/(;)/g, '$1\n');


export const handlePreview = (fields) => {
  const { name, created_date, directions, ingredients } = fields;
  const defaultDate = moment().format('MMMM DD, YYYY');
  const finalDate = created_date.value || defaultDate;
  return {
    name: format('name')(name.value || ''),
    created_date: formatDate(finalDate),
    directions: format('directions')
                        (directions.value || ''),
    ingredients: format('ingredients')
                        (ingredients.value || '')
  };
};

/**
 * dropExtension :: String a -> String b
 * Takes in a string and will drop any characters after the last '.' in the
 * string, to return a new string
 * @param String
 * @return String
 */
export const dropExtension = R.compose(
  R.join('.'),
  R.slice(0, -1),
  R.split('.')
);
