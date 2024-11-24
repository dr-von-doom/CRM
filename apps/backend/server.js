const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();

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

const summaryRouter = jsonServer.router(
  path.join(__dirname, "data", "summary.json")
);


const middlewares = jsonServer.defaults();

server.use(middlewares);


server.use("/clients", clientRouter);
server.use("/contacts", contactRouter);
server.use("/opportunities", opportunityRouter);
server.use("/follow-ups", followUpRouter);
server.use("/summary", summaryRouter);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
