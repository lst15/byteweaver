/**
 * ERC20Direct - A TypeScript library for interacting with ERC20 tokens without ABI
 *
 * This library follows Clean Code principles and implements a modular architecture
 * to allow calling ERC20 contract functions using only their method IDs.
 */

// Export domain layer
export * from './domain/models/FunctionParam';
export * from './domain/models/ReturnType';
export * from './domain/interfaces/IBlockchainProvider';
export * from './domain/interfaces/IERC20Client';

// Export error types
export * from './errors/ERC20ClientError';
export * from './errors/InvalidAddressError';
export * from './errors/InvalidMethodIdError';
export * from './errors/ContractCallError';
export * from './errors/ResponseDecodingError';
export * from './errors/ParameterEncodingError';

// Export infrastructure
export * from './infrastructure/providers/EthersProvider';

// Export utils
export * from './utils/ERC20Utils';

// Export services
export * from './services/ERC20Client';

// Export factories
export * from './factories/ERC20ClientFactory';

// Export default factory for easy use
import { ERC20ClientFactory } from './factories';
export default ERC20ClientFactory;

// Technical Debt Tracker
/**
 * @TODO Implement support for more complex return types (structs, nested arrays)
 * @TODO Add caching mechanism for frequent calls to improve performance
 * @TODO Implement batch call support for multiple function calls in one transaction
 * @TODO Improve gas estimation for write operations (not just read-only calls)
 * @TODO Add Web3.js provider implementation alongside the ethers.js one
 * @TODO Implement retry mechanism for network failures
 * @TODO Add support for custom block tags/numbers for historical queries
 * @TODO Improve error messages with more context about what failed
 * @TODO Add support for direct contract write operations (not just read-only)
 * @TODO Create higher-level abstractions for common ERC20 methods
 */