export {};
const fetch = require("node-fetch");

const EP_URL = "http://localhost:8080/example";

const callEndpoint = async () => {
  const res = await fetch(EP_URL, { method: "GET" });
  const text = await res.text();
  console.log(text);
};

const sendRequests = (amount: number) => {
  for (let i = 0; i < amount; i++) {
    callEndpoint();
  }
};

sendRequests(10);
