import React from 'react';
import { render } from '@testing-library/react';

import { Basic } from './useAutoScroll.story';
import { testItemHeight } from './constants.test';

describe('packages/hooks/useAutoScroll', () => {
  test('Initially at the top', async () => {
    const { getByTestId, rerender } = render(<Basic selected={0} />);
    const menu = getByTestId('menu');
    expect(menu.scrollTop).toBe(0);

    rerender(<Basic selected={5} />);

    setTimeout(() => {
      expect(menu.scrollTop).toBe(5 * testItemHeight);
    }, 100);
  });
});
