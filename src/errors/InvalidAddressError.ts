import { ERC20ClientError } from './ERC20ClientError';

/**
 * Error thrown when contract address is invalid
 */
export class InvalidAddressError extends ERC20ClientError {
    constructor(address: string) {
        super(`Invalid Ethereum address: ${address}`);
        this.name = "InvalidAddressError";
        Object.setPrototypeOf(this, InvalidAddressError.prototype);
    }
}