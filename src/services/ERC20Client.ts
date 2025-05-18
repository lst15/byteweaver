import { IBlockchainProvider } from "../domain";
import { IERC20Client } from "../domain";
import { FunctionParam } from "../domain";
import { ReturnType } from "../domain";
import { ContractCallError } from "../errors";
import { ERC20ClientError } from "../errors";
import { InvalidAddressError } from "../errors";
import { InvalidMethodIdError } from "../errors";
import { ERC20Utils } from "../utils";

/**
 * Main ERC20 client for interacting with ERC20 tokens without ABI
 */
export class ERC20Client implements IERC20Client {
    constructor(private blockchainProvider: IBlockchainProvider) {
        if (!blockchainProvider) {
            throw new Error("Blockchain provider is required");
        }
    }

    /**
     * Calls a function on an ERC20 contract using methodId
     * @param contractAddress - Address of the ERC20 token contract
     * @param methodId - Method ID (4 bytes) of the function to call
     * @param params - Optional parameters for the function
     * @param returnType - Expected return type
     * @returns Promise with decoded return value
     */
    async callFunction<T>(
        contractAddress: string,
        methodId: string,
        returnType: ReturnType,
        params: FunctionParam[] = [],
    ): Promise<T> {
        this.validateInputs(contractAddress, methodId);

        const encodedParams = ERC20Utils.encodeParams(params);
        const callData = `${methodId}${encodedParams}`;

        try {
            const response = await this.blockchainProvider.call(contractAddress, callData);
            return ERC20Utils.decodeResponse(returnType, response) as T;
        } catch (error) {
            if (error instanceof ERC20ClientError) {
                throw error;
            }
            throw new ContractCallError(
                `Failed to call ${methodId} on contract ${contractAddress}`,
                error as Error
            );
        }
    }

    /**
     * Validates inputs for contract call
     * @param contractAddress - Contract address to validate
     * @param methodId - Method ID to validate
     */
    private validateInputs(contractAddress: string, methodId: string): void {
        if (!this.blockchainProvider.isValidAddress(contractAddress)) {
            throw new InvalidAddressError(contractAddress);
        }

        if (!ERC20Utils.isValidMethodId(methodId)) {
            throw new InvalidMethodIdError(methodId);
        }
    }
}