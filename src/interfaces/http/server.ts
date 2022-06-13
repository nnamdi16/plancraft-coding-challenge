import { Server, createServer } from 'http';
import { Config } from 'convict';
import { Logger } from 'winston';
import express from 'express';
import path from 'path';
import config from '../../config/index';
import { logger } from '../../infrastructure/logger/index';
import routes from '../http/routes/router';



//    app.get('/', (req, res) => res.send('Hello World!'));


/**
 * Creates and configures an HTTP server
 */

/**
 * @todo remember to add route to the contructor from container
 */
//{ config, logger, routes, roleRepository }: any
export class HttpServer {
  private readonly config: Config<any>;
  // private readonly server: Server;
  private readonly log: Logger;
  public port: number;
  public serviceName: string;
  public version: string;
  public base: any;

  constructor() {
    // const app = express();
    // app.disable('x-powered-by');

    // app.use(
    //   '/rest-docs',
    //   express.static(path.resolve(__dirname, '../../../docs/apidocs/'))
    // );
    // app.use(routes);

    // this.server = createServer(app);
    this.config = config;
    this.log = logger;
    this.port = config.get('app.port');
    this.serviceName = config.get('app.serviceName');
    this.version = config.get('app.version');
  }

  async start() {
    const app = express();
    let router = express.Router();
    // URL for API documentation
    app.disable('x-powered-by');
    // app.use(
    //   '/rest-docs',
    //   express.static(path.resolve(__dirname, '../../../docs/apidocs/'))
    // );
    // app.use('/',routes);
    // router.get('/', (req, res) => res.send('Hello World!'));
    const data = routes()
    app.use('/v1', data)
    app.listen(this.port, () => this.log.info(`REST server for 
    ${this.serviceName} v${this.version} 
    listening on port ${this.port}`));
    // this.server.listen(this.port, () => {
    //   this.log.info(`REST server for 
    //   ${this.serviceName} v${this.version} 
    //   listening on port ${this.port}`);
    // });
  }

  close(cb: any) {
    // return this.server.close(cb);
  }
}

export default HttpServer;
