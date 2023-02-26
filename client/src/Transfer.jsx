import { useState } from "react";
import server from "./server";

function Transfer({ signature, setBalance, setMessage, message, clearSignature }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function connectWallet(evt) {
    evt.preventDefault();

    setMessage({
      amount: parseInt(sendAmount),
      recipient,
    })
  }

  async function transfer() {
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        signature,
        signedMessage: message
      });
      setBalance(balance);
      clearSignature();
      setMessage("");
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <div className="container transfer">
      <form onSubmit={connectWallet}>
        <h1>Send Transaction</h1>

        <label>
          Send Amount
          <input
            disabled={!!signature}
            placeholder="1, 2, 3..."
            value={sendAmount}
            onChange={setValue(setSendAmount)}
          ></input>
        </label>

        <label>
          Recipient
          <input
            disabled={!!signature}
            placeholder="Type an address, for example: 0x2"
            value={recipient}
            onChange={setValue(setRecipient)}
          ></input>
        </label>


        <input disabled={!!signature}
          type="submit" className="button" value={!signature ? "Connect wallet" : "Connected"} />
      </form>
      <label>
        <button disabled={!signature} className='button' onClick={transfer}>Transfer</button>
      </label>
    </div>

  );
}

export default Transfer;
