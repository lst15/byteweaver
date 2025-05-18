import { ethers } from "ethers";
import ERC20ClientFactory, { FunctionParam } from "../src";

async function main() {
    // Connect to a provider (example with Infura)
    const provider = new ethers.JsonRpcProvider(
        "http://116.202.218.100:8545"
    );

    // Create ERC20 client
    const client = ERC20ClientFactory.createWithEthers(provider);

    try {
        // Example 1: Get token name
        const tokenAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"; // Uniswap token
        const nameMethodId = "0x06fdde03"; // method ID for 'name()'
        const name = await client.callFunction<string>(
            tokenAddress,
            nameMethodId,
            "string",
                [],
        );
        console.log(`Token name: ${name}`);

        // Example 2: Get token decimals
        const decimalsMethodId = "0x313ce567"; // method ID for 'decimals()'
        const decimals = await client.callFunction<number>(
            tokenAddress,
            decimalsMethodId,
            "uint8",
            [],
        );
        console.log(`Token decimals: ${decimals}`);

        // Example 3: Get token balance
        const balanceOfMethodId = "0x70a08231"; // method ID for 'balanceOf(address)'
        const walletAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // Example wallet

        const params: FunctionParam[] = [
            { type: "address", value: walletAddress }
        ];

        const balance = await client.callFunction<number>(
            tokenAddress,
            balanceOfMethodId,
            "uint256",
            params,
        );

        console.log(`Token balance: ${ethers.formatUnits(balance, decimals)}`);
    } catch (error) {
        console.error("Error:", error);
    }
}

main().catch(console.error);