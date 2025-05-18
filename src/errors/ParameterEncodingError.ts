import { ERC20ClientError } from './ERC20ClientError';

/**
 * Error thrown when parameter encoding fails
 */
export class ParameterEncodingError extends ERC20ClientError {
    constructor(paramType: string, value: any) {
        super(`Failed to encode parameter of type ${paramType} with value: ${value}`);
        this.name = "ParameterEncodingError";
        Object.setPrototypeOf(this, ParameterEncodingError.prototype);
    }
}