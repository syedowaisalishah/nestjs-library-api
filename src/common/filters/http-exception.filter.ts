import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import * as Boom from '@hapi/boom';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (Boom.isBoom(exception)) {
      const { statusCode, payload } = exception.output;
      return response.status(statusCode).json(payload);
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();
      return response.status(status).json({
        statusCode: status,
        message,
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
