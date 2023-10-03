import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { InfoSprinkle } from '.';

function renderInfoSprinkle(props = {}) {
  const utils = render(
    <InfoSprinkle
      data-testid="info-sprinkle"
      info="info sprinkle"
      {...props}
    />,
  );

  const infoSprinkleIcon = utils.getByTestId('info-sprinkle-icon');

  return {
    ...utils,
    infoSprinkleIcon,
  };
}

describe('packages/info-sprinkle', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues when tooltip is not open', async () => {
      const { container } = renderInfoSprinkle();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('does not have basic accessibility issues when tooltip is hovered open', async () => {
      const { container, infoSprinkleIcon } = renderInfoSprinkle();
      const results = await axe(container);
      expect(results).toHaveNoViolations();

      let newResults = null as any;
      act(() => void fireEvent.mouseEnter(infoSprinkleIcon));
      await act(async () => {
        newResults = await axe(container);
      });
      expect(newResults).toHaveNoViolations();
    });

    test('does not have basic accessibility issues when tooltip open by default', async () => {
      const { container } = renderInfoSprinkle({ open: true });
      await act(async () => {
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });

  describe('info sprinkle', () => {
    test('renders icon', async () => {
      renderInfoSprinkle({ open: true });
      const circleIcon = screen.getByLabelText('Info With Circle Icon');
      expect(circleIcon).toBeInTheDocument();
    });
  });
});

// test that it opens
