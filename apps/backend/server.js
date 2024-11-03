const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router({
  clients: JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "clients.json"))
  ),
});
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
