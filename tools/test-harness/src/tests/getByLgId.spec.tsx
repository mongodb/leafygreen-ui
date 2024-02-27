import React from 'react';
import { render } from '@testing-library/react';

import { getDocument } from '../utils/getDocument';
import { getByLgId } from '../utils/getQueries';

describe('getByLgId', () => {
  test.skip('gets element with id', () => {
    const { debug } = render(<div data-lgid="testing-id">test 1</div>);
    debug(getByLgId('testing-id'));
    const element = getByLgId('testing-id');
    expect(element).toBeInTheDocument();
  });

  test('clears the DOM', () => {
    expect(document.body).toBeEmptyDOMElement();
  });

  test('throws error if the id does not exist', () => {
    const { debug } = render(
      <>
        <div data-lgid="testing">test 2</div>
      </>,
      { container: getDocument().body },
    );

    // expect(document.body).toBeEmptyDOMElement();

    debug(getByLgId('testing-id'));

    const el = getByLgId('testing-id');

    expect(el).toBeInTheDocument();

    // expect(() => {
    //   getByLgId('testing-id');
    // }).toThrow('Unable to find an element by: [data-lgid="testing-id"]');
  });

  test.skip('throws error if the id is found multiple times', () => {
    render(
      <>
        <div data-lgid="testing-id">Children</div>
        <div data-lgid="testing-id">Children</div>
      </>,
    );

    expect(() => {
      getByLgId('testing-id');
    }).toThrow('Found multiple elements by: [data-lgid="testing-id"]');
  });

  test.todo('no document found');
});
