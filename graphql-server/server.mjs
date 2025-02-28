import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const typeDefs = `#graphql
  type Query {
    hello: String
  }

  type SentimentResult {
    label: String!
	score: Float!
  }

  type Mutation {
    evaluateSentiment(input: String!): SentimentResult
  }
`;

const resolvers = {
	Mutation: {
		evaluateSentiment: async (_, { input }) => {
			const response = await fetch(
				'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`
					},
					body: JSON.stringify(input)
				}
			);
			// console.log(await response.json())
			const data = await response.json();
			return data[0][0];
		}
	}
};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
await server.start();

app.use(
	cors({ origin: 'http://localhost:5173' }),
	express.json(),
	expressMiddleware(server, {
		context: async ({ req }) => ({ token: req.headers.authorization })
	})
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
