import { expect } from 'chai';
import { Map, List, fromJS } from 'immutable';

import format, {
    stringifyRecipe,
    properRecipeFormat
} from '../../app/js/formatting/recipe';


describe('stringifyRecipe', () => {

    it('should take in a immutable Map recipe to be converted to the string version', () => {
        const state = fromJS({
            name: 'Mashed Potatoes',
            ingredients: [
                {
                    item: 'banana',
                    amount: 3
                },
                {
                    item: 'oatmeal',
                    amount: '3 scoops'
                },
                {
                    item: 'water',
                    amount: '2 bottles'
                }
            ],
            directions: ['peel', 'boil', 'enjoy']
        });
        const nextState = stringifyRecipe(state);
        expect(nextState.name).to.equal('Mashed Potatoes');
        expect(nextState.ingredients).to.equal('banana:3;oatmeal:3 scoops;water:2 bottles');
        expect(nextState.directions).to.equal('peel;boil;enjoy');
    });

    it('should be able to handle a plain JS object and still convert to the same string version for Firebase storage', () => {
        const state = {
            name: 'Mashed Potatoes',
            ingredients: [
                {
                    item: 'banana',
                    amount: 3
                },
                {
                    item: 'oatmeal',
                    amount: '3 scoops'
                },
                {
                    item: 'water',
                    amount: '2 bottles'
                }
            ],
            directions: ['peel', 'boil', 'enjoy']
        };
        const nextState = stringifyRecipe(state);
        expect(nextState.name).to.equal('Mashed Potatoes');
        expect(nextState.ingredients).to.equal('banana:3;oatmeal:3 scoops;water:2 bottles');
        expect(nextState.directions).to.equal('peel;boil;enjoy');
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
        expect(Object.keys(convertedRecipe).length).to.equal(Object.keys(recipe).length)
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


