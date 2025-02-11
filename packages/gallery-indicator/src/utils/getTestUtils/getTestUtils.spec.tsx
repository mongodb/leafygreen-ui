import React from 'react';
import { render } from '@testing-library/react';
import {
  GalleryIndicatorProps,
  GalleryIndicator,
} from '../../GalleryIndicator';

import { getTestUtils } from './getTestUtils';

function renderGalleryIndicator({
  count = 4,
  activeIndex = 0,
  ...rest
}: Partial<GalleryIndicatorProps>) {
  const utils = render(
    <GalleryIndicator count={count} activeIndex={activeIndex} {...rest} />,
  );

  return {
    ...utils,
  };
}

function renderMultipleGalleryIndicator() {
  const utils = render(
    <>
      <GalleryIndicator
        data-lgid="lg-gallery_indicator-1"
        count={5}
        activeIndex={0}
      />
      <GalleryIndicator
        data-lgid="lg-gallery_indicator-2"
        count={4}
        activeIndex={1}
      />
    </>,
  );

  return {
    ...utils,
  };
}

describe('packages/tabs/getTestUtils', () => {
  test('throws error if tabs is not found', () => {
    try {
      renderGalleryIndicator({ 'data-lgid': 'lg-different-id' });
      const _utils = getTestUtils();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        expect.stringMatching(
          /Unable to find an element by: \[data-lgid="lg-gallery_indicator"\]/,
        ),
      );
    }
  });

  describe('single gallery indicator', () => {
    describe('getIndicatorCount', () => {
      test('returns the correct number of indicators', () => {
        renderGalleryIndicator({});
        const { getIndicatorCount } = getTestUtils();
        const indicatorCount = getIndicatorCount();
        expect(indicatorCount).toBe(4);
      });
    });

    describe('getActiveIndex', () => {
      test('returns the active index', () => {
        renderGalleryIndicator({});
        const { getActiveIndex } = getTestUtils();
        const activeIndex = getActiveIndex();
        expect(activeIndex).toBe(0);
      });
    });
  });

  describe('multiple gallery indicators', () => {
    test('returns the correct number of indicators for each gallery indicator', () => {
      renderMultipleGalleryIndicator();
      const testUtils1 = getTestUtils('lg-gallery_indicator-1');
      const testUtils2 = getTestUtils('lg-gallery_indicator-2');

      expect(testUtils1.getIndicatorCount()).toBe(5);
      expect(testUtils2.getIndicatorCount()).toBe(4);
    });

    test('returns the correct active index for each gallery indicator', () => {
      renderMultipleGalleryIndicator();
      const testUtils1 = getTestUtils('lg-gallery_indicator-1');
      const testUtils2 = getTestUtils('lg-gallery_indicator-2');

      expect(testUtils1.getActiveIndex()).toBe(0);
      expect(testUtils2.getActiveIndex()).toBe(1);
    });
  });
});
