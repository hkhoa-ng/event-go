import inquirer from "inquirer";
import { getAllEvents } from "./eventMethods.js";

const SLEEP_DELAY = 2000;
// const URL =
// "https://khoa-nguyen-cors-anywhere.fly.dev/https://a1fzt90jn3.execute-api.eu-central-1.amazonaws.com/production";

const URL =
  "https://a1fzt90jn3.execute-api.eu-central-1.amazonaws.com/production";

const X_API_KEY = "yXBR9GfkSj2mfLIBqSfAL7gpJIiCiKrM1MMcNcgN";

const sleep = (ms = SLEEP_DELAY) => new Promise((r) => setTimeout(r, ms));

export async function workWithEvent() {
  let eventCategory = "";
  let eventMethod = "";

  const chooseEventCategory = await inquirer.prompt({
    name: "category",
    type: "list",
    message: "Choose a sub-category of Event to work with:",
    choices: ["Events", "Event Tags", "Event Tickers"],
    default() {
      return "Events";
    },
  });
  eventCategory = chooseEventCategory.category;
  eventCategory = eventCategory.toLowerCase();
  console.log("");

  switch (eventCategory) {
    case "events":
      // console.log("Working with all events");
      const allEventPromises = await getAllEvents(URL, X_API_KEY);
      const allEvents = await Promise.all(allEventPromises);
      console.log(allEvents);

      await sleep();
      break;
    case "event tags":
      console.log("Working with event tags");
      break;
    case "event tickets":
      console.log("Working with event tickets");
  }
}
