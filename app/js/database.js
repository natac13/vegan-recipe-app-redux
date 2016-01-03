// import { fromJS, Map } from 'immutable';
// import { snakeCase } from './core_helpers';

// import pmongo from 'promised-mongo';
// const url = 'mongodb://localhost:27017/vegan';

// const db = pmongo(url);
// const recipeList = db.collection('recipeList');
/**
 * returns a promise from toArray(). The success function gets passed a list
 * of documents
 * @return {promise}
 */
// export function fetchFromMongo() {
//     return recipeList.find().toArray()

// }

// export function mongoDataToImmutableMap(recipeList) {
//     const obj = recipeList.reduce(function(state, doc) {
//         return state.set(snakeCase(doc.name), fromJS(doc))
//     }, Map())

//     return obj;
// }