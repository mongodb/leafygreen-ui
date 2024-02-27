import { getQueriesForElement } from '@testing-library/dom';

import * as defaultQueries from '../../queries';
// import { getDocument } from '../getDocument';

// const baseElement = getDocument();

const queriesForElements = getQueriesForElement(
  document.body,
  // FIXME:
  // @ts-expect-error
  defaultQueries,
);

const { getByTestId: getByLgId, findByTestId: findByLgId } = queriesForElements;

export { findByLgId, getByLgId };
