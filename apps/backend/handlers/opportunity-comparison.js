/**
 * @param {object} db 
 * @param {object} res  
 */
const getClientOpportunityComparison = (db, res) => {
  const opportunities = db.get("opportunities").value();
  const clients = db.get("clients").value();

  const clientsMap = clients.reduce((acc, client) => {
    acc[client.id] = client.name;
    return acc;
  }, {});

  const result = opportunities.reduce((acc, opportunity) => {
    const clientId = opportunity.clientId;
    const estimatedValue = parseFloat(opportunity.estimatedValue);  
    const executedValue = opportunity.status === 'completed' ? estimatedValue : 0; 

    if (!acc[clientId]) {
      acc[clientId] = { valueEstimated: 0, valueExecuted: 0 };
    }

    acc[clientId].valueEstimated += estimatedValue;
    acc[clientId].valueExecuted += executedValue;

    return acc;
  }, {});

  const response = Object.keys(result).map((clientId, index) => ({
    id: index,
    valueEstimated: result[clientId].valueEstimated,
    valueExecuted: result[clientId].valueExecuted,
    label: clientsMap[clientId] || "Unknown Client",  
  }));


  return res.json(response);
};

module.exports = {
  getClientOpportunityComparison,
};

