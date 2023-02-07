import axios from "axios";
import inquirer from "inquirer";
import DatePickerPrompt from "inquirer-datepicker-prompt";
import { getTagsByEventId } from "./eventTagsMethods.js";
import { getTicketsByEventId } from "./eventTicketsMethods.js";

inquirer.registerPrompt("datetime", DatePickerPrompt);

export async function chooseEventMethod() {
  const eventMethods = () =>
    inquirer
      .prompt([
        {
          type: "expand",
          message: "Choose a method:",
          name: "method",
          choices: [
            {
              key: "g",
              name: "Event: GET all.",
              value: "get",
            },
            {
              key: "p",
              name: "Event: POST (add).",
              value: "post",
            },
            {
              key: "u",
              name: "Event: PUT (update).",
              value: "put",
            },
            {
              key: "d",
              name: "Event: DELETE.",
              value: "delete",
            },
            new inquirer.Separator(),
            {
              key: "q",
              name: "Cancel",
              value: "quit",
            },
          ],
        },
      ])
      .then((answers) => {
        return answers.method;
      });

  return await eventMethods();
}

export async function actionBasedOnMethod(method, url, xApiKey) {
  switch (method) {
    case "get":
      const allEventPromises = await getAllEvents(url, xApiKey);
      const allEvents = await Promise.all(allEventPromises);
      return { status: "got", data: allEvents };

    case "post":
      const postResponse = await postNewEventHandler(url, xApiKey);
      return postResponse;

    case "put":
      const putResponse = await putEventHandler(url, xApiKey);
      return putResponse;

    case "delete":
      const deleteResponse = await deleteEventHandler(url, xApiKey);
      return deleteResponse;

    case "quit":
      return { status: "cancelled" };

    default:
      console.log("Invalid method!");
      break;
  }
}

// GET all events
export async function getAllEvents(url, xApiKey) {
  console.log("");
  const fetchOptions = {
    method: "GET",
    headers: {
      origin: "localhost",
      "x-api-key": xApiKey,
    },
  };

  const config = {
    headers: {
      origin: "localhost",
      "x-api-key": xApiKey,
    },
  };

  const allEvents = await axios
    .get(`${url}/events`, config)
    .then(async (res) => {
      return await res.data.events.map(async (event) => {
        let currentEvent = {
          ...event,
          tags: [],
          tickets: [],
        };
        // Fetch tags of current event
        const tags = await getTagsByEventId(url, xApiKey, event.event_id);
        currentEvent.tags = tags;

        // Fetch the ticket of current events
        const tickets = await getTicketsByEventId(
          url,
          fetchOptions,
          event.event_id
        );
        if (tickets === undefined) {
          console.log(`No tickets for event with ID = ${event.event_id}!`);
        } else {
          currentEvent.tickets = tickets;
        }

        return currentEvent;
      });
    });

  return await Promise.all(allEvents);
  // .catch((err) => console.log(`Error while fetching all event data: ${err}`));
}

