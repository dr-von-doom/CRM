const { faker } = require("@faker-js/faker");
const { writeFileSync } = require("fs");

const { "": clients } = require("../data/clients.json");

const opportunities = [];

for (let i = 0; i < 30; i++) {
  opportunities.push({
    id: faker.string.uuid(),
    clientId:
      clients[
        faker.number.int({
          min: 0,
          max: clients.length - 1,
        })
      ].id,
    businessType: faker.helpers.arrayElement([
      "web_dev",
      "mobile_dev",
      "it_consulting",
      "outsourcing",
    ]),
    businessName: faker.company.name(),
    description: faker.lorem.paragraph(),
    estimatedDate: faker.date.future(),
    estimatedValue: faker.finance.amount(),
    status: faker.helpers.arrayElement([
      "open",
      "in_study",
      "purchase_order",
      "completed",
    ]),
    isDeleted: false,
  });
}

writeFileSync(
  "./data/opportunities.json",
  JSON.stringify({ "": opportunities }, null, 2)
);
