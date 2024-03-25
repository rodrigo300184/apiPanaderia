export class ApiError extends Error{

    constructor(status, message, safe = false) {
        super(message);
        this.status = status;
        this.message = message;
        this.safe = safe;
    }
}