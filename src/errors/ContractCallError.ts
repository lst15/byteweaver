import { ERC20ClientError } from './ERC20ClientError';

/**
 * Error thrown when contract call fails
 */
export class ContractCallError extends ERC20ClientError {
    constructor(message: string, public readonly cause?: Error) {
        super(`Contract call failed: ${message}`);
        this.name = "ContractCallError";
        Object.setPrototypeOf(this, ContractCallError.prototype);
    }
}