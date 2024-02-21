export const getError = (message: string) => {
  const error = Error(message);
  error.name = 'LeafyGreen';

  return error;
};
