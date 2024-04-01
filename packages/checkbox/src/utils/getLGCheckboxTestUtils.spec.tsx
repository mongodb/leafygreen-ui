import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from '../Checkbox';

import { getLGCheckboxTestUtils } from './getLGCheckboxTestUtilts';

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
  describe('getLGCheckboxTestUtils', () => {
    test('throws error if LG Checkbox is not found', () => {
      render(<Checkbox data-lgid="lg-text_output" label="hey" />);

      try {
        const _utils = getLGCheckboxTestUtils();
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
          const { getInput } = getLGCheckboxTestUtils();
          expect(getInput()).toBeInTheDocument();
        });
      });

      describe('getLabel', () => {
        test('is in the document', () => {
          renderCheckbox();
          const { getLabel } = getLGCheckboxTestUtils();
          expect(getLabel()).toBeInTheDocument();
        });
      });

      describe('getDescription', () => {
        test('is in the document', () => {
          renderCheckbox();
          const { getDescription } = getLGCheckboxTestUtils();
          expect(getDescription()).toBeInTheDocument();
        });

        test('is not in the document', () => {
          renderCheckbox({ description: '' });
          const { getDescription } = getLGCheckboxTestUtils();
          expect(getDescription()).not.toBeInTheDocument();
        });
      });

      describe('getInputValue', () => {
        test('returns false by default', () => {
          renderCheckbox();
          const { getInputValue } = getLGCheckboxTestUtils();
          expect(getInputValue()).toBe(false);
        });

        test('returns value when uncontrolled', () => {
          renderCheckbox();
          const { getInput, getInputValue } = getLGCheckboxTestUtils();
          fireEvent.click(getInput());
          expect(getInputValue()).toBe(true);
        });

        test('returns value when controlled', () => {
          renderCheckbox({ value: true });
          const { getInput, getInputValue } = getLGCheckboxTestUtils();
          fireEvent.click(getInput());
          expect(getInputValue()).toBe(true);
        });
      });

      describe('isDisabled', () => {
        test('is true', () => {
          renderCheckbox({ disabled: true });
          const { isDisabled } = getLGCheckboxTestUtils();
          expect(isDisabled()).toBe(true);
        });

        test('is false', () => {
          renderCheckbox();
          const { isDisabled } = getLGCheckboxTestUtils();
          expect(isDisabled()).toBe(false);
        });
      });
    });

    describe('multiple inputs', () => {
      test('getInput', () => {
        renderMultipleInputs();

        const utilsOne = getLGCheckboxTestUtils('lg-checkbox-1');
        const utilsTwo = getLGCheckboxTestUtils('lg-checkbox-2');

        expect(utilsOne.getInput()).toBeInTheDocument();
        expect(utilsTwo.getInput()).toBeInTheDocument();
      });

      test('getInputValue', () => {
        renderMultipleInputs();
        const utilsOne = getLGCheckboxTestUtils('lg-checkbox-1');
        const utilsTwo = getLGCheckboxTestUtils('lg-checkbox-2');

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

        // After awaiting asyncComponent, look for text area
        const { getInput } = getLGCheckboxTestUtils();
        expect(getInput()).toBeInTheDocument();
      });

      test('find LG Checkbox awaiting getLGCheckboxTestUtils', async () => {
        const { openButton } = renderCheckboxAsync();

        userEvent.click(openButton);

        // awaiting getLGCheckboxTestUtils
        await waitFor(() => {
          const { getInput } = getLGCheckboxTestUtils();
          expect(getInput()).toBeInTheDocument();
        });
      });

      test('Updates the value inside an async component', async () => {
        const { openButton, findByTestId, asyncTestComponentId } =
          renderCheckboxAsync();

        userEvent.click(openButton);
        const asyncComponent = await findByTestId(asyncTestComponentId);
        expect(asyncComponent).toBeInTheDocument();

        // After awaiting asyncComponent, look for text area
        const { getInput, getInputValue } = getLGCheckboxTestUtils();
        const input = getInput();
        fireEvent.click(getInput());
        expect(getInputValue()).toBe(true);
      });
    });
  });
});
