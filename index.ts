import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import screenshot from "screenshot-desktop";
import { writeFileSync } from "fs";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/", (_req, res) => {
  res.status(200).json("Welcome!");
});

app.get("/screenshot", async (req, res) => {
  try {
    console.log("enter");

    screenshot({ format: "png" })
      .then((img: Buffer) => {
        // img: Buffer filled with png goodness
        // ...
        console.log("Buffer: ", img);
        writeFileSync("img/img.png", img);
      })
      .catch((err) => {
        throw Error(err);
      });
    res.status(200).json("ok");
  } catch (error) {
    res.status(400).json("bad");
  }
});
app.listen(9000, () => {
  console.log("Listenin on PORT 9000");
});
