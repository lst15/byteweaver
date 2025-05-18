/**
 * Interface for blockchain provider abstraction
 */
export interface IBlockchainProvider {
    call(
        to: string,
        data: string,
        blockTag?: string | number
    ): Promise<string>;

    isValidAddress(address: string): boolean;
}