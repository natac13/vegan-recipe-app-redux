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