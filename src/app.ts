import express from 'express'
import cors from 'cors'
import { ApolloServer } from "apollo-server-express";
import { makeSchema } from "nexus";

import * as types from './resolvers'
import * as path from "path";


const playground = !!Number(process.env.PLAYGROUND_ENABLED || '0');
const tracing = !!Number(process.env.TRACING_ENABLED || '0');

const app = express();

app.use(cors());

app.get('/running', (_req, res) => {
    return res.json('ok')
});

const server = new ApolloServer({
    schema: makeSchema({
        types,
        outputs: {
            schema: path.resolve('./src/generated', 'schema.graphql'),
            typegen: path.resolve('./src/generated', 'nexus.ts')
        }
    }),
    introspection: playground,
    playground,
    tracing
});

server.applyMiddleware({
    app
});

export default app;
