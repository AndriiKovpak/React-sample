import { SHA256 } from "crypto-js";

export const hashBlob = async (blob: Blob) => SHA256(await new Response(blob).text()).toString();
