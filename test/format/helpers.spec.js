import { expect } from 'chai';

import {
    dropEmail
} from '../../app/js/formatting/helpers';

describe('Remove email function', () => {
    it('should take a full email and return everything before the @ symbol', () => {
        const state = 'naes131311@hotmail.com';
        const nextState = dropEmail(state);
        expect(nextState).to.equal('naes131311');
    });

    it('should take an email with other special characters and still work', () => {
        const state = 'naes_13.12-11@gmail.com';
        const nextState = dropEmail(state);
        expect(nextState).to.equal('naes_13.12-11');
    });
});