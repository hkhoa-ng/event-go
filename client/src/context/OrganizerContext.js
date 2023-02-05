import { createContext, useState } from 'react';

const OrganizerContext = createContext();

export function OrganizerProvider({ children }) {
  const [allOrganizers, setAllOrganizers] = useState([]);
  const url =
    'https://khoa-nguyen-cors-anywhere.fly.dev/https://a1fzt90jn3.execute-api.eu-central-1.amazonaws.com/production';

  const getAllOrganizers = () => {
    fetch(`${url}/events`, {
      method: 'GET',
      headers: {
        'x-api-key': 'yXBR9GfkSj2mfLIBqSfAL7gpJIiCiKrM1MMcNcgN',
      },
    });
  };

  return (
    <OrganizerContext.Provider value={{ allProviders, getAllEvents, url }}>
      {children}
    </OrganizerContext.Provider>
  );
}

export default OrganizerContext;
