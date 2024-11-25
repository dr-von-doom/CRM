const jsonServer = require("json-server");
const path = require("path");
const {
  getOpportunityOverview,
  getClientOpportunityComparison,
} = require("./handlers/opportunity-handler");

const data = {
  clients: require("./data/clients.json"),
  contacts: require("./data/contacts.json"),
  opportunities: require("./data/opportunities.json"),
  followUps: require("./data/followUps.json"),
};

const server = jsonServer.create();
const router = jsonServer.router(data);

const clientRouter = jsonServer.router(
  path.join(__dirname, "data", "clients.json")
);
const contactRouter = jsonServer.router(
  path.join(__dirname, "data", "contacts.json")
);
const opportunityRouter = jsonServer.router(
  path.join(__dirname, "data", "opportunities.json")
);
const followUpRouter = jsonServer.router(
  path.join(__dirname, "data", "followUps.json")
);

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use("/clients", clientRouter);
server.use("/contacts", contactRouter);

server.get("/opportunities/overview", (req, res) => {
  const { groupBy } = req.query;

  return getOpportunityOverview(groupBy, router.db, res);
});

server.get("/opportunities/comparison", (_, res) => {
  return getClientOpportunityComparison(router.db, res);
});

server.use("/opportunities", opportunityRouter);
server.use("/follow-ups", followUpRouter);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
