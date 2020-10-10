import server from './config/apollo';

(async () => {
  const port = process.env.PORT;
  const { url } = await server.listen({ port });
  console.log(`Users service ready at ${url}`);
})();
