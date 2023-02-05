import axios from "axios";

export async function getTicketsByEventId(url, fetchOptions, eventId) {
  return axios
    .get(`${url}/event/ticket?event_id=${eventId}`, fetchOptions)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      // console.log(`Error while fetching tickets of event: ${err}`);
      return [];
    });
}
