import { createContext, useState } from 'react';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [allEvents, setAllEvents] = useState();
  const url =
    'https://khoa-nguyen-cors-anywhere.fly.dev/https://a1fzt90jn3.execute-api.eu-central-1.amazonaws.com/production';

  const getAllEvents = () => {
    // TODO: fetch from API
    fetch(`${url}/events`, {
      method: 'GET',
      headers: {
        'x-api-key': 'yXBR9GfkSj2mfLIBqSfAL7gpJIiCiKrM1MMcNcgN',
      },
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setAllEvents(
          data.events.map(event => {
            // Fetch the tags of current event
            const tags = fetch(`${url}/events/tag`, {
              method: 'GET',
              headers: {
                'x-api-key': 'yXBR9GfkSj2mfLIBqSfAL7gpJIiCiKrM1MMcNcgN',
              },
              body: {
                eventID: event.event_id,
              },
            })
              .then(res => res.json())
              .then(tags => tags)
              .catch(err =>
                console.log(`Error while fetching tags of event: ${err}`)
              );

            // Fetch the ticket of current event
            const tickets = fetch(`${url}/events/ticket`, {
              method: 'GET',
              headers: {
                'x-api-key': 'yXBR9GfkSj2mfLIBqSfAL7gpJIiCiKrM1MMcNcgN',
              },
              body: {
                eventID: event.event_id,
              },
            })
              .then(res => res.json())
              .then(tags => tags)
              .catch(err =>
                console.log(`Error while fetching tickets of event: ${err}`)
              );

            const eventWithTagsAndTickets = {
              ...event,
              tags: tags,
              tickets: tickets,
            };
            return eventWithTagsAndTickets;
          })
        );
      })
      .catch(err => console.log(`Error while fetching all event data: ${err}`));
  };

  const getEventInfo = () => {
    // TODO: get full event information based on ID
  };

  return (
    <EventContext.Provider value={{ allEvents, getAllEvents, url }}>
      {children}
    </EventContext.Provider>
  );
}

export default EventContext;
