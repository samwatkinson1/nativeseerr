/**
 * All HTTP errors extend the HTTPError base class, enforcing a strict format for easy serialization.
 * Format is inspired by, but not confirming to RFC 9457: https://www.rfc-editor.org/rfc/rfc9457.html
 */

/**
 * HttpError is the base class for all HTTP errors.
 *
 * @export
 * @abstract
 * @class HttpError
 * @extends {Error}
 *
 * @param {string} message a human readable explanation specific to this occurrence of the problem.
 * @param {number} status the status code of the error
 * @param {string} title a short, human readable summary of the problem type. This SHOULD NOT change from instance to instance of the same error type.
 * @param {Record<string, unknown>} context instance specific context
 *
 */
export abstract class HttpError extends Error {
  public status = 500;
  public title = "Internal Server Error";
  public context?: Record<string, unknown>;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  public serialize() {
    return {
      status: this.status,
      title: this.title,
      detail: this.message,
      ...(this.context ? { context: this.context } : {}),
    };
  }
}

/**
 * BadRequestError is used when the request is malformed or invalid.
 * MUST be serialized to a 400 status code.
 *
 * @param message a human readable explanation specific to this occurrence of the problem.
 * @param context instance specific context
 * @param context.errors a dictionary of errors, where the key is the path of the error and the value is an array of error messages
 */
export class BadRequestError extends HttpError {
  public override status = 400;
  public override title = "Bad Request";
  public override context: {
    errors: Record<string, string[]>;
  };

  constructor(message: string, context: { errors: Record<string, string[]> }) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);

    this.context = context;
  }
}

/**
 * UnauthorizedError is used when the request is missing authentication or authorization.
 * MUST be serialized to a 401 status code.
 *
 * @param message a human readable explanation specific to this occurrence of the problem.
 */
export class UnauthorizedError extends HttpError {
  public override status = 401;
  public override title = "Unauthorized";

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

/**
 * ForbiddenError is used when the request is authenticated but not authorized.
 * MUST be serialized to a 403 status code.
 *
 * @param message a human readable explanation specific to this occurrence of the problem.
 */
export class ForbiddenError extends HttpError {
  public override status = 403;
  public override title = "Forbidden";

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/**
 * NotFoundError is used when a resource cannot be found.
 * MUST be serialized to a 404 status code.
 *
 * @param message a human readable explanation specific to this occurrence of the problem.
 */
export class NotFoundError extends HttpError {
  public override status = 404;
  public override title = "Not Found";

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * TooManyRequestsError is used when the client has sent too many requests in a given amount of time.
 * MUST be serialized to a 429 status code.
 *
 * @param message a human readable explanation specific to this occurrence of the problem.
 */
export class TooManyRequestsError extends HttpError {
  public override status = 429;
  public override title = "Too Many Requests";

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}

/**
 * InternalServerError is used when an unexpected error occurs.
 * MUST be serialized to a 500 status code.
 *
 * @param message a human readable explanation specific to this occurrence of the problem.
 */
export class InternalServerError extends HttpError {
  public override status = 500;
  public override title = "Internal Server Error";

  constructor() {
    super("An unexpected error occurred. Please try again.");
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
