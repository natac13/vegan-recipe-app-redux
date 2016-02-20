import { dropEmail } from './helpers';

export const authToUser = (authData) => {
  const { provider } = authData;
  switch (provider) {
    case 'password':
      return {
        name: dropEmail(authData[provider].email),
        imageUrl: authData[provider].profileImageURL
      };
    case 'google':
    case 'github':
    case 'twitter':
    case 'facebook':
      return {
        id: authData[provider].id || '',
        name: authData[provider].displayName || '',
        username: authData[provider].username || '',
        imageUrl: authData[provider].profileImageURL || ''
      };
  }
};

