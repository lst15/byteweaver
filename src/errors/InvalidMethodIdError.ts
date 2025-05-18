import { ERC20ClientError } from './ERC20ClientError';

/**
 * Error thrown when method ID is invalid
 */
export class InvalidMethodIdError extends ERC20ClientError {
    constructor(methodId: string) {
        super(`Invalid method ID: ${methodId}. Expected format: 0x followed by 8 hex characters.`);
        this.name = "InvalidMethodIdError";
        Object.setPrototypeOf(this, InvalidMethodIdError.prototype);
    }
}