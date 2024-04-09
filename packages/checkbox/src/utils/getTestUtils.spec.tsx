import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from '../Checkbox';

import { getTestUtils } from './getTestUtils';

const defaultProps = {
  label: 'Test Input Label',
  description: 'This is the description',
  placeholder: 'This is some placeholder text',
};

const renderCheckboxAsync = () =>
  renderAsyncTest(<Checkbox label="checkbox label" />, render);

function renderCheckbox(props = {}) {
  const renderUtils = render(
    <Checkbox
      label={defaultProps.label}
      description={defaultProps.description}
      {...props}
    />,
  );

  return { ...renderUtils };
}

function renderMultipleInputs() {
  render(
    <>
      <Checkbox data-lgid="lg-checkbox-1" label="label 1" checked={true} />
      <Checkbox data-lgid="lg-checkbox-2" label="label 2" checked={false} />
    </>,
  );
}

describe('packages/checkbox', () => {
  describe('getTestUtils', () => {
    test('throws error if LG Checkbox is not found', () => {
      render(<Checkbox data-lgid="lg-text_output" label="hey" />);

      try {
        const _utils = getTestUtils();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          'message',
          expect.stringMatching(
            /Unable to find an element by: \[data-lgid="lg-checkbox"\]/,
          ),
        );
      }
    });

    describe('single input', () => {
      describe('getInput', () => {
        test('is in the document', () => {
          renderCheckbox();
          const { getInput } = getTestUtils();
          expect(getInput()).toBeInTheDocument();
        });
      });

      describe('getLabel', () => {
        test('is in the document', () => {
          renderCheckbox();
          const { getLabel } = getTestUtils();
          expect(getLabel()).toBeInTheDocument();
        });
      });

      describe('getDescription', () => {
        test('is in the document', () => {
          renderCheckbox();
          const { getDescription } = getTestUtils();
          expect(getDescription()).toBeInTheDocument();
        });

        test('is not in the document', () => {
          renderCheckbox({ description: '' });
          const { getDescription } = getTestUtils();
          expect(getDescription()).not.toBeInTheDocument();
        });
      });

      describe('getInputValue', () => {
        test('returns false by default', () => {
          renderCheckbox();
          const { getInputValue } = getTestUtils();
          expect(getInputValue()).toBe(false);
        });

        test('returns value when uncontrolled', () => {
          renderCheckbox();
          const { getInput, getInputValue } = getTestUtils();
          fireEvent.click(getInput());
          expect(getInputValue()).toBe(true);
        });

        test('returns value when controlled', () => {
          renderCheckbox({ value: true });
          const { getInput, getInputValue } = getTestUtils();
          fireEvent.click(getInput());
          expect(getInputValue()).toBe(true);
        });
      });

      describe('isDisabled', () => {
        test('is true', () => {
          renderCheckbox({ disabled: true });
          const { isDisabled } = getTestUtils();
          expect(isDisabled()).toBe(true);
        });

        test('is false', () => {
          renderCheckbox();
          const { isDisabled } = getTestUtils();
          expect(isDisabled()).toBe(false);
        });
      });

      describe('isIndeterminate', () => {
        test('is true', () => {
          renderCheckbox({ indeterminate: true });
          const { isIndeterminate } = getTestUtils();
          expect(isIndeterminate()).toBe(true);
        });

        test('is false', () => {
          renderCheckbox();
          const { isIndeterminate } = getTestUtils();
          expect(isIndeterminate()).toBe(false);
        });
      });
    });

    describe('multiple inputs', () => {
      test('getInput', () => {
        renderMultipleInputs();

        const utilsOne = getTestUtils('lg-checkbox-1');
        const utilsTwo = getTestUtils('lg-checkbox-2');

        expect(utilsOne.getInput()).toBeInTheDocument();
        expect(utilsTwo.getInput()).toBeInTheDocument();
      });

      test('getInputValue', () => {
        renderMultipleInputs();
        const utilsOne = getTestUtils('lg-checkbox-1');
        const utilsTwo = getTestUtils('lg-checkbox-2');

        expect(utilsOne.getInputValue()).toBe(true);
        expect(utilsTwo.getInputValue()).toBe(false);
      });
    });

    describe('Async component', () => {
      test('find LG Checkbox after awaiting an async component', async () => {
        const { openButton, findByTestId, asyncTestComponentId } =
          renderCheckboxAsync();

        userEvent.click(openButton);

        const asyncComponent = await findByTestId(asyncTestComponentId);
        expect(asyncComponent).toBeInTheDocument();

        // After awaiting asyncComponent, look for checkbox
        const { getInput } = getTestUtils();
        expect(getInput()).toBeInTheDocument();
      });

      test('find LG Checkbox awaiting getLGCheckboxTestUtils', async () => {
        const { openButton } = renderCheckboxAsync();

        userEvent.click(openButton);

        // awaiting getTestUtils
        await waitFor(() => {
          const { getInput } = getTestUtils();
          expect(getInput()).toBeInTheDocument();
        });
      });

      test('Updates the value inside an async component', async () => {
        const { openButton, findByTestId, asyncTestComponentId } =
          renderCheckboxAsync();

        userEvent.click(openButton);
        const asyncComponent = await findByTestId(asyncTestComponentId);
        expect(asyncComponent).toBeInTheDocument();

        // After awaiting asyncComponent, look for checkbox
        const { getInput, getInputValue } = getTestUtils();
        const input = getInput();
        fireEvent.click(getInput());
        expect(getInputValue()).toBe(true);
      });
    });
  });
});
