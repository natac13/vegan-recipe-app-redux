import R from 'ramda';
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