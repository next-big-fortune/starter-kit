import express from "express";
import path from "path";
import open from "open";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(port, (err) => {
  if (err) console.log({ err });
  else open("http://localhost:" + port);
});
