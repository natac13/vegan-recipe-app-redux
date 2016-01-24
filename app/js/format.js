import R from 'ramda';
import { List, Map, fromJS } from 'immutable';
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
 * [f|c] f or c
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
    if (property === 'imageURL') {
        return R.trim;
    }
    return false;
};

export default format;

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
export function properRecipeFormat({...recipe, name, directions, ingredients}) {
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