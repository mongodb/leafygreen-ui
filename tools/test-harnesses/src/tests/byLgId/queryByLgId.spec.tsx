import React from 'react';
import { render } from '@testing-library/react';

import { lgQueries } from '../../utils/getQueries';

const { queryByLgId } = lgQueries;

describe('queryByLgId', () => {
  test('gets element with id', () => {
    render(<div data-lgid="testing-id">test 1</div>);
    const element = queryByLgId!('testing-id');
    expect(element).toBeInTheDocument();
  });

  test('returns null if the id does not exist', () => {
    render(
      <>
        <div data-lgid="testing">test 2</div>
      </>,
    );

    expect(queryByLgId!('incorrect-testing-id')).not.toBeInTheDocument();
    expect(queryByLgId!('incorrect-testing-id')).toBeNull();
  });

  test('throws error if the id is found multiple times', () => {
    render(
      <>
        <div data-lgid="testing-id">Children</div>
        <div data-lgid="testing-id">Children</div>
      </>,
    );

    expect(() => {
      queryByLgId!('testing-id');
    }).toThrow('Found multiple elements by: [data-lgid="testing-id"]');
  });
});
