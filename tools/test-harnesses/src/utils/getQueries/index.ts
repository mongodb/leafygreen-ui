import { getQueriesForElement } from '@testing-library/dom';

import * as defaultQueries from '../../queries';
import { getDocument } from '../getDocument';

const baseElement = getDocument();

let findByLgId;
let getByLgId;
let queryByLgId;

if (baseElement) {
  // Following [react-testing-library](https://github.com/testing-library/react-testing-library/blob/edb6344d578a8c224daf0cd6e2984f36cc6e8d86/src/pure.js#L195)
  const queriesForElements = getQueriesForElement(
    baseElement.body,
    // @ts-expect-error: `getQueriesForElement` is expecting all the queries outlined in this [file](https://github.com/testing-library/dom-testing-library/blob/main/types/get-queries-for-element.d.ts) but we're only passing in testid queries.
    defaultQueries,
  );

  const { findByTestId, getByTestId, queryByTestId } = queriesForElements;

  findByLgId = findByTestId;
  getByLgId = getByTestId;
  queryByLgId = queryByTestId;
}

const lgQueries = { findByLgId, getByLgId, queryByLgId } as const;

export { lgQueries };
