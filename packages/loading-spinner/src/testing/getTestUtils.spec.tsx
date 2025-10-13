import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { LoadingSpinner } from '../LoadingSpinner';

import { getTestUtils } from './getTestUtils';

describe('packages/loading-spinner/getTestUtils', () => {
  describe('single LoadingSpinner', () => {
    test('findLoadingSpinner', async () => {
      render(<LoadingSpinner />);
      const { findLoadingSpinner } = getTestUtils();

      await waitFor(async () => {
        const spinner = await findLoadingSpinner();
        expect(spinner).toBeInTheDocument();
      });
    });

    test('getLoadingSpinner', () => {
      render(<LoadingSpinner />);
      const { getLoadingSpinner } = getTestUtils();

      expect(getLoadingSpinner()).toBeInTheDocument();
    });

    test('queryLoadingSpinner', () => {
      render(<div />);
      const { queryLoadingSpinner } = getTestUtils();

      expect(queryLoadingSpinner()).toBeNull();
    });

    test('queryLoadingSpinner returns element when it exists', () => {
      render(<LoadingSpinner />);
      const { queryLoadingSpinner } = getTestUtils();

      expect(queryLoadingSpinner()).toBeInTheDocument();
    });
  });

  describe('multiple LoadingSpinner instances', () => {
    test('getLoadingSpinner with custom lgId', () => {
      render(
        <>
          <LoadingSpinner data-lgid="lg-spinner-1" />
          <LoadingSpinner data-lgid="lg-spinner-2" />
        </>,
      );

      const utilsOne = getTestUtils('lg-spinner-1');
      const utilsTwo = getTestUtils('lg-spinner-2');

      expect(utilsOne.getLoadingSpinner()).toBeInTheDocument();
      expect(utilsTwo.getLoadingSpinner()).toBeInTheDocument();
      expect(utilsOne.getLoadingSpinner()).not.toBe(
        utilsTwo.getLoadingSpinner(),
      );
    });
  });
});
