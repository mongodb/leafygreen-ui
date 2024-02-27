import React from 'react';
import { render } from '@testing-library/react';

import { findByLgId } from '.';

describe('findByLgId', () => {
  // test('gets element with id', async () => {
  //   render(<div data-lgid="testing-id">Children 1</div>);
  //   const element = await findByLgId('testing-id');
  //   expect(element).toBeInTheDocument();
  // });
  // test('throws error if the id does not exist', async () => {
  //   render(
  //     <>
  //       <div data-lgid="testing">Children 2</div>
  //     </>,
  //   );
  //   await expect(findByLgId('testing-id')).rejects.toThrow(
  //     'Unable to find an element by [data-lgid="testing-id"]',
  //   );
  // });
  // test('throws error if the id is found multiple times', async () => {
  //   render(
  //     <>
  //       <div data-lgid="testing-id">Children 3</div>
  //       <div data-lgid="testing-id">Children 4</div>
  //     </>,
  //   );
  //   await expect(findByLgId('testing-id')).rejects.toThrow(
  //     'Found multiple elements by [data-lgid="testing-id"]',
  //   );
  // });
  // test.todo('no document found');
});
