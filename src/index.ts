import {HttpServer} from './interfaces/http/server';
import {logger} from './infrastructure/logger';
/**
 * Runs the application
 */

import App from "./app";

const app = new App({HttpServer, logger});
 
 app.start();

 export { app }
 
 process.on("SIGINT", app.shutdown.bind(app));
 
 process.on("SIGTERM", app.shutdown.bind(app));