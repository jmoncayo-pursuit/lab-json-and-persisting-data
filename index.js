const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generateMessage = () => ({
  id: faker.datatype.uuid(),
  hackerName: `${faker.hacker.adjective()} ${faker.science.chemicalElement()} ${faker.animal.type()}`,
  messageTitle: `Help with ${faker.hacker.adjective()} ${faker.hacker.abbreviation()} on ${faker.git.branch()}`,
  messageContent: faker.lorem.paragraph(),
  isResolved: faker.datatype.boolean(),
  messageResponse: faker.hacker.phrase(),
  date: faker.date.recent(),
  numberOfUpvotes: faker.datatype.number(),
});

const saveMessages = (messages) => {
  fs.writeFileSync("data.json", JSON.stringify(messages, null, 2));
};

const loadMessages = () => {
  if (!fs.existsSync("data.json")) return [];
  const data = fs.readFileSync("data.json");
  return JSON.parse(data);
};

const createMessages = (count) => {
  const existingMessages = loadMessages();
  const newMessages = Array.from({ length: count }, generateMessage);
  saveMessages([...existingMessages, ...newMessages]);
};

const args = process.argv.slice(2);
const count = parseInt(args[0], 10) || 1;
createMessages(count);

module.exports = {
  generateMessage,
  saveMessages,
  loadMessages,
  createMessages,
};
