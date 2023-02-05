import axios from "axios";
import { getTagsByEventId } from "./eventTagsMethods.js";
import { getTicketsByEventId } from "./eventTicketsMethods.js";

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
        const tags = await getTagsByEventId(url, fetchOptions, event.event_id);
        if (tags === undefined) {
          console.log(`No tags for event with ID = ${event.event_id}!`);
        } else {
          currentEvent.tags = tags;
        }

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
