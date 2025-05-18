/**
 * Parameter types that can be passed to ERC20 contract calls
 */
export type ParamType =
    | "address"
    | "uint256"
    | "uint8"
    | "bool"
    | "string"
    | "bytes"
    | "bytes32";

/**
 * Interface for function parameter
 */
export interface FunctionParam {
    type: ParamType;
    value: any;
}