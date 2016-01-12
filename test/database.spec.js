import { Map, List, fromJS } from 'immutable'
import { expect }            from 'chai';
import R                     from 'ramda';
import {
    convertFirebaseData,
    properRecipeFormat
} from '../app/js/format';

/*=====================================================
=            Firebase tools and connection            =
=====================================================*/

import Firebase from 'firebase';
import Fireproof from 'fireproof';
const fireRef = new Firebase('https://vegan-recipes.firebaseio.com/');
const fp = new Fireproof(fireRef);
const list = fp.child('recipeList');


/*=====  End of Firebase tools and connection  ======*/

describe('Getting the recipeList from Firebase', () => {
    it('should get data from Firebase', (done) => {
        list.then((snap) => {
            let recipeList;
            recipeList = snap.val();
            expect(recipeList).to.be.ok;
            expect(recipeList).to.be.instanceof(Object);
            done();
        });
    });

    it('should take the data in Firebase format and convert the directions and ingredients on the recipe object to their array forms', () => {
        // Mock recipeList from firebase
        const firebaseDate = {
            avocado_salad_dressing: {
                created_date: 'September 2015',
                directions: 'Add all ingredients to blender; Blend',
                ingredients: 'avocado: 2; lemon juice: 1.5 tablespoon; Maple syrup: 1 tablespoon ',
                name: 'Avocado Salad Dressing'
            },
            pasta_and_veggies: {
                created_date: 'Sept 2015',
                directions: 'Saute red pepper, celery and onion in water first; turn on high',
                ingredients: 'Red Pepper: 2; Celery: 2; Onion: 2; basil: 1 tablspoon',
                name: 'Pasta & Veggies'
            }
        }

        const convertedData = convertFirebaseData(firebaseDate);
        expect(convertedData.getIn(['pasta_and_veggies', 'directions'])).to.be.instanceof(List);
        expect(convertedData.getIn(['pasta_and_veggies', 'ingredients'])).to.be.instanceof(List);
        expect(convertedData).to.be.instanceof(Map);
    });
});

describe('properRecipeFormat function; Converting the recipe object with string direction and ingredients to the array forms', () => {
    it('should take in a recipe with string direction and return an array version.', () => {
        const recipe = {
                created_date: 'Sept 2015',
                directions: 'Saute red pepper, celery and onion in water first; turn on high',
                ingredients: 'Red Pepper: 2; Celery: 2; Onion: 2; basil: 1 tablspoon',
                name: 'Pasta & Veggies'
            };
        const convertedRecipe = properRecipeFormat(recipe);
        expect(convertedRecipe.created_date).to.equal(recipe.created_date);
        expect(convertedRecipe.directions).to.be.instanceof(List);
    });

    it('should take in an recipe with string ingredients and return the recipe with an array of the ingredient object', () => {
        const recipe = {
                created_date: 'Sept 2015',
                directions: 'Saute red pepper, celery and onion in water first; turn on high',
                ingredients: 'Red Pepper: 2; Celery: 2; Onion: 2; basil: 1 tablspoon',
                name: 'Pasta & Veggies',
                id: 'azb-4587@#!'
            };
        const convertedRecipe = properRecipeFormat(recipe);
        expect(convertedRecipe.id).to.equal(recipe.id);
        expect(convertedRecipe.ingredients).to.be.instanceof(List);
        expect(R.keys(convertedRecipe).length).to.equal(R.keys(recipe).length)
    });

    it('should be able to take a recipe that is missing directions and return a recipe object with the directions set to empty array', () => {
        const recipe = {
                created_date: 'Sept 2015',
                ingredients: 'Red Pepper: 2; Celery: 2; Onion: 2; basil: 1 tablspoon',
                name: 'Pasta & Veggies'
            };
        const convertedRecipe = properRecipeFormat(recipe);
        expect(convertedRecipe.directions).to.be.an('array');
        expect(convertedRecipe.directions).to.be.empty;
    });

    it('should be able to take a recipe that is missing ingredients and return a recipe object with the ingredients set to empty array', () => {
        const recipe = {
                created_date: 'Sept 2015',
                directions: 'Saute red pepper, celery and onion in water first; turn on high',
                name: 'Pasta & Veggies'
            };
        const convertedRecipe = properRecipeFormat(recipe);
        expect(convertedRecipe.ingredients).to.be.an('array');
        expect(convertedRecipe.ingredients).to.be.empty;
    });

    it('should be able to take a recipe that is missing name and return FALSE since the name is used as the property of the recipeList Object', () => {
        const recipe = {
                created_date: 'Sept 2015',
                ingredients: 'Red Pepper: 2; Celery: 2; Onion: 2; basil: 1 tablspoon',
                directions: 'Saute red pepper, celery and onion in water first; turn on high'
            };
        const convertedRecipe = properRecipeFormat(recipe);
        expect(convertedRecipe).to.be.false;
    });
});




// import { List, Map, fromJS } from 'immutable';
// import { expect }    from 'chai';

// import {
//     fetchFromMongo,
//     mongoDataToImmutableMap } from '../app/js/database';

// describe('Interacting With MongoDB', () => {
//     describe('Fetching', () => {
//         it('should fetch data from mongo', (done) => {
//             const p1 = fetchFromMongo();
//             let x = p1.then(docs => {
//                 expect(docs).to.be.instanceof(Array);
//                 done();
//             });


//         });
//     });

//     describe('Convert data to immutable', () => {
//         it('should take in the array of documents and convert to the recipeList Map', (done) => {
//             const p1 = fetchFromMongo();
//             let x = p1.then(docs => {
//                 const recipeList = mongoDataToImmutableMap(docs);
//                 expect(Map.isMap(recipeList)).to.be.true;
//                 expect(recipeList.size).to.equal(2);
//                 done();
//             });
//         });
//     });
// });