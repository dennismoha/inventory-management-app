// lib/prismaClient.ts
import { PrismaClient, Prisma } from '@prisma/client';
import { config } from '@src/config';
import Logger from 'bunyan';
import { BadRequestError } from '@src/shared/globals/helpers/error-handler';


const logger: Logger = config.createLogger('prisma');

// Create a single instance of Prisma Client
const prismaClient = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn'
        }
    ],
});


// Log Prisma queries with the correct typing
prismaClient.$on('query', (e: Prisma.QueryEvent) => {    
    logger.debug(`Prisma Query: ${e.query} - ${JSON.stringify(e.params)}`);
});

// Log Prisma errors
prismaClient.$on('error', (e) => {
    logger.info('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer===============', e);
    // Handle Prisma known errors
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        logger.info('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer', e);
        if (e.code === 'P2002') {
          logger.error(
            `message: ${e.message}`
          );
        } else {
          logger.error(`Prisma Error: ${e.message}`);
        }
      } else {
        // Handle unexpected errors
        logger.error(`Unexpected error: ${e}`);
      }
    throw new BadRequestError('error');
    
});

// Log Prisma info events (optional)
prismaClient.$on('info', (e) => {
    logger.info(`Prisma Info: ${e.message}`);
});




// Optionally, you can handle disconnections and log errors in this file
prismaClient.$connect().catch((e) => {
    console.error('Prisma Client connection error:', e);
});

export default prismaClient;
