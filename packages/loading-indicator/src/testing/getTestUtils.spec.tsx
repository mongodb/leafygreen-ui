import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { Spinner } from '../Spinner';

import { getTestUtils } from './getTestUtils';

describe('packages/loading-spinner/getTestUtils', () => {
  describe('single Spinner', () => {
    test('findSpinner', async () => {
      render(<Spinner />);
      const { findSpinner } = getTestUtils();

      await waitFor(async () => {
        const spinner = await findSpinner();
        expect(spinner).toBeInTheDocument();
      });
    });

    test('getSpinner', () => {
      render(<Spinner />);
      const { getSpinner } = getTestUtils();

      expect(getSpinner()).toBeInTheDocument();
    });

    test('querySpinner', () => {
      render(<div />);
      const { querySpinner } = getTestUtils();

      expect(querySpinner()).toBeNull();
    });

    test('querySpinner returns element when it exists', () => {
      render(<Spinner />);
      const { querySpinner } = getTestUtils();

      expect(querySpinner()).toBeInTheDocument();
    });
  });

  describe('multiple Spinner instances', () => {
    test('getSpinner with custom lgId', () => {
      render(
        <>
          <Spinner data-lgid="lg-spinner-1" />
          <Spinner data-lgid="lg-spinner-2" />
        </>,
      );

      const utilsOne = getTestUtils('lg-spinner-1');
      const utilsTwo = getTestUtils('lg-spinner-2');

      expect(utilsOne.getSpinner()).toBeInTheDocument();
      expect(utilsTwo.getSpinner()).toBeInTheDocument();
      expect(utilsOne.getSpinner()).not.toBe(utilsTwo.getSpinner());
    });
  });
});
