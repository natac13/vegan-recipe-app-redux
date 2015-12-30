import { Map, List, fromJS } from 'immutable'
import { expect } from 'chai';

import { convertFirebaseData } from '../app/js/core';

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
                created: 'September 2015',
                directions: 'Add all ingredients to blender; Blend',
                ingredients: 'avocado: 2; lemon juice: 1.5 tablespoon; Maple syrup: 1 tablespoon ',
                name: 'Avocado Salad Dressing'
            },
            pasta_and_veggies: {
                created: 'Sept 2015',
                directions: 'Saute red pepper, celery and onion in water first; turn on high',
                ingredients: 'Red Pepper: 2; Celery: 2; Onion: 2; basil: 1 tablspoon',
                name: 'Pasta & Veggies' }
            }

        const convertedData = convertFirebaseData(firebaseDate);
        expect(convertedData.getIn(['pasta_and_veggies', 'directions'])).to.be.instanceof(List);
        expect(convertedData.getIn(['pasta_and_veggies', 'ingredients'])).to.be.instanceof(List);
        expect(convertedData).to.be.instanceof(Map);
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