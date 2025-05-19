# ERC20 Method ID Client

A TypeScript library for interacting with ERC20 tokens without ABI, using only method IDs. This library follows Clean Code principles and implements a modular architecture.

## Features

- Call ERC20 contract functions using only their method IDs (without ABI)
- Automatic decoding of return values based on expected type
- Rigorous input validation
- Detailed error handling
- Clean, modular architecture following SOLID principles
- Full TypeScript support

## Installation

```bash
npm install erc20-method-id-client
```

## Quick Start

```typescript
import { ethers } from "ethers";
import ERC20ClientFactory from "erc20-method-id-client";

// Connect to a provider
const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_KEY");

// Create ERC20 client
const client = ERC20ClientFactory.createWithEthers(provider);

// Call a function using method ID
async function getTokenName() {
  const tokenAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"; // Uniswap token
  const nameMethodId = "0x06fdde03"; // method ID for 'name()'
  
  try {
    const name = await client.callFunction(
      tokenAddress,
      nameMethodId,
      [], // no parameters
      "string" // return type
    );
    
    console.log(`Token name: ${name}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

getTokenName();
```

## Architecture

The library follows a modular architecture with clear separation of concerns:

1. **Domain Layer**: Core entities and interfaces
2. **Infrastructure Layer**: Provider implementation
3. **Service Layer**: ERC20 client implementation
4. **Error Handling**: Custom error types
5. **Utils**: Helper functions

## Detailed Usage

### Calling Functions with Parameters

```typescript
import { ethers } from "ethers";
import ERC20ClientFactory, { FunctionParam } from "erc20-method-id-client";

// Create client
const provider = new ethers.providers.JsonRpcProvider("https://...");
const client = ERC20ClientFactory.createWithEthers(provider);

// Call balanceOf(address) function
async function getBalance() {
  const tokenAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const balanceOfMethodId = "0x70a08231"; // method ID for 'balanceOf(address)'
  const walletAddress = "0xYourWalletAddress";
  
  // Define parameters
  const params: FunctionParam[] = [
    { type: "address", value: walletAddress }
  ];
  
  const balance = await client.callFunction(
    tokenAddress,
    balanceOfMethodId,
    params,
    "uint256" // return type
  );
  
  console.log(`Balance: ${ethers.utils.formatUnits(balance, 18)}`);
}
```

### Supported Types

#### Parameter Types
- `address`
- `uint256`, `uint8`
- `bool`
- `string`
- `bytes`, `bytes32`

#### Return Types
- `address`, `address[]`
- `uint256`, `uint256[]`, `uint8`
- `bool`
- `string`
- `bytes`, `bytes32`

### Error Handling

The library provides detailed error types:

- `ERC20ClientError`: Base error class
- `InvalidAddressError`: Thrown when contract address is invalid
- `InvalidMethodIdError`: Thrown when method ID is invalid
- `ContractCallError`: Thrown when contract call fails
- `ResponseDecodingError`: Thrown when decoding response fails
- `ParameterEncodingError`: Thrown when parameter encoding fails

```typescript
try {
  const result = await client.callFunction(...);
} catch (error) {
  if (error instanceof InvalidAddressError) {
    // Handle invalid address
  } else if (error instanceof ContractCallError) {
    // Handle contract call failure
    console.error("Original error:", error.cause);
  } else {
    // Handle other errors
  }
}
```

## Technical Debt and Future Improvements

- Add support for more complex return types (structs, nested arrays)
- Implement caching mechanism for frequent calls
- Add batch call support for multiple function calls in one transaction
- Improve gas estimation for write transactions
- Add Web3.js provider implementation

## License

MIT