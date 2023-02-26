import { keccak256 } from "ethereum-cryptography/keccak";
import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';

import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, message, setSignature }) {
  async function onPrivatekeyChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    if (privateKey) {
      const publicKey = secp.getPublicKey(privateKey);
      const addr = toHex(publicKey);
      setAddress(addr);
      const {
        data: { balance },
      } = await server.get(`balance/${addr}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  const signMessage = async (privateKey, message) => {
    const hash = keccak256(Uint8Array.from(message));

    const [signature, recoveryBit] = await secp.sign(hash, privateKey, {
      recovered: true,
    });
    const fullSignature = new Uint8Array([recoveryBit, ...signature]);
    const hashed = toHex(fullSignature);
    setSignature(hashed);
  }

  return (
    <>
      <div className="container wallet">
        <h1>Your Wallet</h1>

        <label>
          Private Key
          <input placeholder="Your private key" value={privateKey} onChange={onPrivatekeyChange}></input>
        </label>
        <label>
          Address
          <input value={address} disabled></input>
        </label>

        <div className="balance">Balance: {balance}</div>
        <hr />
        <div className="container wallet" style={{ display: !message ? 'none' : 'block' }}>
          <h3>Sign message?</h3>
          <label>
            Message
            <input value={JSON.stringify(message)} disabled></input>
          </label>
          <button className='button' type='button' onClick={() => signMessage(privateKey, message)}>Sign</button>
        </div>
      </div>
    </>
  );
}

export default Wallet;
