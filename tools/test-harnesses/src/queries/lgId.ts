/**
 * The majority of the code is copied from [dom-testing-library](https://github.com/testing-library/dom-testing-library/blob/bd04cf95a1ed85a2238f7dfc1a77d5d16b4f59dc/src/queries/test-id.ts).
 *
 * [Testing Library](https://testing-library.com/docs/dom-testing-library/api-configuration) provides a way to globally change the testIdAttribute but, unfortunately, it does not suit our needs. We prefer not to modify the testIdAttribute globally as it would impact all tests across the entire repository.
 *
 * As an alternative, we're importing the `buildQueries` function directly from [dom-testing-library](https://github.com/testing-library/dom-testing-library/blob/bd04cf95a1ed85a2238f7dfc1a77d5d16b4f59dc/src/queries/test-id.ts) and assigning our custom testing id, `data-lgid`, to it.
 */

import {
  AllByBoundAttribute,
  buildQueries,
  GetErrorFunction,
  queryAllByAttribute,
} from '@testing-library/dom';

import { checkContainerType } from '../utils/checkContainerType';

const testIdAttribute = 'data-lgid';

const queryAllByTestId: AllByBoundAttribute = (...args) => {
  checkContainerType(args[0]);
  return queryAllByAttribute(testIdAttribute, ...args);
};

const getMultipleError: GetErrorFunction<[unknown]> = (c, id) =>
  `Found multiple elements by: [${testIdAttribute}="${id}"]`;
const getMissingError: GetErrorFunction<[unknown]> = (c, id) =>
  `Unable to find an element by: [${testIdAttribute}="${id}"]`;

const [
  queryByTestId,
  getAllByTestId,
  getByTestId,
  findAllByTestId,
  findByTestId,
] = buildQueries(queryAllByTestId, getMultipleError, getMissingError);

export {
  findAllByTestId,
  findByTestId,
  getAllByTestId,
  getByTestId,
  queryAllByTestId,
  queryByTestId,
};
