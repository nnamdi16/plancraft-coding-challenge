import { Logger } from 'winston';
import buildDevLogger from './dev.logger';

export function getIpAddress(req: any) {
  return (
    (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
  );
}

function generateLogType(
  title: string,
  logType: any,
  objectType: string | undefined = undefined,
  description: string | undefined = undefined
) {
  return {
    title,
    logType,
    objectType,
    description,
  };
}

export const LogTypes = {
  USER_LOGIN: generateLogType(
    'User Logged in',
    'USER_LOGIN',
    undefined,
    'User logged in successfully'
  ),
};

export function createLog(
  request: any,
  type: any,
  objectId: string,
  userId: string | undefined = undefined,
  description: string | undefined = undefined,
  extraData: any | undefined = undefined
) {
  logger.info({
    logType: type.logType,
    title: type.title,
    user: userId || request.user._id,
    objectType: type.objectType,
    object: objectId,
    description: description || type.description,
    ipAddress: getIpAddress(request),
    userAgent: request.get('User-Agent'),
    extraData,
  });
}

/*
  * sample on how to use it destructure the   *
  *  function createLog and LogType from      *
  *  your constructor or just import if can't *
  * 
  const logType = LogTypes.USER_LOGIN
  createUserLog(req, logType, inputData.id);
*/

function init() {
  let logger: Logger | any = null;
  if (process.env.NODE_ENV === 'development') {
    logger = buildDevLogger();
  }
  return logger;
}

export const logger = init();

export const morganOption: any = {
  stream: {
    write(message: string) {
      logger.info(message.trim());
    },
  },
};
