import Firebase from 'firebase';
import Fireproof from 'fireproof';
const fireRef = new Firebase('https://vegan-recipes.firebaseio.com/');
const fp = new Fireproof(fireRef);
const list = fp.child('recipeList');

const firebaseMiddleware = store => next => {
    let firebaseRecipeList = {};
    list.then(snap => {
        firebaseRecipeList = snap.val();
        console.log('inside fb middleware recipeList ->');
        console.log(firebaseRecipeList);
    });


    return action => {
        /*
        When I call the buildList action from RecipeList.js the middleware will
        intercept and create the actions signature that I first had.
         */
        if (action.type === 'BUILD_LIST') {
            const x = {
                type: 'BUILD_LIST',
                recipeList: firebaseRecipeList
            };
            return next(x);
        }
        console.log('store state before');
        console.log(action);
        console.log(store.getState());
        const nextState = next(action);
        console.log('store state after');
        console.log(store.getState());
        return nextState;
    };
};

export default firebaseMiddleware;