import * as apiClient from '../api/apiClient';

const resolvers = {
  Query: {
    personCount: () => apiClient.peopleCount(),
    allPersons: () => apiClient.allPeople(),
    findPerson: (root, args) => apiClient.findPersonByName(args.name),
  },
  Mutation: {
    createPerson: (root, args) => apiClient.createPerson(args),
    editNumber: (root, args) => apiClient.editNumber(args),
  },
  Person: {
    __resolveReference: (ref) => apiClient.findPersonById(ref.id),
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
};

export default resolvers;
