import { createContext, useState } from 'react';
import axios from 'axios';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [allEvents, setAllEvents] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  const url =
    'https://khoa-nguyen-cors-anywhere.fly.dev/https://a1fzt90jn3.execute-api.eu-central-1.amazonaws.com/production';
  // 'https://a1fzt90jn3.execute-api.eu-central-1.amazonaws.com/production';
  const xApiKey = 'DUBwlix96T5zt3M7tOnJ7ilJt6ufVG1436lyXzXh';
  const config = {
    headers: {
      'x-api-key': xApiKey,
      'Content-Type': 'application/json',
    },
  };

  // Attempt to get all events with their tickets and tags
  const getAllEvents = async () => {
    try {
      // Get all events (excluding tags and tickets)
      const res = await axios.get(`${url}/events`, config);
      const all = res.data.events.map(async event => {
        const currTags = [];
        const currTickets = [];

        // Get tags of events
        try {
          const tagsRes = await axios.get(
            `${url}/event/tag?event_id=${event.event_id}`,
            config
          );
          if (Array.isArray(tagsRes.data)) {
            currTags.push(...tagsRes.data);
          }
        } catch (err) {
          console.error(
            `Error when getting tags at ID = ${event.event_id}: ${err}`
          );
        }

        // Get tickets of events
        try {
          const ticketsRes = await axios.get(
            `${url}/event/ticket?event_id=${event.event_id}`,
            config
          );
          if (Array.isArray(ticketsRes.data)) {
            currTickets.push(...ticketsRes.data);
          }
        } catch (err) {
          console.error(
            `Error when getting tickets at ID = ${event.event_id}: ${err}`
          );
        }

        const eventWithTagsAndTickets = {
          ...event,
          tags: currTags,
          tickets: currTickets,
        };
        return eventWithTagsAndTickets;
      });

      // Wait for all events to be processed before setting state
      setAllEvents(await Promise.all(all));
    } catch (err) {
      console.error(`Error when attempt to get all events: ${err}`);
    }
  };

  // Attempt to get all available tags
  const getAvailableTags = () => {
    axios
      .get(`${url}/available-tags`, config)
      .then(res => {
        setAvailableTags(res.data);
      })
      .catch(err => {
        console.error(`Error while getting available tags: ${err}`);
      });
  };

  // Get all events of a tag
  const getEventsByTag = async tag => {
    try {
      const res = await axios.get(`${url}/tag-events?tag_name=${tag}`, config);
      return res.data;
    } catch (err) {
      console.error(`Error when getting events of tag ${tag}: ${err}`);
    }
  };

  return (
    <EventContext.Provider
      value={{
        allEvents,
        getAllEvents,
        getAvailableTags,
        availableTags,
        url,
        getEventsByTag,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export default EventContext;
