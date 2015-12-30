import { expect } from 'chai';
import { Map, List, fromJS } from 'immutable';

import format, { capitalize } from '../app/js/format';

describe('The formatting function', () => {
    describe('The capitalize function', () => {
        it('should take in a word and return the same word capitalized', () => {
            const word = 'natac';
            const capWord = capitalize(word);
            expect(capWord).to.equal('Natac');
        });
    });
    describe('Directions', () => {
        it('should provide a function that will split a string on a comma and return an Immutable-List', () => {
        const property = 'directions';
        const value = 'peel potatoes; wash them; cut; boil in water';
        const formatter = format(property);

        expect(formatter).to.be.ok;
        const directionsList = formatter(value);
        expect(List.isList(directionsList)).to.be.true;
        expect(directionsList.size).to.equal(4);

    });

        it('should capitalize the first letter of the word', () => {
            const property = 'directions';
            const value = 'peel potatoes; wash them; cut; boil in water';
            const formatter = format(property);
            const directionsList = formatter(value);

            expect(directionsList).to.equal(fromJS(['Peel potatoes', 'Wash them', 'Cut', 'Boil in water']))
        });
    });

    describe('The ingredients', () => {
        it('should provide a function that will split on comma first then colon to build a List of Maps', () => {
            const property = 'ingredients';
            const value = 'bananas: 2; oatmeal: 3 scoops';
            const formatter = format(property);
            const ingredientsList = formatter(value);


            expect(formatter).to.be.ok;
            // expect(List.isList(ingredientsList)).to.be.true;
            expect(ingredientsList.size).to.equal(2);
        });

        it('should make ingredient items immutable Maps', () => {
            const property = 'ingredients';
            const value = 'bananas: 2; oatmeal: 3 scoops';
            const formatter = format(property);
            const ingredientsList = formatter(value);
            const [ itemA, itemB ] = ingredientsList;

            expect(Map.isMap(itemA)).to.be.true;
            expect(itemA.has('item')).to.be.true;
        });

        it('should capitalize the item name', () => {
            const property = 'ingredients';
            const value = 'bananas: 2; oatmeal: 3 scoops';
            const formatter = format(property);
            const ingredientsList = formatter(value);
            const [ itemA, itemB ] = ingredientsList;

            expect(itemA.get('item')).to.equal('Bananas')

        });

    });

    describe('Edge cases', () => {
        it('should be giving the property, directions, and the string to format and return an List of directions', () => {
            const property = 'directions';
            const value = 'peel; boil them; enjoy';
            const directions = format(property)(value);
            expect(directions).to.be.instanceof(List);
            expect(directions.size).to.equal(3);
        });

        it('should have an tailing semicolon and not add an extra item to the the directions list', () => {
            const property = 'directions';
            const value = 'peel; boil them; enjoy;';
            const directions = format(property)(value);
            expect(directions.size).to.equal(3);
            expect(directions).to.equal(List.of('Peel', 'Boil them', 'Enjoy'));
        });

        it('should ignore any blank direction. Meaning a semicolon and nothing and semicolon', () => {
            const property = 'directions';
            const value = 'peel; ; enjoy;  ;';
            const directions = format(property)(value);
            expect(directions.size).to.equal(2);
        });

        it('should have an tailing semicolon and not add an extra item to the the directions list', () => {
            const property = 'ingredients';
            const value = 'bananas: 2; oatmeal: 3 scoops; apples: 4;'
            const ingredients = format(property)(value);
            expect(ingredients.size).to.equal(3);
        });
    });


});