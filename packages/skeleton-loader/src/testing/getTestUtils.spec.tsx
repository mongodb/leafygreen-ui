import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { Skeleton } from '../Skeleton';

import { getTestUtils } from './getTestUtils';

describe('packages/skeleton-loader/getTestUtils', () => {
  describe('single SkeletonLoader', () => {
    test('findSkeletonLoader', async () => {
      render(<Skeleton />);
      const { findSkeletonLoader } = getTestUtils();

      await waitFor(async () => {
        const skeletonLoader = await findSkeletonLoader();
        expect(skeletonLoader).toBeInTheDocument();
      });
    });

    test('getSkeletonLoader', () => {
      render(<Skeleton />);
      const { getSkeletonLoader } = getTestUtils();

      expect(getSkeletonLoader()).toBeInTheDocument();
    });

    test('querySkeletonLoader', () => {
      render(<div />);
      const { querySkeletonLoader } = getTestUtils();

      expect(querySkeletonLoader()).toBeNull();
    });

    test('querySkeletonLoader returns element when it exists', () => {
      render(<Skeleton />);
      const { querySkeletonLoader } = getTestUtils();

      expect(querySkeletonLoader()).toBeInTheDocument();
    });
  });

  describe('multiple SkeletonLoader instances', () => {
    test('getSkeletonLoader with custom lgId', () => {
      render(
        <>
          <Skeleton data-lgid="lg-skeleton_loader-1" />
          <Skeleton data-lgid="lg-skeleton_loader-2" />
        </>,
      );

      const utilsOne = getTestUtils('lg-skeleton_loader-1');
      const utilsTwo = getTestUtils('lg-skeleton_loader-2');

      expect(utilsOne.getSkeletonLoader()).toBeInTheDocument();
      expect(utilsTwo.getSkeletonLoader()).toBeInTheDocument();
      expect(utilsOne.getSkeletonLoader()).not.toBe(
        utilsTwo.getSkeletonLoader(),
      );
    });
  });
});
