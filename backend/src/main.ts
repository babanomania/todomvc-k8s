import fastify from 'fastify';
import pino from 'pino';
import todoRouter from './routes/todo.router';
import loadConfig from './config/env.config';
import { utils } from './utils';
import formbody from '@fastify/formbody';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

loadConfig();

const port = Number(process.env.LISTEN_PORT) || 5001;
const host = String(process.env.LISTEN_HOST);

const buildFastify = () => {
  const server = fastify({
    logger: pino({ level: process.env.LOG_LEVEL }),
  });

  // Register middlewares
  server.register(formbody);
  server.register(cors);
  server.register(helmet);

  // Register routes
  server.register(todoRouter, { prefix: '/api/todo' });

  // Set error handler
  server.setErrorHandler((error, _request, reply) => {
    server.log.error(error);
    reply.status(500).send({ error: 'Something went wrong' });
  });

  // Health check route
  server.get('/health', async (_request, reply) => {
    try {
      await utils.healthCheck();
      reply.status(200).send({
        message: 'Health check endpoint success.',
      });
    } catch (e) {
      reply.status(500).send({
        message: 'Health check endpoint failed.',
      });
    }
  });

  // Root route
  server.get('/', (request, reply) => {
    reply.status(200).send({ message: 'Hello from fastify!' });
  });

  return server
}

const startServer = async () => {
  
  const server = buildFastify();

  // Graceful shutdown
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      try {
        await server.close();
        server.log.error(`Closed application on ${signal}`);
        process.exit(0);
      } catch (err) {
        server.log.error(`Error closing application on ${signal}`, err);
        process.exit(1);
      }
    });
  });


  // Start server
  try {
    await server.listen({
      port,
      host,
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

startServer();

module.exports = buildFastify;