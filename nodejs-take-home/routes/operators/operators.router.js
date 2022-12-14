const express = require("express");
const { getLastInsertId } = require("../../db");
const {
  getOperator,
  createOperator,
  getOperatorSchedules,
} = require("./operators.service");

const operatorsRouter = express.Router();

operatorsRouter
  .get("/:operatorId", async (req, res) => {
    const operatorId = req.params.operatorId;
    const operator = await getOperator(operatorId);
    if (typeof operator === "undefined") {
      return res.status(404).json("Operator not found");
    } else {
      return res.status(200).json(operator);
    }
  })
  .get("/:operatorId/schedules", async (req, res) => {
    const operatorId = req.params.operatorId;
    const findOperator = await getOperator(operatorId);
    if (typeof findOperator === "undefined") {
      return res.status(404).json("Operator not found");
    } else {
      const operator = await getOperatorSchedules(operatorId);
      if (operator.length === 0) {
        return res
          .status(200)
          .json("No job opportunities found for this operator");
      }
      return res.status(200).json(operator);
    }
  })
  .post("/", async (req, res) => {
    await createOperator({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const operatorId = await getLastInsertId();
    const createdOperator = await getOperator(operatorId);

    return res.status(201).json(createdOperator);
  });

module.exports = {
  operatorsRouter,
};
