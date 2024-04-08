import { getQueriesForElement } from '@testing-library/dom';

import * as defaultQueries from '../../queries';
import { getDocument } from '../getDocument';

function getBaseQueries() {
  const baseElement = getDocument();

  if (!baseElement) {
    return {
      findByLgId: undefined,
      getByLgId: undefined,
      queryByLgId: undefined,
    };
  }

  // Following [react-testing-library](https://github.com/testing-library/react-testing-library/blob/edb6344d578a8c224daf0cd6e2984f36cc6e8d86/src/pure.js#L195)
  const {
    findByTestId: findByLgId,
    getByTestId: getByLgId,
    queryByTestId: queryByLgId,
  } = getQueriesForElement(
    baseElement.body,
    // @ts-expect-error: `getQueriesForElement` is expecting all the queries outlined in this [file](https://github.com/testing-library/dom-testing-library/blob/main/types/get-queries-for-element.d.ts) but we're only passing in testid queries.
    defaultQueries,
  );

  return {
    findByLgId,
    getByLgId,
    queryByLgId,
  } as const;
}

const lgQueries = getBaseQueries();
export { lgQueries };
