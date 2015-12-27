import { List, Map, fromJS } from 'immutable';
import { expect }    from 'chai';
import moment from 'moment'

import {
    addRecipe,
    deleteRecipe,
    updateRecipeName,
    updateRecipeDirections,
    updateRecipeIngredients
} from '../app/js/core';

describe('Application Logic', () => {
    describe('The recipe list. The state variable in these tests.', () => {

/*** Adding a Recipe to the list ***/
        describe('Adding a recipe to the list with addRecipe() from js/core.js', () => {
            it('should take a recipe map and add to the state map; key is snaked_cased version of name', () => {
                const state = Map();
                const recipe = Map({
                    name: 'Mashed Potatoes',
                    directions: List.of('peel', 'boil'),
                    ingredients: List.of(Map({item:'Potatoes', amount: 3}))
                });
                const nextState = addRecipe(state, recipe);
                console.log(nextState);
                console.log('hello')
                expect(nextState).to.contain.keys(fromJS({
                    mashed_potatoes: {
                        name: 'Mashed Potatoes',
                        directions: ['peel', 'boil'],
                        ingredients: [{ item: 'Potatoes', amount: 3 }]
                    }
                }));
            });

            it('should take a plain JS object recipe and add to the state', () => {
                const state = Map();
                const recipe = {
                    name: 'Mashed Potatoes',
                    directions: ['peel', 'boil'],
                    ingredients: [{ item:'Potatoes', amount: 3 }]
                };
                const nextState = addRecipe(state, recipe);
                expect(nextState).to.contain.keys(fromJS({
                    mashed_potatoes: {
                        name: 'Mashed Potatoes',
                        directions: ['peel', 'boil'],
                        ingredients: [{ item: 'Potatoes', amount: 3 }]
                    }
                }));
            });

            it('should add an id field to the recipe before adding to the list', () => {
                const state = Map();
                const recipe = Map({
                    name: 'Mashed Potatoes',
                    directions: List.of('peel', 'boil'),
                    ingredients: List.of(Map({item:'Potatoes', amount: 3}))
                });
                const nextState = addRecipe(state, recipe);
                expect(nextState.get('mashed_potatoes')).to.contain.key('id');
            });

            it('should set a created date property on the recipe Map when added to the list', () => {
                const state = Map();
                const recipe = {
                    name: 'Mashed Potatoes',
                    directions: ['peel', 'boil'],
                    ingredients: [{ item:'Potatoes', amount: 3 }]
                };
                const date = moment().format('MMMM Do YYYY')
                const nextState = addRecipe(state, recipe);
                expect(nextState.get('mashed_potatoes')).to.contain.key('created_date');
                expect(nextState.getIn(['mashed_potatoes', 'created_date'])).to.equal(date);
            });

            it('should return a state immutable fromJS so there is a deep conversion', () => {
                const state = Map();
                const recipe = {
                    name: 'Mashed Potatoes',
                    directions: ['peel', 'boil'],
                    ingredients: [{ item:'Potatoes', amount: 3 }]
                };
                const nextState = addRecipe(state, recipe);
                expect(nextState).to.equal(fromJS({
                    mashed_potatoes: {
                        name: 'Mashed Potatoes',
                        directions: ['peel', 'boil'],
                        ingredients: [{ item: 'Potatoes', amount: 3 }],
                        // next two just pull out from the nextState
                        id: nextState.getIn(['mashed_potatoes', 'id']),
                        created_date: nextState.getIn(['mashed_potatoes', 'created_date'])
                    }
                }));
            });
        });

/*** Deleting a Recipe from the list ***/
        describe('Deleting a recipe from the list with deleteRecipe() from core.js', () => {
            it('should return a recipe list Map with the recipe which got deleted not present', () => {
                const state = Map({
                    mashed_potatoes: Map(),
                    oatmeal_and_bananas: Map()
                });
                const recipeName = 'mashed_potatoes';
                const nextState = deleteRecipe(state, recipeName);
                expect(nextState).to.equal(Map({
                    oatmeal_and_bananas: Map()
                }));
            });

            it('should return a recipe list Map with the recipe deleted after passing a normal formatted string ie "Mashed Potatoes"', () => {
                const state = Map({
                    mashed_potatoes: Map(),
                    oatmeal_and_bananas: Map()
                });
                const recipeName = 'Mashed Potatoes';
                const nextState = deleteRecipe(state, recipeName);
                expect(nextState).to.equal(Map({
                    oatmeal_and_bananas: Map()
                }));
            });
        });

/*** Updating the recipe ***/
        describe('Updating a recipe name property on the recipe and key value of the immutable map recipe list', () => {
            describe('Recipe Name', () => {
                it('should update the name of the recipe as well as the key on the state', () => {
                    const state = Map({
                        oatmeal_and_bananas: Map({
                            name: 'Oatmeal and Bananas',
                            directions: List.of('add oats', 'add cinnamon', 'cook'),
                            ingredients: List.of(Map({item: 'oats', amount: '4 scoops'}))
                        }),
                        mashed_potatoes: Map({
                            name: 'Mashed Potatoes',
                            direction: List.of('peel', 'boil'),
                            ingredients: List()
                        })
                    });
                    const oldName = 'Oatmeal and Bananas';
                    const newName = 'Oatmeal Banana';
                    const nextState = updateRecipeName(state, oldName, newName);

                    expect(nextState).to.equal(fromJS({
                        mashed_potatoes: {
                            name: 'Mashed Potatoes',
                            direction: ['peel', 'boil'],
                            ingredients: []
                        },
                        oatmeal_banana: {
                            name: 'Oatmeal Banana',
                            directions: ['add oats', 'add cinnamon', 'cook'],
                            ingredients: [{item: 'oats', amount: '4 scoops'}]
                        },
                    }));
                });

                it('should do nothing when the name to update was not already present on the list', () => {
                    const state = Map({
                        oatmeal_banana: Map({name: 'Oatmeal Banana'}),
                        mashed_potatoes: Map({name: 'Mashed Potatoes'})
                    });

                    const oldName = 'Salad';
                    const newName = 'Lunch Salad';
                    const nextState = updateRecipeName(state, oldName, newName);
                    expect(nextState.size).to.equal(2);
                    expect(nextState).to.not.include.key('salad');
                    expect(nextState).to.not.include.key('lunch_salad');
                    expect(nextState).to.include.keys(['oatmeal_banana', 'mashed_potatoes']);
                });
            });

            describe('Recipe directions', () => {
                it('should update the directions with a new set when given a recipe name on the list', () => {
                    // The state is just the recipe itself in this case.
                    // Above it was the recipe list!
                    const state = Map({
                        name: 'Oatmeal and Banana',
                        direction: List.of('Oats in pot', 'Water in pot', 'Cook'),
                        ingredients: List()
                    });
                    const directions = [
                        'Pour oats into pot',
                        'Pour water into pot',
                        'Cook!',
                        'Enjoy'
                    ];
                    const nextState = updateRecipeDirections(state, directions);
                    expect(nextState.get('directions').size).to.equal(4);
                    expect(nextState.get('directions')).to.equal(List.of(
                        'Pour oats into pot',
                        'Pour water into pot',
                        'Cook!',
                        'Enjoy'
                    ));
                });
            });
        });
    });
});
