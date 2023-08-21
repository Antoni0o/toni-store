import { HttpStatus } from '@nestjs/common';

export class AppException extends Error {
  readonly statusCode: HttpStatus;

  constructor(message: string, statusCode: HttpStatus) {
    super(message);
    this.statusCode = statusCode;
  }
}
