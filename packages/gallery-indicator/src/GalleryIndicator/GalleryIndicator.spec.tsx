import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { GalleryIndicator, GalleryIndicatorProps } from '.';
import { LGIDS } from '../constants';
import { getTestUtils } from '../utils/getTestUtils/getTestUtils';

function renderGalleryIndicator({
  count = 4,
  activeIndex = 0,
  ...props
}: Partial<GalleryIndicatorProps>) {
  const utils = render(
    <GalleryIndicator
      data-testid={LGIDS.root}
      count={count}
      activeIndex={activeIndex}
      {...props}
    />,
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
      const { getIndicatorCount } = renderGalleryIndicator({ count: 4 });
      expect(getIndicatorCount()).toBe(4);
    });

    test('the correct indicator is active', () => {
      const { getActiveIndex } = renderGalleryIndicator({
        count: 4,
        activeIndex: 2,
      });
      expect(getActiveIndex()).toBe(2);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error missing count, activeIndex */}
      <GalleryIndicator />

      {/* @ts-expect-error missing activeIndex */}
      <GalleryIndicator count={1} />

      {/* @ts-expect-error missing activeIndex */}
      <GalleryIndicator activeIndex={1} />

      <GalleryIndicator activeIndex={1} count={4} />
    </>;
  });
});
