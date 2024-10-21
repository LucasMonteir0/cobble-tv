export class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400, name: string | null) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);

    console.log(
      `ERROR\n[name] ${name}\n[code] ${statusCode}\n[message] ${message}`,
    );
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400, "BadRequestError");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401, "UnauthorizedError");
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403, "ForbiddenError");
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, "NotFoundError");
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, "ConflictError");
  }
}

export class InternalError extends AppError {
  constructor(message: string) {
    super(message, 500, "InternalError");
  }
}
