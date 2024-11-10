const { faker } = require("@faker-js/faker");
const { writeFileSync } = require("fs");

const { "": clients } = require("../data/clients.json");

const contacts = [];

for (let i = 0; i < 30; i++) {
  contacts.push({
    id: faker.string.uuid(),
    clientId: clients[faker.number.int({ min: 0, max: clients.length - 1 })].id,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: "international" }),
  });
}

writeFileSync(
  "./data/contacts.json",
  JSON.stringify({ "": contacts }, null, 2)
);
