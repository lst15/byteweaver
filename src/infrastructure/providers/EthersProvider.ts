import { ethers } from "ethers";
import { IBlockchainProvider } from "../../domain";
import { ContractCallError } from "../../errors";

/**
 * Ethers.js implementation of blockchain provider
 */
export class EthersProvider implements IBlockchainProvider {
    constructor(private provider: ethers.Provider) {
        if (!provider) {
            throw new Error("Provider is required");
        }
    }

    /**
     * Makes a call to the blockchain
     * @param to - Contract address
     * @param data - Encoded call data
     * @returns Promise with hex string result
     */
    async call(
        to: string,
        data: string,
    ): Promise<string> {
        try {
            return await this.provider.call({
                to,
                data
            });
        } catch (error) {
            throw new ContractCallError(
                (error as Error).message || "Unknown error",
                error as Error
            );
        }
    }

    /**
     * Validates if an address is a valid Ethereum address
     * @param address - Address to validate
     * @returns true if valid, false otherwise
     */
    isValidAddress(address: string): boolean {
        return ethers.isAddress(address);
    }
}