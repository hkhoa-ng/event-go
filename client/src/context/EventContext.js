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
        setAllEvents(
          data.events.map(event => {
            // Fetch the tags of current event
            const eventTags = [];
            const eventTickets = [];
            fetch(`${url}/event/tag?event_id=${event.event_id}`, {
              method: 'GET',
              headers: {
                'x-api-key': 'yXBR9GfkSj2mfLIBqSfAL7gpJIiCiKrM1MMcNcgN',
              },
            })
              .then(res => res.json())
              .then(tags => {
                tags.forEach(tag => {
                  eventTags.push(tag);
                });
              })
              .catch(err =>
                console.log(`Error while fetching tags of event: ${err}`)
              );

            // Fetch the ticket of current event
            const tickets = fetch(
              `${url}/event/ticket?event_id=${event.event_id}`,
              {
                method: 'GET',
                headers: {
                  'x-api-key': 'yXBR9GfkSj2mfLIBqSfAL7gpJIiCiKrM1MMcNcgN',
                },
              }
            )
              .then(res => res.json())
              .then(tickets => {
                tickets.forEach(ticket => {
                  eventTickets.push(ticket);
                });
              })
              .catch(err =>
                console.log(`Error while fetching tickets of event: ${err}`)
              );

            const eventWithTagsAndTickets = {
              ...event,
              tags: eventTags,
              tickets: eventTickets,
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
