// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
// This is a RFC4122 version 4 compliant solution that solves that issue by offsetting the first 13 hex numbers by a hex portion of the timestamp, and once depleted offsets by a hex portion of the microseconds since pageload.
// That way, even if Math.random is on the same seed, both clients would have to generate the UUID the exact same number of microseconds since pageload (if high-perfomance time is supported) AND at the exact same millisecond (or 10,000+ years later) to get the same UUID:

const generateUUID = () => {
  let date1 = new Date().getTime(),
    date2 = (performance && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx'.replace(/[xy]/g, char => {
    let rand = Math.random() * 16;
    if (date1 > 0) {
      rand = (date1 + rand) % 16 | 0;
      date1 = Math.floor(date1 / 16);
    } else {
      rand = (date2 + rand) % 16 | 0;
      date2 = Math.floor(date2 / 16);
    }
    return (char == 'x' ? rand : (rand & 0x7) | 0x8).toString(16);
  });
};

const createUniqueClassName = () => {
  return `lg-ui-${generateUUID()}`;
};

export default createUniqueClassName;
