import { ethers } from "ethers";
import { FunctionParam } from "../domain";
import { ReturnType } from "../domain";
import { ParameterEncodingError } from "../errors";
import { ResponseDecodingError } from "../errors";

/**
 * Utilities for encoding/decoding parameters and validating inputs
 */
export class ERC20Utils {
    /**
     * Validates a method ID
     * @param methodId - Method ID to validate
     * @returns true if valid, false otherwise
     */
    static isValidMethodId(methodId: string): boolean {
        return /^0x[0-9a-f]{8}$/i.test(methodId);
    }

    /**
     * Encodes function parameters
     * @param params - Array of parameters to encode
     * @returns Encoded parameters as hex string
     */
    static encodeParams(params: FunctionParam[]): string {
        if (!params || params.length === 0) {
            return "";
        }

        let types: string[] = [];
        let values: any[] = [];

        params.forEach(param => {
            types.push(param.type);
            values.push(param.value);
        });

        try {
            const abiCoder = new ethers.AbiCoder();
            return abiCoder.encode(types, values).slice(2); // Remove '0x' prefix
        } catch (error) {
            throw new ParameterEncodingError(
                types.join(','),
                JSON.stringify(values)
            );
        }
    }

    /**
     * Decodes function response
     * @param returnType - Type of return value
     * @param data - Encoded response data
     * @returns Decoded value
     */
    static decodeResponse(returnType: ReturnType, data: string): any {
        if (!data || data === "0x") {
            return null;
        }

        // Ensure data has '0x' prefix
        const hexData = data.startsWith("0x") ? data : `0x${data}`;

        try {
            const abiCoder = new ethers.AbiCoder();
            const decoded = abiCoder.decode([returnType], hexData);
            return decoded[0];
        } catch (error) {
            throw new ResponseDecodingError(returnType, data);
        }
    }
}