import { FunctionParam } from '../models';
import { ReturnType } from '../models';

/**
 * Interface for ERC20 client
 */
export interface IERC20Client {
    callFunction<T>(
        contractAddress: string,
        methodId: string,
        returnType: ReturnType,
        params?: FunctionParam[],
    ): Promise<T>;
}