const express = require("express");
const app = express();
const cors = require("cors");
const { createAccount, getPublicKeyFromSignature } = require('./cryptography');
const port = 3043;

app.use(cors());
app.use(express.json());

const balances = {};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { signedMessage, signature } = req.body;
  const { recipient, amount } = signedMessage;

  const sender = getPublicKeyFromSignature(signedMessage, signature); 
  if(!balances[sender]) {
    res.status(400).send({ message: "Sender not exists" });
  return;
  }
  if(!balances[recipient]) {
    res.status(400).send({ message: "Recipient not exists" });
return;
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.post('/account', (_, res) => { 

  const account = createAccount();
  balances[account.publicKey] = 100; 

  res.send(account);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});