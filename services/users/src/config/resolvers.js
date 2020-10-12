import * as apiClient from '../api/apiClient';

const resolvers = {
  Query: {
    me: (root, args, context) => {
      console.log(context.currentUser);
      return apiClient.getFirstUser();
    },
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
