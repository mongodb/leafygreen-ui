// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
// This function returns a randomized 8-character string based on new Date()

const generateUUID = () => {
  let date1 = new Date().getTime();
  return 'xxxxxxxx'.replace(/[x]/g, char => {
    let rand = Math.random() * 16;
    rand = (date1 + rand) % 16 | 0;
    date1 = Math.floor(date1 / 16);
    return (char == 'x' ? rand : (rand & 0x7) | 0x8).toString(16);
  });
};

const createUniqueClassName = (prefix?: string) => {
  return `lg-ui${prefix ? `-${prefix}` : ''}-${generateUUID()}`;
};

export default createUniqueClassName;