// POST event
export async function postNewEventHandler(url, xApiKey) {
  const eventDetails = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What is the name for the new event?",
      validate: (value) => {
        if (value.length) {
          return true;
        }
        return "Please enter a valid name for your event!";
      },
    },
    {
      name: "organizerEmail",
      type: "input",
      message: "What is the email of this event's organizer?",
      validate: (value) => {
        const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          value
        );
        if (valid) {
          return true;
        }
        return "Please enter a valid organizer email!";
      },
    },
    {
      type: "datetime",
      name: "eventTime",
      message: "Choose event time (dd/mm/yyyy hh:MM AM/PM):",
      format: ["dd", "/", "mm", "/", "yyyy", " ", "hh", ":", "MM", " ", "TT"],
      time: {
        minutes: {
          interval: 15,
        },
      },
      initial: new Date(),
    },
    {
      name: "location",
      type: "input",
      message: "Where will this event take place?",
      validate: (value) => {
        if (value.length) {
          return true;
        }
        return "Please enter a valid location for your event!";
      },
    },
    {
      name: "image",
      type: "input",
      message: "Image URL for your event (leave blank for null):",
      default() {
        return null;
      },
    },
    {
      name: "descriptions",
      type: "input",
      message:
        "Enter event description paragraphs, separated by a `|` (leave blank for null):",
      filter: (input) => {
        const arr = input.split("|").map((item) => item.trim());
        return arr.length === 0 ? "" : arr;
      },
    },
  ]);

  const eventName = eventDetails.name;
  const organizerEmail = eventDetails.organizerEmail;
  const eventTime = eventDetails.eventTime;
  const location = eventDetails.location;
  const image = eventDetails.image;
  const descriptions = eventDetails.descriptions;

  console.log(`Image: ${image}, descriptions: ${typeof descriptions}`);
  console.log(typeof descriptions);

  const requestBody = {
    eventName: eventName,
    organizerEmail: organizerEmail,
    eventTime: eventTime.toISOString(),
    location: location,
  };

  if (image) requestBody.image = image;
  if (descriptions[0] !== "") requestBody.descriptions = descriptions;

  console.log("Check your new event details.");
  console.table(requestBody);

  const proceed = await inquirer.prompt({
    type: "confirm",
    name: "yesNo",
    message: "Do you want to continue?",
    validate: (input) => {
      if (input === "y" || input === "n") {
        return true;
      }
      return "Please enter either 'y' or 'n' to confirm.";
    },
  });

  const confirmed = proceed.yesNo;

  if (confirmed) {
    console.log("Sending POST request to server...");
    const response = await postNewEvent(url, xApiKey, requestBody);
    return { status: "posted", data: response };
  } else {
    console.log("Cancelling POST request...");
    return { status: "canceled" };
  }
}
export async function postNewEvent(url, xApiKey, eventRequestBody) {
  const response = await axios
    .post(`${url}/event`, eventRequestBody, {
      headers: {
        "x-api-key": xApiKey,
        origin: "localhost",
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
  return response;
}

// PUT event
export async function putEventHandler(url, xApiKey) {
  const eventDetails = await inquirer.prompt([
    {
      name: "eventID",
      type: "input",
      message: "What is the ID (integer) of the event you want to update?",
      validate: (value) => {
        return Number.isInteger(Number(value))
          ? true
          : "Please enter a valid integer for your event ID!";
      },
    },
    {
      name: "fieldName",
      type: "list",
      message: "What is the field you want to update?",
      choices: [
        "eventName",
        "organizerEmail",
        "eventTime",
        "location",
        "image",
      ],
      default() {
        return "eventName";
      },
    },
    {
      type: "input",
      name: "fieldValue",
      message: "Enter the value you want to update the field with:",
      validate: (value) => {
        if (value.length) {
          return true;
        }
        return "Please enter a valid value!";
      },
    },
  ]);

  const eventID = Number(eventDetails.eventID);
  const fieldName = eventDetails.fieldName;
  const value = eventDetails.fieldValue;

  const requestBody = {
    eventID: eventID,
    eventDetail: {
      [fieldName]: value,
    },
  };

  console.log("Check your update event details.");
  console.log(requestBody);

  const proceed = await inquirer.prompt({
    type: "confirm",
    name: "yesNo",
    message: "Do you want to continue?",
    validate: (input) => {
      if (input === "y" || input === "n") {
        return true;
      }
      return "Please enter either 'y' or 'n' to confirm.";
    },
  });

  const confirmed = proceed.yesNo;

  if (confirmed) {
    console.log("Sending PUT request to server...");
    const response = await putEvent(url, xApiKey, requestBody);
    return { status: "put", data: response };
  } else {
    console.log("Cancelling PUT request...");
    return { status: "canceled" };
  }
}
export async function putEvent(url, xApiKey, requestBody) {
  const response = await axios
    .put(`${url}/event`, requestBody, {
      headers: {
        "x-api-key": xApiKey,
        origin: "localhost",
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
  return response;
}

// DELETE event
export async function deleteEventHandler(url, xApiKey) {
  const eventDetails = await inquirer.prompt([
    {
      name: "eventID",
      type: "input",
      message: "What is the ID (integer) of the event you want to delete?",
      validate: (value) => {
        return Number.isInteger(Number(value))
          ? true
          : "Please enter a valid integer for your event ID!";
      },
    },
  ]);

  const eventID = Number(eventDetails.eventID);

  const proceed = await inquirer.prompt({
    type: "confirm",
    name: "yesNo",
    message: `Are you sure you want to delete event with ID = ${eventID}?`,
    validate: (input) => {
      if (input === "y" || input === "n") {
        return true;
      }
      return "Please enter either 'y' or 'n' to confirm.";
    },
  });

  const confirmed = proceed.yesNo;

  if (confirmed) {
    console.log("Sending DELETE request to server...");
    const response = await deleteEvent(url, xApiKey, eventID);
    return { status: "deleted", data: response };
  } else {
    console.log("Cancelling DELTE request...");
    return { status: "canceled" };
  }
}
export async function deleteEvent(url, xApiKey, eventId) {
  const response = await axios
    .delete(`${url}/event?event_id=${eventId}`, {
      headers: {
        "x-api-key": xApiKey,
        origin: "localhost",
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
  return response;
}
