import inquirer from "inquirer";
import {
  getAllEvents,
  chooseEventMethod,
  actionBasedOnMethod,
} from "./eventMethods.js";
import { chooseTagMethod, actionBasedOnTagMethod } from "./eventTagsMethods.js";

const SLEEP_DELAY = 2000;

const URL =
  "https://a1fzt90jn3.execute-api.eu-central-1.amazonaws.com/production";

const X_API_KEY = "DUBwlix96T5zt3M7tOnJ7ilJt6ufVG1436lyXzXh";

const sleep = (ms = SLEEP_DELAY) => new Promise((r) => setTimeout(r, ms));

export async function workWithEvent() {
  const chooseEventCategory = () =>
    inquirer
      .prompt([
        {
          type: "expand",
          message: "Choose a sub-category of Event to work with:",
          name: "category",
          choices: [
            {
              key: "e",
              name: "Events: GET all, POST (add), PUT (update), DELETE.",
              value: "events",
            },
            {
              key: "t",
              name: "Tickets: GET, POST (add), PUT (update), DELETE Tickets of an Event.",
              value: "tickets",
            },
            {
              key: "g",
              name: "Tags: GET, POST (add), PUT (update), DELETE Tags of an Event.",
              value: "tags",
            },
            {
              key: "q",
              name: "Cancel",
              value: "quit",
            },
            new inquirer.Separator(),
          ],
        },
      ])
      .then((answers) => {
        return answers.category;
      });

  const category = await chooseEventCategory();

  switch (category) {
    case "events":
      const method = await chooseEventMethod();

      const response = await actionBasedOnMethod(method, URL, X_API_KEY);

      if (response === undefined) {
        console.log("Status not found.");
      }
      if (response.status === "got") {
        console.log(`Found ${response.data.length} events:`);
        response.data.forEach((e) => {
          console.table({
            ...e,
            // image: e.image.length > 0 ? "Has image" : "No image",
          });
        });
      }
      if (response.status === "posted") {
        console.log("Posted a new event to database. Got this response:");
        console.table(response.data);
      }
      if (response.status === "put") {
        console.log("Updated an event in database. Got this response:");
        console.table(response.data);
      }
      if (response.status === "deleted") {
        console.log("Deleted an event in database. Got this response:");
        console.table(response.data);
      }
      if (response.status === "cancelled") {
        console.log("Cancelled request. Going back to main interface...");
      }

      break;

    case "tickets":
      const ticketMethod = await chooseTicketMethod();

      const ticketResponse = await actionBasedOnTicketMethod(
        ticketMethod,
        URL,
        X_API_KEY
      );

      if (ticketResponse.status === "got") {
        if (ticketResponse.data === []) {
          console.log(`No tags for event with ID = ${eventId}!`);
        } else {
          console.log(
            `Found ${ticketResponse.data.length} ticket(s) for this event:`
          );
          console.table(ticketResponse.data);
        }
      }
      if (ticketResponse.status === "posted") {
        console.log(
          `Posted a new tag to event with ID = ${ticketResponse.data.event_id}. Got this response:`
        );
        console.table(ticketResponse.data);
      }
      if (ticketResponse.status === "put") {
        console.log(
          `Updated a new tag in event with ID = ${ticketResponse.data.event_id}. Got this response:`
        );
        console.table(ticketResponse.data);
      }
      if (ticketResponse.status === "deleted") {
        console.log(
          `Deleted a tag from event with ID = ${ticketResponse.data.event_id}. Got this response:`
        );
        console.table(ticketResponse.data);
      }
      break;
      break;

    case "tags":
      const tagMethod = await chooseTagMethod();

      const tagResponse = await actionBasedOnTagMethod(
        tagMethod,
        URL,
        X_API_KEY
      );

      if (tagResponse.status === "got") {
        if (tagResponse.data === []) {
          console.log(`No tags for event with ID = ${eventId}!`);
        } else {
          console.log(
            `Found ${tagResponse.data.length} tag(s) for this event:`
          );
          console.table(tagResponse.data);
        }
      }
      if (tagResponse.status === "posted") {
        console.log(
          `Posted a new tag to event with ID = ${tagResponse.data.event_id}. Got this response:`
        );
        console.table(tagResponse.data);
      }
      if (tagResponse.status === "put") {
        console.log(
          `Updated a new tag in event with ID = ${tagResponse.data.event_id}. Got this response:`
        );
        console.table(tagResponse.data);
      }
      if (tagResponse.status === "deleted") {
        console.log(
          `Deleted a tag from event with ID = ${tagResponse.data.event_id}. Got this response:`
        );
        console.table(tagResponse.data);
      }
      break;
    case "quit":
      return;

    default:
      process.exit();
  }
}
