/*========================================
=            Straight mongodb            =
========================================*/
// import { MongoClient } from 'mongodb';
// const url = 'mongodb://localhost:27017/vegan';
// import sample from './sample.json';
// let x = []

// let p = new Promise((resolve, reject) => {
//     MongoClient.connect(url, (err, db) => {
//         if (err) {
//             reject(err);
//         }
//         const cursor = db.collection('recipeList').find().toArray().then((docs) => {
//             resolve(docs)
//             db.close();
//         });


//     });
// });

// function success(res) {
//     console.log(JSON.stringify(res, null, 4));

// }

// function fail(err) {
//     console.log('there was an error');
// }

// p.then(success, fail).then(() => console.log(x))



/*=====  End of Straight mongodb  ======*/

/*========================================
=            Promised mongodb            =
========================================*/


// import pmongo from 'promised-mongo';
// const db = pmongo(url);
// db.collection('recipeList').find().toArray().then(docs => {
//     docs.forEach(doc => console.log(doc.name))
// })

/*=====  End of Promised mongodb  ======*/

import Rebase from 're-base';
let base = Rebase.createClass('https://vegan-recipes.firebaseio.com/')
console.log(base)
base.fetch('recipeList', {
        context: this,
        asArray: false,
        then(data) {
            console.log(data);

        }
    });

let p1 = new Promise(function(resolve, reject) {
    base.fetch('recipeList', {
        context: this,
        asArray: false,
        then(data) {
            console.log(data);
            resolve(data);
        }
    });
});

p1.then((list) => {console.log(list)})
