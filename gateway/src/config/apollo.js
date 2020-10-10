import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

const gateway = new ApolloGateway({
  serviceList: [{ name: 'persons', url: process.env.PERSONS_SERVICE_URL }],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

export default server;
