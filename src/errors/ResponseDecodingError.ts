import { ERC20ClientError } from './ERC20ClientError';

/**
 * Error thrown when decoding response fails
 */
export class ResponseDecodingError extends ERC20ClientError {
    constructor(returnType: string, responseData: string) {
        super(`Failed to decode response of type ${returnType} from data: ${responseData}`);
        this.name = "ResponseDecodingError";
        Object.setPrototypeOf(this, ResponseDecodingError.prototype);
    }
}