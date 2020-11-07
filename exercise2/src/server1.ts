const express = require("express");
const app = express();
const port = 8080;

const sleep = (millis: number) =>
  new Promise((resolve) => setTimeout(resolve, millis));

app.get("/example", (req: any, res: any) => {
  sleep(1000 * 2).then(() => res.send("Hello world!"));
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
