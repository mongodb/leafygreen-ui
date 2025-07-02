import React from 'react';
import { render, screen } from '@testing-library/react';

import { getTestUtils } from '../utils';

import { ProgressBar } from './ProgressBar';
import { LoaderVariant, Type } from './ProgressBar.types';

describe('packages/progress-bar', () => {
  describe('basic rendering', () => {
    test('renders with a label', () => {
      const TEST_LABEL = 'placeholder label';
      render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={true}
          label={TEST_LABEL}
        />,
      );
      expect(screen.getByText(TEST_LABEL)).toBeVisible();
    });

    test('renders with a description', () => {
      const TEST_DESCRIPTION = 'placeholder description';
      render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={true}
          description={TEST_DESCRIPTION}
        />,
      );
      expect(screen.getByText(TEST_DESCRIPTION)).toBeVisible();
    });

    describe('with value format', () => {
      const TEST_VALUE = 50;
      const TEST_MAX_VALUE = 100;

      test('renders with a custom format when given a callback', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={true}
            value={TEST_VALUE}
            formatValue={value => `${value} units`}
          />,
        );
        expect(screen.getByText(`${TEST_VALUE} units`)).toBeVisible();
      });

      test('renders icon when showIcon is true', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={false}
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
            formatValue="number"
            showIcon={true}
          />,
        );
        const { getIconElement } = getTestUtils();
        expect(getIconElement()).toBeVisible();
      });

      test('renders the correct width for the progress bar fill', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={false}
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
          />,
        );
        const { getBarFillElement } = getTestUtils();
        expect(getBarFillElement()).toBeInTheDocument();
        expect(getBarFillElement()).toHaveStyle({
          width: '50%',
        });
      });

      test('does not render success variant icon if under maxValue, even if showIcon is true', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={false}
            variant={LoaderVariant.Success}
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
            formatValue="number"
            showIcon={true}
          />,
        );
        const { getIconElement } = getTestUtils();
        expect(getIconElement()).toBeNull();
      });
    });
  });
});
