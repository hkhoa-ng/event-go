import { createContext, useState } from 'react';
import axios from 'axios';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [allEvents, setAllEvents] = useState();
  const [availableTags, setAvailableTags] = useState();

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
  const getAllEvents = () => {
    // Get all events (excluding tags and tickets)
    axios
      .get(`${url}/events`, config)
      .then(res => {
        setAllEvents(
          res.data.events.map(event => {
            const currTags = [];
            const currTickets = [];

            // Get tags of events
            axios
              .get(`${url}/event/tag?event_id=${event.event_id}`, config)
              .then(res => {
                if (Array.isArray(res.data)) {
                  currTags.push(...res.data);
                }
              })
              .catch(err => {
                console.error(
                  `Error when getting tags at ID = ${event.event_id}: ${err}`
                );
              });

            // Get tickets of events
            axios
              .get(`${url}/event/ticket?event_id=${event.event_id}`, config)
              .then(res => {
                if (Array.isArray(res.data)) {
                  currTickets.push(...res.data);
                }
              })
              .catch(err => {
                console.error(
                  `Error when getting tickets at ID = ${event.event_id}: ${err}`
                );
              });

            const eventWithTagsAndTickets = {
              ...event,
              tags: currTags,
              tickets: currTickets,
            };
            return eventWithTagsAndTickets;
          })
        );
      })
      .catch(err => {
        console.error(`Error when attempt to get all events: ${err}`);
      });
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

  const getEventInfo = () => {
    // TODO: get full event information based on ID
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
