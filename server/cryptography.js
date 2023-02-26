const secp = require('ethereum-cryptography/secp256k1');
const {hexToBytes, toHex }= require( 'ethereum-cryptography/utils');
const { keccak256 } = require("ethereum-cryptography/keccak");

const createAccount = () => { 
    // It's not the most safe way to create an account in the back-end but for now it solves the case of manually scripting
    // This should be done by an external tool.
    const privateKey = secp.utils.randomPrivateKey(); 
    const publicKey = secp.getPublicKey(privateKey); 

    return { 
        privateKey: toHex(privateKey), 
        publicKey: toHex(publicKey)
    }
}

const getPublicKeyFromSignature = (signedMessage, signature) => {
    const hash = keccak256(Uint8Array.from(signedMessage));
    const signatureBytes = hexToBytes(signature);
    const recoveryBit = signatureBytes[0];
    const slicedSignature = signatureBytes.slice(1);
  
    return toHex(secp.recoverPublicKey(hash, slicedSignature, recoveryBit));
  };

  module.exports = { 
createAccount, 
getPublicKeyFromSignature
  }