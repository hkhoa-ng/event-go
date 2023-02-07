import axios from "axios";
import inquirer from "inquirer";

export async function chooseTagMethod() {
  const tagMethods = () =>
    inquirer
      .prompt([
        {
          type: "expand",
          message: "Choose a method:",
          name: "method",
          choices: [
            {
              key: "g",
              name: "Tag: GET all tags from an event.",
              value: "get",
            },
            {
              key: "p",
              name: "Tag: POST (add) tags to an event.",
              value: "post",
            },
            {
              key: "u",
              name: "Tag: PUT (update) tags to an event.",
              value: "put",
            },
            {
              key: "d",
              name: "Tag: DELETE tags from an event.",
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

  return await tagMethods();
}

export async function actionBasedOnTagMethod(tagMethod, url, xApiKey) {
  switch (tagMethod) {
    case "get":
      const getResponse = await getTagsHandler(url, xApiKey);
      return getResponse;

    case "post":
      const postResponse = await postNewTagHandler(url, xApiKey);
      return postResponse;

    case "put":
      const putResponse = await putTagHandler(url, xApiKey);
      return putResponse;

    case "delete":
      const deleteResponse = await deleteTagHandler(url, xApiKey);
      return deleteResponse;

    case "quit":
      return { status: "cancelled" };

    default:
      console.log("Invalid method!");
      break;
  }
}

// GET tags
async function getTagsHandler(url, xApiKey) {
  const details = await inquirer.prompt([
    {
      name: "eventId",
      type: "input",
      message: "What is the ID (integer) of the event you want to get?",
      validate: (value) => {
        return Number.isInteger(Number(value))
          ? true
          : "Please enter a valid integer for your event ID!";
      },
    },
  ]);

  const eventId = Number(details.eventId);

  const tags = await getTagsByEventId(url, xApiKey, eventId);
  return { status: "got", data: tags };
}
export async function getTagsByEventId(url, xApiKey, eventId) {
  return axios
    .get(`${url}/event/tag?event_id=${eventId}`, {
      headers: {
        origin: "localhost",
        "x-api-key": xApiKey,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      // console.log(`Error while fetching tags of event: ${err}`);
      return [];
    });
}

// POST tags
async function postNewTagHandler(url, xApiKey) {
  const details = await inquirer.prompt([
    {
      name: "eventId",
      type: "input",
      message:
        "What is the ID (integer) of the event you want to post a new tag to?",
      validate: (value) => {
        return Number.isInteger(Number(value))
          ? true
          : "Please enter a valid integer for your event ID!";
      },
    },
    {
      name: "tagName",
      type: "input",
      message: "What is the tag you want to post to this event?",
      validate: (value) => {
        return value.length > 0 ? true : "Please enter a valid tag!";
      },
    },
  ]);

  const eventId = Number(details.eventId);
  const tagName = details.tagName;

  const requestBody = {
    eventID: eventId,
    tagName: tagName,
  };

  console.log("Check your new tag details.");
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
    const response = await postTagsByEventId(url, xApiKey, requestBody);
    return { status: "posted", data: response };
  } else {
    console.log("Cancelling POST request...");
    return { status: "canceled" };
  }
}
export async function postTagsByEventId(url, xApiKey, requestBody) {
  return axios
    .post(`${url}/event/tag`, requestBody, {
      headers: {
        "x-api-key": xApiKey,
        origin: "localhost",
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
}

// PUT tags
async function putTagHandler(url, xApiKey) {
  const details = await inquirer.prompt([
    {
      name: "eventId",
      type: "input",
      message:
        "What is the ID (integer) of the event you want to update its tag?",
      validate: (value) => {
        return Number.isInteger(Number(value))
          ? true
          : "Please enter a valid integer for your event ID!";
      },
    },
    {
      name: "tagName",
      type: "input",
      message: "What is the tag you want to update?",
      validate: (value) => {
        return value.length > 0 ? true : "Please enter a valid tag name!";
      },
    },
    {
      name: "newTagName",
      type: "input",
      message: "What is the new tag name?",
      validate: (value) => {
        return value.length > 0 ? true : "Please enter a valid tag name!";
      },
    },
  ]);

  const requestBody = {
    eventID: Number(details.eventId),
    tagName: details.tagName,
    newTagName: details.newTagName,
  };

  console.log("Check your new tag details.");
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
    console.log("Sending PUT request to server...");
    const response = await putTagByEventId(url, xApiKey, requestBody);
    return { status: "put", data: response };
  } else {
    console.log("Cancelling PUT request...");
    return { status: "canceled" };
  }
}
async function putTagByEventId(url, xApiKey, requestBody) {
  return axios
    .put(`${url}/event/tag`, requestBody, {
      headers: {
        "x-api-key": xApiKey,
        origin: "localhost",
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });
}

// DELETE tags
async function deleteTagHandler(url, xApiKey) {
  const details = await inquirer.prompt([
    {
      name: "eventId",
      type: "input",
      message:
        "What is the ID (integer) of the event you want to delete its tag?",
      validate: (value) => {
        return Number.isInteger(Number(value))
          ? true
          : "Please enter a valid integer for your event ID!";
      },
    },
    {
      name: "tagName",
      type: "input",
      message: "What is the tag you want to delete?",
      validate: (value) => {
        return value.length > 0 ? true : "Please enter a valid tag name!";
      },
    },
  ]);

  const eventId = details.eventId;
  const tagName = details.tagName;

  const proceed = await inquirer.prompt({
    type: "confirm",
    name: "yesNo",
    message: `Are you sure you want to delete the ${tagName} tag from the Event with ID = ${eventId}?`,
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
    const response = await deleteTagByEventId(url, xApiKey, eventId, tagName);
    return { status: "deleted", data: response };
  } else {
    console.log("Cancelling DELETE request...");
    return { status: "canceled" };
  }
}
async function deleteTagByEventId(url, xApiKey, eventId, tagName) {
  const response = await axios
    .delete(`${url}/event/tag?event_id=${eventId}&tag_name=${tagName}`, {
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
