import { useState } from "react";
import { Accounts } from './Accounts';
import "./App.scss";
import Transfer from "./Transfer";
import Wallet from "./Wallet";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState();
  const [signature, setSignature] = useState();
  const [privateKey, setPrivateKey] = useState("");
  const clearSignature = () => setSignature("");
  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        setSignature={setSignature}
        message={message}
      />
      <Transfer setBalance={setBalance} signature={signature} message={message} setMessage={setMessage} clearSignature={clearSignature} />
      <Accounts />
    </div>
  );
}

export default App;
