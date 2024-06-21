export class HttpErrors extends Error {
  constructor(
    public message: string = "Something Went Wrong",
    public statusCode: number,
    public errors: any,
  ) {
    super(message);
    this.statusCode = statusCode;
  }

  get jsonData() {
    return [
      {
        message: this.message,
        statusCode: this.statusCode,
        errors: this.errors,
      },
    ];
  }

  static isHttpErrors(errors: any): errors is HttpErrors {
    return errors instanceof HttpErrors;
  }
}

export class BadRequest extends HttpErrors {
  constructor(message: any, errors: any) {
    super(message, 400, errors);
  }
}

export class ConflictErrors extends HttpErrors {
  constructor(message: string, errors: any) {
    super(message, 400, errors);
  }
}
export class AccessError extends HttpErrors {
  constructor(message: string, errors: any) {
    super(message, 403, errors);
  }
}
