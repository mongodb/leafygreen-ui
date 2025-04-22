import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { getTestUtils } from '../utils/getTestUtils/getTestUtils';

import { GalleryIndicator, GalleryIndicatorProps } from '.';

function renderGalleryIndicator({
  length = 4,
  activeIndex = 0,
  ...props
}: Partial<GalleryIndicatorProps>) {
  const utils = render(
    <GalleryIndicator length={length} activeIndex={activeIndex} {...props} />,
  );

  const testUtils = getTestUtils();

  return {
    ...utils,
    ...testUtils,
  };
}

describe('packages/gallery-indicator', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderGalleryIndicator({});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('GalleryIndicator', () => {
    test('renders the correct number of indicators', () => {
      const { getIndicatorLength } = renderGalleryIndicator({ length: 4 });
      expect(getIndicatorLength()).toBe(4);
    });

    test('the correct indicator is active', () => {
      const { getActiveIndex } = renderGalleryIndicator({
        length: 4,
        activeIndex: 2,
      });
      expect(getActiveIndex()).toBe(2);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error missing length, activeIndex */}
      <GalleryIndicator />

      {/* @ts-expect-error missing activeIndex */}
      <GalleryIndicator length={1} />

      {/* @ts-expect-error missing activeIndex */}
      <GalleryIndicator activeIndex={1} />

      <GalleryIndicator activeIndex={1} length={4} />
    </>;
  });
});
