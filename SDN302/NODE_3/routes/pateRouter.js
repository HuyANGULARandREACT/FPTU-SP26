const express = require("express");
const bodyParser = require("body-parser");

const pateRouter = express.Router();
pateRouter.use(bodyParser.json());
pateRouter
  .route("/")

  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((req, res) => {
    res.end("will show all cans of pate Ha Long");
  })

  .post((req, res) => {
    res.end(
      "insert a new pate with name: " +
        req.body.name +
        " and price: " +
        req.body.price
    );
  });
pateRouter
  .route("/:id")
  .get((req, res) => {
    res.end("will show detail of pate halong with: " + req.params.id);
  })

  .put((req, res) => {
    res.write("udpate with id: " + req.params.id + "\n");
    res.end(
      "edit with name: " + req.body.name + "and price: " + req.body.price
    );
  });
module.exports = pateRouter;
