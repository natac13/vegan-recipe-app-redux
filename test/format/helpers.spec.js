import { expect } from 'chai';

import {
  dropEmail,
  normalizeTemperature,
  tempFixer
} from '../../app/js/formatting/helpers';

describe('Formatting helper functions', () => {

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

  describe('normalizeTemperature function', () => {
    it('should take in a string 375F and return a formatted temperature of 375\u00B0F', () => {
      const state = '375F';
      const nextState = normalizeTemperature(state);
      expect(nextState).to.equal('375\u00B0F');
    });

    it('should take 375 f and return 375\u00B0F', () => {
      const state = '375 f';
      const nextState = normalizeTemperature(state);
      expect(nextState).to.equal('375\u00B0F');
    });

    it('should be able to handle Celsius as well; 350c to 350\u00B0C', () => {
      const state = '350c';
      const nextState = normalizeTemperature(state);
      expect(nextState).to.equal('350\u00B0C');
    })
  });

  describe('tempFixer which is the normalizeTemperature as a function waiting on the string to be given; can use to R.compose()', () => {
    it('should be a function', () => {
      expect(tempFixer).to.be.instanceof(Function);
    });

    it('should take in a string with a temperature value somewhere and normalize it', () => {
      const state = 'set oven to 375 f and wait';
      const nextState = tempFixer(state);
      expect(nextState).to.equal('set oven to 375\u00B0F and wait')
    });

    it('should handle temperature at the end of strings', () => {
      const state = 'oven 275c';
      const nextState = tempFixer(state);
      expect(nextState).to.equal('oven 275\u00B0C')
    })

    it('should take in "turn oven to 350f" and return "turn oven to 350\u00B0F"', () => {
      const state = 'turn oven to 350f';
      const nextState = tempFixer(state);
      expect(nextState).to.equal('turn oven to 350\u00B0F')
    })
  });
});