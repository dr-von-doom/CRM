const { faker } = require("@faker-js/faker");
const { writeFileSync } = require("fs");

const clients = [];

for (let i = 0; i < 50; i++) {
  clients.push({
    id: faker.string.uuid(),
    nit: faker.finance.accountNumber(),
    name: faker.person.firstName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    country: faker.location.country(),
    phone: faker.phone.number({ style: "international" }),
    email: faker.internet.email(),
    isActive: true,
  });
}

writeFileSync("./data/clients.json", JSON.stringify(clients, null, 2));
