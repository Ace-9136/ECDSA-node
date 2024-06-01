const { secp256k1 } = require("@noble/curves/secp256k1");
const { keccak_256 } = require("@noble/hashes/sha3");
const { bytesToHex, hexToBytes } = require("@noble/hashes/utils");

const privateKey = hexToBytes("d691b02605ed0a6a88e4df62ab1a444871eef044ed90a5fb1ea8a3b87fbd71e5");
const publicKey = secp256k1.getPublicKey(privateKey);
const address = bytesToHex(keccak_256(publicKey).slice(-20));

console.log(`Address: ${address}`); 