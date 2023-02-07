#!/usr/bin/env node

import inquirer from "inquirer";
import { workWithEvent } from "./Events/event.js";

let category = "";
let method = "";

const SLEEP_DELAY = 2000;
const URL =
  "https://a1fzt90jn3.execute-api.eu-central-1.amazonaws.com/production";
const X_API_KEY = "DUBwlix96T5zt3M7tOnJ7ilJt6ufVG1436lyXzXh";

const sleep = (ms = SLEEP_DELAY) => new Promise((r) => setTimeout(r, ms));

async function getUserCategoryAndMethod() {
  const userCategory = () =>
    inquirer
      .prompt([
        {
          type: "expand",
          message: "Choose a category to work with:",
          name: "category",
          choices: [
            {
              key: "e",
              name: "Event: GET all, GET, POST, PUT, DELETE. GET, POST, PUT, DELETE Event's Tickets and Tags.",
              value: "event",
            },
            {
              key: "o",
              name: "Organizer: GET all, GET, POST, PUT, DELETE.",
              value: "organizer",
            },
            {
              key: "u",
              name: "User: GET all, GET, POST, PUT, DELETE.",
              value: "user",
            },
            {
              key: "t",
              name: "Event by Tag. GET all Events by Tag.",
              value: "event-by-tag",
            },
            new inquirer.Separator(),
            {
              key: "q",
              name: "Quit",
              value: "quit",
            },
          ],
        },
      ])
      .then((answers) => {
        return answers.category;
      });

  category = await userCategory();
}

console.log("Welcome to Event Go API CLI tool.");

while (true) {
  console.log("");
  await getUserCategoryAndMethod();

  switch (category) {
    case "event":
      await workWithEvent();
      break;
    case "organizer":
      console.log("You chose Organizer");
      break;
    case "user":
      console.log("You chose User");
      break;
    case "event by tag":
      console.log("You chose Event by Tag");
      break;
    case "quit":
      console.log("Goodbye!");
      process.exit();
      break;
    default:
      console.log("Didn't choose anything. Quitting...");
      process.exit();
      break;
  }
}
