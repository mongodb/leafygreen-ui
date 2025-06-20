import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProgressBar } from '.';

describe('packages/progress-bar', () => {
  describe('basic rendering', () => {
    it('renders with a label', () => {
      const TEST_LABEL = 'placeholder label';
      const { getByText } = render(
        <ProgressBar isIndeterminate={true} label={TEST_LABEL} />,
      );
      expect(getByText(TEST_LABEL)).toBeInTheDocument();
    });

    it('renders with a description', () => {
      const TEST_DESCRIPTION = 'placeholder description';
      const { getByText } = render(
        <ProgressBar isIndeterminate={true} description={TEST_DESCRIPTION} />,
      );
      expect(getByText(TEST_DESCRIPTION)).toBeInTheDocument();
    });

    describe('with value format', () => {
      const TEST_VALUE = 50;
      const TEST_MAX_VALUE = 100;

      it('renders a plain number when formatValue is "number"', () => {
        const { getByText } = render(
          <ProgressBar
            isIndeterminate={true}
            value={TEST_VALUE}
            formatValue="number"
          />,
        );
        expect(getByText(TEST_VALUE.toString())).toBeInTheDocument();
      });

      it('renders a fraction when formatValue is "fraction"', () => {
        const { getByText } = render(
          <ProgressBar
            isIndeterminate={false}
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
            formatValue="fraction"
          />,
        );
        expect(
          getByText(`${TEST_VALUE}/${TEST_MAX_VALUE}`),
        ).toBeInTheDocument();
      });

      it('renders a percentage when formatValue is "percentage"', () => {
        const { getByText } = render(
          <ProgressBar
            isIndeterminate={false}
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
            formatValue="percentage"
          />,
        );
        expect(getByText(`${TEST_VALUE}%`)).toBeInTheDocument();
      });

      it('renders with a custom format when given a callback', () => {
        const { getByText } = render(
          <ProgressBar
            isIndeterminate={false}
            value={TEST_VALUE}
            formatValue={value => `${value} units`}
          />,
        );
        expect(getByText(`${TEST_VALUE} units`)).toBeInTheDocument();
      });

      it('renders with an icon when showIcon is true', () => {
        render(
          <ProgressBar
            isIndeterminate={false}
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
            formatValue="number"
            showIcon={true}
          />,
        );
        expect(screen.getByRole('img')).toBeInTheDocument();
      });

      it('does not render an icon for success variant if value is not at maxValue, even if showIcon is true', () => {
        render(
          <ProgressBar
            isIndeterminate={false}
            variant="success"
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
            formatValue="number"
            showIcon={true}
          />,
        );
        expect(screen.queryByRole('img')).toBeNull();
      });
    });

    describe('with determinate state', () => {
      const TEST_VALUE = 50;
      const TEST_MAX_VALUE = 100;

      it('renders the correct width for the progress bar fill', () => {
        const { getByTestId } = render(
          <ProgressBar
            isIndeterminate={false}
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
          />,
        );
        const barFillElement = getByTestId('progress-bar-fill');
        expect(barFillElement).toBeInTheDocument();
        expect(barFillElement).toHaveStyle({
          width: '50%',
        });
      });
    });
  });
});
