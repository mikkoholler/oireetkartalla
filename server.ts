import * as express from "express";
import * as path from "path";
import * as favicon from "express-favicon";

const app = express();

const port = process.env.PORT || 5000;
app.use(favicon(__dirname + "/build/favicon.ico"));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
