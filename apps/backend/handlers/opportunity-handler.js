/**
 * it returns an array of objects with the following structure:
 * {
 *  id: string,
 *  value: number,
 *  label: string
 * }
 * @param {string} groupBy "status" or "businessType"
 * @param {object} db
 * @param {object} res
 */
const getOpportunityOverview = (groupBy, db, res) => {
  if (!groupBy) {
    return res
      .status(400)
      .json({ message: "groupBy query parameter is required" });
  }

  const { "": opportunities } = db.get("opportunities").value();

  // Group opportunities by "groupBy" and count
  const result = opportunities.reduce((acc, opportunity) => {
    const key = opportunity[groupBy];
    acc[key] = acc[key] ? acc[key] + 1 : 1;
    return acc;
  }, {});

  // Return an array of id, value and label
  return res.json(
    Object.keys(result).map((key, index) => ({
      id: index,
      value: result[key],
      label: key,
    }))
  );
};

/**
 * it returns an array of objects with the following structure:
 * {
 *  id: number,
 *  valueEstimated: number,
 *  valueExecuted: number,
 *  label: string
 * }
 * @param {object} db
 * @param {object} _req
 * @param {object} res
 */
const getClientOpportunityComparison = (db, _req, res) => {
  const { "": opportunities } = db.get("opportunities").value();
  const { "": clients } = db.get("clients").value();

  const clientsMap = clients.reduce((acc, client) => {
    acc[client.id] = client.name;
    return acc;
  }, {});

  const result = opportunities.reduce((acc, opportunity) => {
    const clientId = opportunity.clientId;
    const estimatedValue = parseFloat(opportunity.estimatedValue);
    const executedValue =
      opportunity.status === "completed" ? estimatedValue : 0;

    if (!acc[clientId]) {
      acc[clientId] = { valueEstimated: 0, valueExecuted: 0 };
    }

    acc[clientId].valueEstimated += estimatedValue;
    acc[clientId].valueExecuted += executedValue;

    return acc;
  }, {});

  const filteredResults = Object.keys(result)
    .filter((clientId) => clientsMap[clientId]) 
    .map((clientId, index) => ({
      id: index,
      valueEstimated: result[clientId].valueEstimated,
      valueExecuted: result[clientId].valueExecuted,
      label: clientsMap[clientId],
    }));

  return res.json(filteredResults);
};


module.exports = {
  getOpportunityOverview,
  getClientOpportunityComparison,
};
