import R from 'ramda';
import moment from 'moment';
import { Map, fromJS } from 'immutable';


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
        amount: amount
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


/**
 * Takes in the Immutable Map Recipe which is first converted to plain JavaScript
 * which is then run through the conversions to return a stringified recipe
 * object
 * @param  {Immutable Map} recipe
 * @return {obejct}        recipe with directions and ingredients stringified
 */
export const stringifyRecipe = (recipe) => {
  let plainRecipe = Map.isMap(recipe) ? recipe.toJS() : recipe;
  let { ingredients, directions } = plainRecipe;
  let strIngredients,
    strDirections;
  if (!!ingredients) {
    strIngredients = ingredients.reduce((prev, ingredient, index) => {
      if (index === 0) return `${ingredient.item}:${ingredient.amount}`;
      return `${prev};${ingredient.item}:${ingredient.amount}`;
    }, '');
  }

  if (!!directions) {
    strDirections = directions.reduce((prev, direction, index) => {
      if (index === 0) return direction;
      return `${prev};${direction}`;
    },  '');
  }

  return {
    ...plainRecipe,
    ingredients: strIngredients,
    directions: strDirections
  };
};

export const lineify = R.replace(/(;)/g, '$1\n');

/**
 * formatData :: Date a -> String
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export const formatDate = (date) => {
  const dateFormatted = moment(new Date(date)).format('MMMM DD, YYYY');
  return dateFormatted;
};

export const handlePreview = (fields) => {
  const { name, created_date, directions, ingredients } = fields;
  const defaultDate = moment().format('MMMM DD, YYYY');
  const finalDate = created_date.value || defaultDate;
  return {
    name: format('name')(!name.value ? '' : name.value),
    created_date: formatDate(finalDate),
    directions: format('directions')
                        (!directions.value ? '' : directions.value),
    ingredients: format('ingredients')
                        (!ingredients.value ? '' : ingredients.value)
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


/*===================================================
=            Database Related Functions             =
===================================================*/

/**
 * Will take in the recipeList from Firebase and convert to the recipeList to
 * save in the redux store.
 * From Firebase the recipe object's directions and ingredients are strings.
 * Therefore this function will convert them to an array of string directions
 * and an array of ingredient object
 * @param  {object} recipeList  From Firebase
 * @return {Immutable Map} spread out the recipe first then override the name,
 * directions and ingredient properties with proper format after format function
 */
export const convertFirebaseData = R.compose(fromJS,
                                            R.map(properRecipeFormat));

/**
 * Takes in a recipe object which is either from Firebase or the input user data
 * Therefore the directions and ingredients are just in string form
 * Spread out all properties, override the name, directions and ingredients after
 * running through the formatter
 * @param  {object} recipe an object built with user input data or received from
 * Firebase
 * @return {object}        same recipe as input but the directions, and
 * ingredients are in the proper array form
 */
export function properRecipeFormat({ ...recipe, name, directions, ingredients }) {
    if (!!name) {
        name        = format('name')(name);
        directions  = !!directions ? format('directions')(directions)   : [];
        ingredients = !!ingredients ? format('ingredients')(ingredients) : [];

        return {
            ...recipe,
            name,
            directions,
            ingredients
        };
    }

    return false;

}

/*=====  End of Database Related Functions  ======*/