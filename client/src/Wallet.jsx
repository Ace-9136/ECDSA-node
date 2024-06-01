import server from "./server";
import { secp256k1 } from "@noble/curves/secp256k1";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKeyInput = evt.target.value.trim();
    setPrivateKey(privateKeyInput);

    try {
      // Ensure the private key is in the correct format
      const privateKeyBytes = hexToBytes(privateKeyInput);
      if (privateKeyBytes.length !== 32) {
        throw new Error("Invalid private key length");
      }

      const publicKey = secp256k1.getPublicKey(privateKeyBytes);
      const address = bytesToHex(publicKey);
      setAddress(address);

      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    } catch (error) {
      console.error("Invalid private key:", error);
      setAddress("");
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder="Type in a private key..."
          value={privateKey}
          onChange={onChange}
        />
      </label>
      <div>
        Public Key: {address ? address.slice(0, 10) + "..." + address.slice(-10) : "Invalid address"}
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
