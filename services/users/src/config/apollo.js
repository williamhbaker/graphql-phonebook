import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

import * as apiClient from '../api/apiClient';

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: apiClient.getCurrentUser,
});

export default server;
