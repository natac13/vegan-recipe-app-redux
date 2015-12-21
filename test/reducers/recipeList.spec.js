import { List, Map, fromJS } from 'immutable';
import { expect }    from 'chai';
import R from 'ramda';

import * as types from '../../app/constants/recipeTypes';
import * as actions from '../../app/actions/creators';
import reducer from '../../app/reducers/recipeList';

describe('The Recipe List Reducer', () => {
/*======================================
=            Adding Recipes            =
======================================*/
    describe('Should handle ADD_RECIPE', () => {
        it('should have an initial state built in', () => {
            const action = actions.addRecipe(Map({name: 'Oatmeal Banana'}));
            const nextState = reducer(undefined, action);
            expect(nextState.size).to.equal(1);
            expect(nextState).to.include.key(Map({
                oatmeal_banana: Map({name: 'Oatmeal Banana'})
            }));
        });

        it('should handle the ADD_RECIPE action by adding the recipe to the recipeList Map', () => {
            const state = Map({
                mashed_potatoes: Map({name: 'Mashed Potatoes'})
            });
            const action = actions.addRecipe(Map({name: 'Oatmeal Banana'}));
            const nextState = reducer(state, action);
            expect(nextState.size).to.equal(2);
            expect(nextState).to.include.keys(['oatmeal_banana', 'mashed_potatoes']);
        });

        it('should handle a series of ADD_RECIPE actions by being used as the callback function of reduce', () => {
            const state = Map();
            const stateActions = [
                actions.addRecipe(Map({name: 'Oatmeal Banana'})),
                actions.addRecipe(Map({name: 'Mashed Potatoes'})),
                actions.addRecipe(Map({name: 'Lunch Salad'})),
                actions.addRecipe(Map({name: 'Bean Burrito'})),

            ];
            const jumpToState = R.reduce(reducer, state);
            const finalState = jumpToState(stateActions);
            expect(finalState.size).to.equal(4);
        });
    });
/*=====  End of Adding Recipes  ======*/

/*========================================
=            Deleting recipes            =
========================================*/
    describe('Deleting recipes from the list', () => {
        it('should delete a recipe that is on the list to start', () => {
            const state = Map({
                mashed_potatoes: Map({name: 'Mashed Potatoes'}),
                oatmeal_banana: Map({name: 'Oatmeal Banana'})
            });
            const action = {
                type: types.DELETE_RECIPE,
                recipeName: 'Mashed Potatoes'
            };
            const nextState = reducer(state, action);
            expect(nextState.size).to.equal(1);
            expect(nextState).to.include.key('oatmeal_banana');
        });

        it('should not delete a recipe that was not already on the list; therefore returning the same state back', () => {
            const state = Map({
                mashed_potatoes: Map({name: 'Mashed Potatoes'}),
                oatmeal_banana: Map({name: 'Oatmeal Banana'})
            });
            const action = {
                type: types.DELETE_RECIPE,
                recipeName: 'Lunch Salad'
            };
            const nextState = reducer(state, action);
            expect(nextState.size).to.equal(2);
            expect(nextState).to.include.keys(['mashed_potatoes', 'oatmeal_banana'])
        })
    });
/*=====  End of Deleting recipes  ======*/

/*==============================================
=            Updating a Recipe Name            =
==============================================*/

    describe('The Updating the recipe', () => {
        it('should handle UPDATE_RECIPE_NAME', () => {
            const state = Map({
                mashed_potatoes: Map({name: 'Mashed Potatoes'}),
                oatmeal_and_bananas: Map({name: 'Oatmeal and Bananas'})
            });
            const action = {
                type: types.UPDATE_RECIPE_NAME,
                oldName: 'Oatmeal and Bananas',
                newName: 'Oatmeal Banana'
            };
            const nextState = reducer(state, action);
            expect(nextState.size).to.equal(2);
            expect(nextState).to.include.key('oatmeal_banana');
        });

        it('should handle UPDATE_RECIPE_DIRECTIONS', () => {
            const state = Map({
                mashed_potatoes: Map({
                    name: 'Mashed Potatoes',
                    directions: List.of('peel', 'boil'),
                    ingredients: List()
                })
            });
            const recipeName = 'Mashed Potatoes';
            const directions = ['Peel', 'Cut up', 'Boil in water'];
            const action = actions.updateRecipeDirections(recipeName, directions);
            const nextState = reducer(state, action);

            expect(nextState.size).to.equal(1);
            const stateDirections = nextState.getIn(['mashed_potatoes', 'directions']);
            expect(stateDirections.size).to.equal(3);
            expect(stateDirections).to.include('Cut up');
        });

        it('should handle UPDATE_RECIPE_INGREDIENTS', () => {
            const state = Map({
                mashed_potatoes: Map({
                    name: 'Mashed Potatoes',
                    directions: List(),
                    ingredients: List.of(
                        Map({item: 'potatoes', amount: 2}),
                        Map({item: 'water', amount: '2 bottles'})
                    )
                })
            });
            const recipeName = 'Mashed Potatoes';
            const ingredients = List.of(
                Map({item: 'potatoes', amount: 4}),
                Map({item: 'water', amount: 3})
            );
            const action = actions.updateIngredients(recipeName, ingredients);
            const nextState = reducer(state, action);
            expect(nextState.size).to.equal(1);
            expect(nextState.getIn(['mashed_potatoes', 'ingredients'])).to.equal(ingredients)
        })
    });


/*=====  End of Updating a Recipe Name  ======*/


});