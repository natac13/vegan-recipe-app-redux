import R from 'ramda';
import moment from 'moment';
/**
 * dropEmail :: String a -> String b
 * Takes in a String and will drop anything from a @ onward.
 * @type {[type]}
 */
export const dropEmail = R.compose(
  R.join(''),
  R.slice(0, -1),
  R.split('@')
);

/**
 * \b word boundary
 * \d{3} 3 digits
 * \s? optional space
 * [f|c] f or c
 * \b word boundary
 * ig - ignorecase and global
 * @type {RegExp}
 */
const re = /\b\d{3}\s?[f|c]\b/ig;

/**
 * normalizeTemperature :: string -> string
 * Will take in a string of just 3 digits and a letter character, either F or C.
 * There can be an optional space between the number and the letter.
 *
 * The letter is capitalized and the optional space is preserved
 *
 * @param {string} match Either length 4 or 5 - 3 digits, 1 letter, 1 optional
 * space
 *
 * @return {[type]}       [description]
 */
export function normalizeTemperature(match) {
  return `${match.slice(0, 3)}\u00B0${(match.length === 4 ?
                                      match.slice(3) :
                                      match.slice(4)).toUpperCase()}`;
}

/**
 * replace :: regex -> (string -> string) -> string -> string
 * The second parameter to str.replace() can be a replacer function. The matched
 * value is passed in as the argument and the return value of the function is
 * used as the replacement string.
 *
 * @type {Function}
 *
 * @param {String}  The string which is to be searched
 *
 * @return{String}
 */
const replace = R.curry((regex, func, string) => {
  return string.replace(regex, func);
});


/**
 * tempFixer :: String -> String
 * @type {Function}
 *
 * @param {String} A string that the user typed into an input. This is the
 * replace function primed with the regex to search for 3 digital number
 * followed by a letter, separated by an optional single space.
 *
 * @return {String} Same string as before, however the temperature value is
 * modified to include the degree symbol and a capital F or C
 */
export const tempFixer = replace(re, normalizeTemperature);

/**
 * formatData :: Date a -> String
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export const formatDate = (date) => {
  const dateFormatted = moment(new Date(date)).format('MMMM DD, YYYY');
  return dateFormatted;
};

