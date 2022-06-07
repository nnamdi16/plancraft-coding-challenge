import { ResponseBuilder } from '@interfaces/http/responses/ResponseBuilder';
import {
  InjectionMode,
  Lifetime,
  asClass,
  asFunction,
  asValue,
  createContainer,
} from 'awilix';
import { logger, morganOption, LogTypes, createLog } from '@infra/logger/index';
import {
  validateRequest,
  validateSchema,
} from '@interfaces/http/validations/common.validation';

import HttpError from '@interfaces/http/common/HttpError';
import { MAX_FILE_UPLOAD_SIZE } from '@common/constants';
import MongoDB from '@infra/databases/MongoDBManger';
import config from '@config/index';
import httpServer from '@interfaces/http/server';
import mongodbModels from '@src/infrastructure/databases/Mongodb/models';
import { generateToken, verifyToken } from '@src/infrastructure/middlewares/auth';
import Encrypt from '@common/encryption';
import routes from '@interfaces/http/routes/router';
import { scopePerRequest } from 'awilix-express';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  config: asValue(config),
  db: asClass(MongoDB).singleton(),
  models: asValue(mongodbModels),
  logger: asValue(logger),
  maxFileUploadSize: asValue(MAX_FILE_UPLOAD_SIZE),
  containerMiddleware: asValue(scopePerRequest(container)),
  routes: asFunction(routes),
  httpServer: asClass(httpServer),
  morganOption: asValue(morganOption),
  validateSchema: asValue(validateSchema),
  validateRequest: asValue(validateRequest),
  HttpError: asValue(HttpError),
  encrypt: asClass(Encrypt),
  ResponseBuilder: asValue(ResponseBuilder),
  LogTypes: asValue(LogTypes),
  createLog: asValue(createLog),
  generateToken: asValue(generateToken),
  verifyToken: asValue(verifyToken),
});

container.loadModules(
  [
    [
      './infrastructure/repositories/**/*.ts',
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    formatName: 'camelCase',
    resolverOptions: {},
    cwd: __dirname,
  }
);

container.loadModules(
  [
    [
      './app/*.ts',
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    formatName: 'camelCase',
    resolverOptions: {},
    cwd: __dirname,
  }
);

export default container;
