import { getQueriesForElement } from '@testing-library/dom';

import * as defaultQueries from '../../queries';
import { getDocument } from '../getDocument';

const baseElement = getDocument();

const queriesForElements = getQueriesForElement(
  baseElement.body,
  // @ts-expect-error: `getQueriesForElement` is expecting all the queries outlined in this [file](https://github.com/testing-library/dom-testing-library/blob/main/types/get-queries-for-element.d.ts) but we're only passing in testid queries.
  defaultQueries,
);

const { getByTestId: getByLgId, findByTestId: findByLgId } = queriesForElements;

export { findByLgId, getByLgId };
