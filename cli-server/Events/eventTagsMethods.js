import axios from "axios";

export async function getTagsByEventId(url, fetchOptions, eventId) {
  return axios
    .get(`${url}/event/tag?event_id=${eventId}`, fetchOptions)
    .then((res) => res.data)
    .catch((err) => {
      // console.log(`Error while fetching tags of event: ${err}`);
      return [];
    });
}
