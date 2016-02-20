import { expect } from 'chai';
import { Map, List, fromJS } from 'immutable';

import format, {
    authToUser
} from '../../app/js/formatting/user';

describe('authToUser function', () => {
    it('should take in authentication data from Google and create a user Object', () => {
        const authGoogle = {
            provider: 'google',
            uid: 'special#123',
            google: {
                id: 12345,
                displayName: 'Test User',
                profileImageURL: 'http://sample.noTLD'
            }
        };

        const user = authToUser(authGoogle);
        expect(user).to.deep.equal({
            id: 12345,
            name: 'Test User',
            username: '',
            imageUrl: 'http://sample.noTLD'
        });
    });

    it('should take in authentication data from Twitter and create a user object', () => {
        const authData = {
            provider: 'twitter',
            uid: 'twitter:12345',
            twitter: {
                id: 54321,
                displayName: 'Twitter User',
                username: '@username',
                profileImageURL: 'http://twitter.image.noTLD'
            }
        };
        const user = authToUser(authData);
        expect(user).to.deep.equal({
            id: 54321,
            name: 'Twitter User',
            username: '@username',
            imageUrl: 'http://twitter.image.noTLD'
        });
    });

    it('should take in authentication data from Github and create a user object', () => {
        const authData = {
            provider: 'github',
            uid: 'github:12345',
            github: {
                id: 54321,
                displayName: 'Github User',
                username: '@username',
                profileImageURL: 'http://github.image.noTLD'
            }
        };
        const user = authToUser(authData);
        expect(user).to.deep.equal({
            id: 54321,
            name: 'Github User',
            username: '@username',
            imageUrl: 'http://github.image.noTLD'
        });
    });
});
