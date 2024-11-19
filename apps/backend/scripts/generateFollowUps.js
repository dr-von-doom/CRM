const { faker } = require("@faker-js/faker");
const { writeFileSync } = require("fs");

const { "": opportunities } = require("../data/opportunities.json");
const { "": clients } = require("../data/clients.json");

const followUps = [];

for (let i = 0; i < 100; i++) {
  const opportunity = opportunities[faker.number.int({ min: 0, max: opportunities.length - 1 })];
  const clientContacts = clients.find(c => c.id === opportunity.clientId)?.contacts || [];

  followUps.push({
    id: faker.string.uuid(),
    opportunityId: opportunity.id,
    type: faker.helpers.arrayElement(["call", "email", "meeting"]),
    date: faker.date.recent().toISOString(),
    contactId: clientContacts.length > 0
      ? clientContacts[faker.number.int({ min: 0, max: clientContacts.length - 1 })].id
      : null,
    executiveId: faker.internet.email(),
    description: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.lorem.sentence()
    ), 
    isDeleted: false,
  });
}

writeFileSync(
  "./data/followUps.json",
  JSON.stringify({ "": followUps }, null, 2)
);
