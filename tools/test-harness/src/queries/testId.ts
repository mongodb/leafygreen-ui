import {
  AllByBoundAttribute,
  buildQueries,
  GetErrorFunction,
  queryAllByAttribute,
} from '@testing-library/dom';

import { checkContainerType } from '../utils/checkContainerType';

// TODO: move this to utils?
const getTestIdAttribute = () => 'data-lgid';

const queryAllByTestId: AllByBoundAttribute = (...args) => {
  checkContainerType(args[0]);
  return queryAllByAttribute(getTestIdAttribute(), ...args);
};

const getMultipleError: GetErrorFunction<[unknown]> = (c, id) =>
  `Found multiple elements by: [${getTestIdAttribute()}="${id}"]`;
const getMissingError: GetErrorFunction<[unknown]> = (c, id) =>
  `Unable to find an element by: [${getTestIdAttribute()}="${id}"]`;

// const queryAllByTestIdWithSuggestions = wrapAllByQueryWithSuggestion<
//   // @ts-expect-error -- See `wrapAllByQueryWithSuggestion` Argument constraint comment
//   [testId: Matcher, options?: MatcherOptions]
// >(queryAllByTestId, queryAllByTestId.name, 'queryAll')

const [
  queryByTestId,
  getAllByTestId,
  getByTestId,
  findAllByTestId,
  findByTestId,
] = buildQueries(queryAllByTestId, getMultipleError, getMissingError);

export {
  // findAllByTestId,
  findByTestId,
  // getAllByTestId,
  getByTestId,
  // queryAllByTestIdWithSuggestions as queryAllByTestId,
  // queryAllByTestId,
  // queryByTestId,
};
