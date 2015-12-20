import { List, Map, fromJS } from 'immutable';
import { expect }    from 'chai';

import { snakeCase } from '../app/js/core_helpers';

describe('The snake case functionality', () => {
    it('should take in a string and return a new string snake_cased', () => {
        const name = 'Mashed Potatoes';
        const snakedName = snakeCase(name);
        expect(snakedName).to.equal('mashed_potatoes');
    });

    it('should trim any white space around the name from user input', () => {
        const name = '   Oatmeal and         Bananas    ';
        const snakedName = snakeCase(name);
        expect(snakedName).to.equal('oatmeal_and_bananas');
    });

    it('should return an empty string when given an empty string', () => {
        const name = '';
        const snakedName = snakeCase(name);
        expect(snakedName).to.equal('');
    });

    it('should take a string that is already snake_cased and return the same string', () => {
        const name = 'mashed_potatoes';
        const snakedName = snakeCase(name);
        expect(snakedName).to.equal('mashed_potatoes')
    });

    it('should just lower case a one word string', () => {
        const name = 'Salad';
        const snakedName = snakeCase(name);
        expect(snakedName).to.equal('salad');
    })
});