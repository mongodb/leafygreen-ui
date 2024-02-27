/**
 * Util to help generate error messages
 *
 * @param message
 * @returns Error
 */
export const getError = (message: string) => {
  const error = Error(message);
  error.name = 'LeafyGreen';

  // TODO: figure out how to point out the error in the spec file in the console. Currently it points to this file.
  //   1 | export const getError = (message: string) => {
  // > 2 | const error = Error(message);

  // console.log(error.stack);

  return error;
};
