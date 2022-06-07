import HttpStatus from 'http-status-codes';
import { Response } from 'express';

const BasicResponse: any = {
  success: false,
  status_code: HttpStatus.INTERNAL_SERVER_ERROR,
  message: '',
};

/**
 * Handles API responses
 */
export class ResponseBuilder {
  static get HTTP_STATUS() {
    return HttpStatus;
  }

  static getResponseHandler(res: Response) {
    return {
      onSuccess: (data: any, message: string, code: number, links: any) => {
        return ResponseBuilder.respondWithSuccess(
          res,
          code,
          data,
          message,
          links
        );
      },
      onError: (
        errorName: string,
        errorCode: number,
        errorMessage: string,
        data: any
      ) => {
        return ResponseBuilder.respondWithError(
          res,
          errorName,
          errorCode,
          errorMessage,
          data
        );
      },
    };
  }

  static generateHATEOASLink(link: any, method: any, rel: any) {
    return {
      link,
      method,
      rel,
    };
  }

  static respondWithSuccess(
    res: Response,
    code = ResponseBuilder.HTTP_STATUS.OK,
    data: any = {},
    message = 'success',
    links = []
  ) {
    const response = { ...BasicResponse };
    response.success = true;
    response.message = message;
    response.data = data;
    response.links = links;
    response.status_code = code;
    return res.status(code).json(response);
  }

  static respondWithError(
    res: Response,
    errorName: String,
    errorCode = ResponseBuilder.HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message = 'Unknown error',
    data = {}
  ) {
    const response = { ...BasicResponse };
    response.success = false;
    response.name = errorName;
    response.message = message;
    response.status_code = errorCode;
    response.data = data;
    return res.status(errorCode).json(response);
  }
}
