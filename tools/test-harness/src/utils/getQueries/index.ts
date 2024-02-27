import { getQueriesForElement } from '@testing-library/dom';

import * as defaultQueries from '../../queries';
import { getDocument } from '../getDocument';

const baseElement = getDocument();

// FIXME:
// @ts-expect-error
const queriesForElements = getQueriesForElement(baseElement, defaultQueries);

const { getByTestId: getByLgId, findByTestId: findByLgId } = queriesForElements;

export { findByLgId, getByLgId };
