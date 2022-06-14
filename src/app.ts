import { HttpServer } from './interfaces/http/server';
import { Logger } from 'winston';
import RedisDB from '../src/infrastructure/databases/redis/RedisDBManager'
import express from 'express';
/**
 * Manages application interfaces e.g REST server, gRPC server
 */
 class App {
   private readonly httpServer: HttpServer;
   private readonly logger: Logger;
   private readonly db: RedisDB;

    constructor({ logger }: any) {
      this.httpServer = new HttpServer;
      this.logger = logger;
      this.db = new RedisDB()
    }
  
    /**
     * Starts the application interfaces to begin handling user requests
     */
    async start() {
      await this.httpServer.start();
    }
  
    /**
     * Closes the application's interfaces
     */
    shutdown() {
      this.httpServer.close(async (error: Error) => {
        this.logger.info("Shutting down REST server");
        if (error) {
          this.logger.error("Error while shutting down server", {
            error: error.toString(),
          });
        }
        process.exit(error ? 1 : 0);
      });
    }
  }
  
  export default App;