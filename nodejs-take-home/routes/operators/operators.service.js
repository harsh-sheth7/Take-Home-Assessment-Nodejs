const { query } = require("../../db/query");

const getOperator = async (operatorId) => {
  const text = `
        SELECT id
            , "firstName"
            , "lastName"
            , "createdAt"
        FROM operators
        WHERE id = $1;
    `;
  const [operator] = await query(text, [operatorId]);
  return operator;
};

const getOperatorSchedules = async (operatorId) => {
  const text = `
        SELECT "businessName"
            , "opTitle"
            , "pay"
            , "startTime"
            , "endTime"
            , "addressLine1"
            , "addressLine2"
            , "city"
            , "state"
            , "zip"
        FROM ops
        INNER JOIN businesses ON businesses.id = ops.businessId
        WHERE operatorId = $1;
    `;
  const opSchedule = await query(text, [operatorId]);
  return opSchedule;
};

const createOperator = async ({ firstName, lastName }) => {
  const text = `
        INSERT INTO operators
        ( "firstName", "lastName" )
        VALUES ( $1, $2 )
    `;
  await query(text, [firstName, lastName]);
};

module.exports = {
  getOperator,
  getOperatorSchedules,
  createOperator,
};
