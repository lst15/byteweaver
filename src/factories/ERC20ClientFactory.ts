import { ethers } from "ethers";
import { ERC20Client } from "../services";
import { EthersProvider } from "../infrastructure";

/**
 * Factory to create ERC20 clients
 */
export class ERC20ClientFactory {
    /**
     * Creates a new ERC20 client with ethers provider
     * @param provider - Ethers provider
     * @returns New ERC20 client instance
     */
    static createWithEthers(provider: ethers.Provider): ERC20Client {
        const blockchainProvider = new EthersProvider(provider);
        return new ERC20Client(blockchainProvider);
    }
}