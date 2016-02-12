import { Map, List, fromJS } from 'immutable';
import { expect } from 'chai';

import moment from 'moment';
import uuid from 'node-uuid';

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

        store.dispatch(actions.recipeAdd(recipe));
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

        store.dispatch(actions.recipeAdd(recipe1));
        store.dispatch(actions.recipeAdd(recipe2));
        const { recipeList } = store.getState();
        expect(recipeList.size).to.equal(2);
        expect(recipeList).to.include.keys(['oatmeal_and_bananas', 'mashed_potatoes']);

    });

    it('should not add any id or created_date field unless passed it with the initial data', () => {
        const store = configureStore();
        const recipe = {
            name: 'Test ID',
            directions: ['do', 'not', 'add', 'id'],
            ingredients: [
                {item: 'created date', amount: -1},
                {item: 'id field', amount: -1}
            ]
        };
            store.dispatch(actions.recipeAdd(recipe));
            const { recipeList } = store.getState();
            expect(recipeList.get('test_id')).to.be.instanceof(Map);
            expect(recipeList.hasIn(['test_id', 'id'])).to.be.false;
            expect(recipeList.hasIn(['test_id', 'create_date'])).to.be.false;
    });

    it('should include an id and created date field when passed in with the action. Making the reducer Pure', () => {
        const store = configureStore();
        const recipe = {
            name: 'Add Id',
            directions: ['should', 'add'],
            ingredients: [{item: 'id', amount: 1}, {item: 'created_date', amount: 1}],
            id: uuid.v4(),
            created_date: moment().format('MMMM Do, YYYY'),
        }
        store.dispatch(actions.recipeAdd(recipe));
        const { recipeList } = store.getState();
        expect(recipeList.get('add_id')).to.be.ok;
        expect(recipeList.hasIn(['add_id', 'id'])).to.be.true;
        expect(recipeList.hasIn(['add_id', 'created_date'])).to.be.true;

    })
});


