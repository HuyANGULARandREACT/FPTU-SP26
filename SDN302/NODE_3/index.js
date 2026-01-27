const hostname = "localhost";
const port = 5000;

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const pateRouter = require("./routes/pateRouter");

const app = express();

app.use(bodyParser.json());

app.use('/pates', pateRouter)

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running `);
});
