import R from 'ramda';
import {
    getter
} from './immunurry';

/**
 * Function :: String a -> String b
 *
 * Takes in a string in pointfree and will return a snakecased version
 * @return {string}
 */
export const snakeCase = R.compose(R.join('_'), R.split(/\s+/), R.toLower, R.trim);

/**
 * snakedCase :: Immutable Map a -> String b
 * @return {string} name property of the Map in snakedCased
 */
export const snakedNameOf = R.compose(snakeCase, getter('name'));

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
export function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}