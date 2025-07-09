import React from 'react';
import { render } from '@testing-library/react';

import { getTestUtils } from '../testing';

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
      const { queryLabel } = getTestUtils();
      expect(queryLabel()).toBeVisible();
      expect(queryLabel()).toHaveTextContent(TEST_LABEL);
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
      const { queryDescription } = getTestUtils();
      expect(queryDescription()).toBeVisible();
      expect(queryDescription()).toHaveTextContent(TEST_DESCRIPTION);
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
        const { queryValueText } = getTestUtils();
        expect(queryValueText()).toBeVisible();
        expect(queryValueText()).toHaveTextContent('50 units');
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
        const { queryIcon } = getTestUtils();
        expect(queryIcon()).toBeVisible();
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
        const { getBarFill } = getTestUtils();
        expect(getBarFill()).toBeInTheDocument();
        expect(getBarFill()).toHaveStyle({
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
        const { queryIcon } = getTestUtils();
        expect(queryIcon()).toBeNull();
      });

      describe('with unexpected input', () => {
        test('renders width 0% when value is less than 0', () => {
          render(
            <ProgressBar
              type={Type.Loader}
              isIndeterminate={false}
              value={-5}
              maxValue={100}
            />,
          );
          const { getBarFill } = getTestUtils();
          expect(getBarFill()).toBeInTheDocument();
          expect(getBarFill()).toHaveStyle({
            width: '0%',
          });
        });

        test('defaults to maxValue of 1 when maxValue is less than 0', () => {
          render(
            <ProgressBar
              type={Type.Loader}
              isIndeterminate={false}
              value={1}
              maxValue={-10}
            />,
          );
          const { getBarFill } = getTestUtils();
          expect(getBarFill()).toBeInTheDocument();
          expect(getBarFill()).toHaveStyle({
            width: '100%',
          });
        });

        test('defaults to maxValue of 1 when maxValue is 0', () => {
          render(
            <ProgressBar
              type={Type.Loader}
              isIndeterminate={false}
              value={1}
              maxValue={0}
            />,
          );
          const { getBarFill } = getTestUtils();
          expect(getBarFill()).toBeInTheDocument();
          expect(getBarFill()).toHaveStyle({
            width: '100%',
          });
        });
      });
    });

    describe('when disabled', () => {
      test('renders no animation even if enableAnimation is true', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={false}
            enableAnimation={true}
            value={50}
            maxValue={100}
            disabled={true}
          />,
        );
        const { getBarFill } = getTestUtils();
        expect(getBarFill()).toBeInTheDocument();
        expect(getBarFill()).not.toHaveStyle({
          animation: expect.any(String),
        });
      });
    });
  });
});
