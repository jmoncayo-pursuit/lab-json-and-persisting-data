const fs = require("fs");
const {
  generateMessage,
  saveMessages,
  loadMessages,
  createMessages,
} = require("../index");

describe("Fake Data Generation", () => {
  test("generates a message with the correct fields", () => {
    const message = generateMessage();
    expect(message).toHaveProperty("id");
    expect(message).toHaveProperty("hackerName");
    expect(message).toHaveProperty("messageTitle");
    expect(message).toHaveProperty("messageContent");
    expect(message).toHaveProperty("isResolved");
    expect(message).toHaveProperty("messageResponse");
    expect(message).toHaveProperty("date");
    expect(message).toHaveProperty("numberOfUpvotes");
  });

  test("generates the correct data types", () => {
    const message = generateMessage();
    expect(typeof message.id).toBe("string");
    expect(typeof message.hackerName).toBe("string");
    expect(typeof message.messageTitle).toBe("string");
    expect(typeof message.messageContent).toBe("string");
    expect(typeof message.isResolved).toBe("boolean");
    expect(typeof message.messageResponse).toBe("string");
    expect(message.date instanceof Date).toBe(true);
    expect(typeof message.numberOfUpvotes).toBe("number");
  });

  test("creates and saves the correct number of messages", () => {
    const initialCount = loadMessages().length;
    createMessages(5);
    const newCount = loadMessages().length;
    expect(newCount - initialCount).toBe(5);
  });
});
