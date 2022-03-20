import express from "express";
import path from "path";
import open from "open";
import compression from "compression";

/* eslint-disable no-console */

const app = express();
const port = 3000;

app.use(compression());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.get("/users", (req, res) => {
  res.json([
    {
      id: 1,
      firstName: "Ayoub",
      lastName: "BELGHAR",
      email: "ayoub.belghar@gmail.com",
    },
    {
      id: 2,
      firstName: "Mooad",
      lastName: "BELGHAR",
      email: "moaad.belghar@gmail.com",
    },
    {
      id: 3,
      firstName: "Driss",
      lastName: "BELGHAR",
      email: "driss.belghar@gmail.com",
    },
  ]);
});

app.listen(port, (err) => {
  if (err) console.log({ err });
  else open("http://localhost:" + port);
});
