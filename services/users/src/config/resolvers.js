import * as apiClient from '../api/apiClient';

const resolvers = {
  Query: {
    me: () => apiClient.getFirstUser(),
  },
  Mutation: {
    createUser: (root, args) => apiClient.createUser(args),
    login: (root, args) => apiClient(args),
  },
  User: {
    friends: (user) => {
      const mapped = user.friends.map((id) => {
        return { __typename: 'Person', id };
      });

      return mapped;
    },
  },
};

export default resolvers;
