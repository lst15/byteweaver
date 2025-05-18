/**
 * Base error class for ERC20 client errors
 */
export class ERC20ClientError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ERC20ClientError";
        Object.setPrototypeOf(this, ERC20ClientError.prototype);
    }
}