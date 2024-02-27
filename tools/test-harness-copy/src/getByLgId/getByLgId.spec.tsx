/* eslint-disable jest/no-disabled-tests */
import React from 'react';
import { render } from '@testing-library/react';

import { getByLgId } from '.';

describe('getByLgId', () => {
  test('gets element with id', () => {
    render(<div data-lgid="testing-id">Children 1</div>);
    const element = getByLgId('testing-id');
    expect(element).toBeInTheDocument();
  });

  test('second', () => {
    expect(document.body).toBeEmptyDOMElement();
  });

  test('throws error if the id does not exist', () => {
    render(
      <>
        <div data-lgid="testing">Children</div>
      </>,
    );

    expect(() => {
      getByLgId('testing-id');
    }).toThrow('Unable to find an element by [data-lgid="testing-id"]');
  });

  test('throws error if the id is found multiple times', () => {
    render(
      <>
        <div data-lgid="testing-id">Children</div>
        <div data-lgid="testing-id">Children</div>
      </>,
    );

    expect(() => {
      getByLgId('testing-id');
    }).toThrow('Found multiple elements by [data-lgid="testing-id"]');
  });

  test.todo('no document found');
});
