const { writeFileSync } = require("fs");


const { "": clients } = require("../data/clients.json");
const { "": opportunities } = require("../data/opportunities.json");


const summary = clients.map((client) => {
  const clientOpportunities = opportunities.filter(
    (opportunity) =>
      opportunity.clientId === client.id &&
      (opportunity.status === "completed" || opportunity.status === "purchase_order")
  );

  const totalEstimated = clientOpportunities.reduce(
    (sum, opportunity) => sum + parseFloat(opportunity.estimatedValue),
    0
  );

  const totalExecuted = clientOpportunities.reduce(
    (sum, opportunity) =>
      opportunity.status === "completed" ? sum + parseFloat(opportunity.estimatedValue) : sum,
    0
  );

  return {
    clientId: client.id,
    clientName: client.name,
    totalEstimated: totalEstimated.toFixed(2), 
    totalExecuted: totalExecuted.toFixed(2),
  };
});


writeFileSync("./data/summary.json", JSON.stringify({ "": summary }, null, 2));
