import { Response } from 'express';

class HttpError extends Error {
  public status: number;
  public data: any;
  public isOperational: boolean;
  constructor(
    status: number,
    isOperational: boolean,
    message: string,
    data: any
  ) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
    this.isOperational = isOperational;
  }

  getErrorResponse(res: Response) {
    let respObj: any = {
      success: false,
      error: this.message,
    };
    if (this.data) {
      respObj['data'] = this.data;
    }

    return res.status(this.status).json(respObj);
  }
}

export default HttpError;
