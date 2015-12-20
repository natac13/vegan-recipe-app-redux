import R from 'ramda';

/**
 * Function :: String a -> String b
 *
 * Takes in a string in pointfree and will return a snakecased version
 * @return string
 */
export const snakeCase = R.compose(R.join('_'), R.split(/\s+/), R.toLower, R.trim);