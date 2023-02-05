#!/usr/bin/env node

import inquirer from "inquirer";
import { workWithEvent } from "./Events/event.js";

let category = "";
let method = "";

const SLEEP_DELAY = 2000;
const URL =
  "https://a1fzt90jn3.execute-api.eu-central-1.amazonaws.com/production";
const X_API_KEY = "yXBR9GfkSj2mfLIBqSfAL7gpJIiCiKrM1MMcNcgN";

const sleep = (ms = SLEEP_DELAY) => new Promise((r) => setTimeout(r, ms));

async function getUserCategoryAndMethod() {
  const userCategory = await inquirer.prompt({
    name: "category",
    type: "list",
    message: "Choose a category to work with, or Quit to end the program:",
    choices: ["Event", "Organizer", "User", "Event by Tag", "Quit"],
    default() {
      return "Event";
    },
  });

  category = userCategory.category;
  category = category.toLowerCase();
}

async function workWithOrganizer() {}

async function workWithUser() {}

async function workWithTag() {}

console.log("Welcome to Event Go API CLI tool.");

while (true) {
  console.log("");
  await getUserCategoryAndMethod();

  switch (category) {
    case "event":
      console.log(`You chose Event.
`);
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
  }
}
