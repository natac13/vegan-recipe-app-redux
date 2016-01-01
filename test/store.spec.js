import { Map, List, fromJS } from 'immutable';
import { expect } from 'chai';

/*** actions ***/
import * as actions from '../app/actions/';

/*** store ***/
import configureStore from '../app/store/configureStore';

describe('The Redux Store', () => {

    it('should return a Map as the initial state', () => {
        const store = configureStore();
        expect(store.getState()).to.include({
            recipeList: Map()
        });
        const { recipeList } = store.getState();
        expect(recipeList.size).to.equal(0);
    });

    it('should handle dispatching to add a recipe to the list on the state tree', () => {
        const store = configureStore();
        const recipe = Map({
            name: 'Oatmeal and Bananas',
            directions: List(),
            ingredients: List()
        });

        store.dispatch(actions.addRecipe(recipe));
        const { recipeList } = store.getState();
        expect(recipeList.size).to.equal(1);
        expect(recipeList).to.include.key('oatmeal_and_bananas');

    });

    it('should handle dispatching to add more than one recipe to the list', () => {
        const store = configureStore();
        const recipe1 = Map({
            name: 'Oatmeal and Bananas',
            directions: List(),
            ingredients: List()
        });
        const recipe2 = Map({
            name: 'Mashed Potatoes',
            directions: List(),
            ingredients: List()
        })

        store.dispatch(actions.addRecipe(recipe1));
        store.dispatch(actions.addRecipe(recipe2));
        const { recipeList } = store.getState();
        expect(recipeList.size).to.equal(2);
        expect(recipeList).to.include.keys(['oatmeal_and_bananas', 'mashed_potatoes']);

    });


});