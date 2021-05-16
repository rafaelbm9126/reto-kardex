import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import Schema from './schema.gql';
import Resolvers from './resolvers';

export default graphqlHTTP({
  schema: buildSchema(Schema),
  rootValue: Resolvers,
  graphiql: false,
});
