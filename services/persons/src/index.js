import server from './config/apollo';

(async () => {
  const port = process.env.PORT;
  const { url } = await server.listen({ port });
  console.log(`Persons service ready at ${url}`);
})();
