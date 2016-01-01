import { List, Map, fromJS } from 'immutable';
import { expect }    from 'chai';
import R from 'ramda';

import * as types from '../../app/constants/';
import * as actions from '../../app/actions/';
import reducer, {
    request,
    success,
    failed
} from '../../app/reducers/asyncRequest';

describe('The async Reducer', () => {
    describe('Reducer Helper functions to handle state change', () => {
        describe('request helper function of the asyncReducer', () => {
            it('should take in a state take in a state and return a new state with fetching set to true', () => {
                const initialState = Map({
                    fetching: false,
                    didFail: false,
                    success: false
                });
                const nextState = request(initialState);
                expect(nextState).to.be.instanceof(Map);
                expect(nextState.get('fetching')).to.be.true;
                expect(nextState.get('didFail')).to.be.false;
                expect(nextState.get('success')).to.be.false;
            });
        });

        describe('The success function.', () => {
            it('should take in state and return new state with fetching and didFail set to false, with success being true', () => {
                const initialState = Map({
                    fetching: false,
                    didFail: false,
                    success: false
                });
                const nextState = success(initialState);
                expect(nextState).to.be.instanceof(Map);
                expect(nextState.get('fetching')).to.be.false;
                expect(nextState.get('didFail')).to.be.false;
                expect(nextState.get('success')).to.be.true;
            });
        });

        describe('The Failed function', () => {
            it('should take in a state to return a new state with failed set to true with the rest false', () => {
                const initialState = Map({
                    fetching: false,
                    didFail: false,
                    success: false
                });
                const nextState = failed(initialState);
                expect(nextState).to.be.instanceof(Map);
                expect(nextState.get('fetching')).to.be.false;
                expect(nextState.get('didFail')).to.be.true;
                expect(nextState.get('success')).to.be.false;
            });
        });
    });

    describe('The reducer itself!!', () => {
        it('should have an initial state with everything false', () => {
            const action = {
                type: 'default'
            }
            const state = reducer(undefined, action);
            expect(state).to.be.instanceof(Map);
            expect(state.size).to.equal(3);
            expect(state.get('fetching')).to.be.false;
            expect(state.get('didFail')).to.be.false;
            expect(state.get('success')).to.be.false;

        })
        it('should handle REQUEST_RECIPES', () => {
            const action = {
                type: 'REQUEST_RECIPES'
            }
            const state = reducer(undefined, action);
            expect(state.get('fetching')).to.be.true;
            expect(state.get('didFail')).to.be.false;
            expect(state.get('success')).to.be.false;
        });

        it('should after fetching change to failed if there was a failed action call, FAILED_REQUEST', () => {
            const initialState = Map({
                fetching: true,
                didFail: false,
                success: false
            });
            const action = {
                type: 'FAILED_REQUEST'
            };
            const nextState = reducer(initialState, action);
            expect(nextState.get('fetching')).to.be.false;
            expect(nextState.get('didFail')).to.be.true;
            expect(nextState.get('success')).to.be.false;
        })
    });
});