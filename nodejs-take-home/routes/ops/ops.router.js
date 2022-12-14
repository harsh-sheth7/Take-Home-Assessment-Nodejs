const express = require("express");
const { getLastInsertId } = require("../../db");
const { getOp, createOp } = require("./ops.service");

const opsRouter = express.Router();

opsRouter
  .get("/:opId", async (req, res) => {
    const opId = req.params.opId;
    const op = await getOp(opId);

    return res.status(200).json(op);
  })
  .post("/", async (req, res) => {
    if (req.body.startTime >= req.body.endTime) {
      return res.status(401).json("Start time cannot be past the endTime");
    }
    await createOp({
      operatorId: req.body.operatorId,
      businessId: req.body.businessId,
      opTitle: req.body.opTitle,
      pay: req.body.pay,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });

    const opId = await getLastInsertId();
    const createdOp = await getOp(opId);

    return res.status(201).json(createdOp);
  });

module.exports = {
  opsRouter,
};
