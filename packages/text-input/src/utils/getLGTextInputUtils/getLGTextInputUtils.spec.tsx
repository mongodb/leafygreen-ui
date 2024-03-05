import React, { useState } from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal, { ModalView } from '@leafygreen-ui/modal';

import TextInput, { TextInputProps } from '../../TextInput';
import { State } from '../../TextInput';

import { getLGTextInputUtils } from '.';

const error = 'This is the error message';
const defaultProps = {
  label: 'Test Input Label',
  description: 'This is the description',
  placeholder: 'This is some placeholder text',
};

function renderTextInput(props = {}) {
  const renderUtils = render(
    <TextInput
      data-lgid="lg-text_input"
      label={defaultProps.label}
      description={defaultProps.description}
      {...props}
    />,
  );

  const rerenderTextInput = (newProps?: Partial<TextInputProps>) => {
    const allProps = { ...props, ...newProps };
    renderUtils.rerender(
      <TextInput
        data-lgid="lg-text_input"
        label={defaultProps.label}
        description={defaultProps.description}
        {...allProps}
      />,
    );
  };

  const { elements, utils } = getLGTextInputUtils();
  return { ...renderUtils, ...elements, ...utils, rerenderTextInput };
}

const ModalWrapper = ({
  open: initialOpen = false,
  ...props
}: Partial<React.ComponentProps<typeof ModalView>>) => {
  const [open, setOpen] = useState(initialOpen);
  const toggleModal = () => setOpen(o => !o);

  return (
    <>
      <button data-testid="lg-modal-button" onClick={toggleModal}></button>
      <Modal data-testid="lg-modal" {...props} open={open} setOpen={setOpen}>
        <p>Inside Modal</p>
        <TextInput data-lgid="lg-text_input-modal" label={defaultProps.label} />
      </Modal>
    </>
  );
};

function renderModalWithTextInput(
  props: Partial<React.ComponentProps<typeof ModalView>> = {},
) {
  const renderModalUtils = render(<ModalWrapper {...props} />);
  const modalButton = renderModalUtils.getByTestId('lg-modal-button');

  return {
    ...renderModalUtils,
    modalButton,
  };
}

async function renderModalWithTextInputAndUtils(
  props: Partial<React.ComponentProps<typeof ModalView>> = {},
) {
  const renderModalUtils = render(<ModalWrapper {...props} />);
  const modalButton = renderModalUtils.getByTestId('lg-modal-button');

  const getLGTextInputUtil = () => {
    const { elements, utils } = getLGTextInputUtils('lg-text_input-modal');
    return { elements, utils };
  };

  return {
    ...renderModalUtils,
    modalButton,
    getLGTextInputUtil: () => getLGTextInputUtil(),
  };
}

function renderMultipleInputs() {
  render(
    <>
      <TextInput
        data-lgid="lg-text_input-1"
        label="label 1"
        description="description 1"
        value="text input 1"
      />
      <TextInput
        data-lgid="lg-text_input-2"
        label="label 2"
        description="description 2"
        value="text input 2"
      />
    </>,
  );

  const { elements: elementsOne, utils: utilsOne } =
    getLGTextInputUtils('lg-text_input-1');
  const { elements: elementsTwo, utils: utilsTwo } =
    getLGTextInputUtils('lg-text_input-2');

  return {
    elementsOne,
    elementsTwo,
    utilsOne,
    utilsTwo,
  };
}

describe('packages/text-input', () => {
  describe('getLGTextInputUtils', () => {
    describe('throws error if LG TextInput is not found', () => {
      test('', () => {
        render(<TextInput data-lgid="lg-text_output" label="hey" />);

        try {
          const {
            // eslint-disable-next-line
            elements: { getInput },
          } = getLGTextInputUtils('lg-text_input');
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(/Unable to find an element by: /),
          );
        }
      });
    });

    describe('getLabel', () => {
      test('returns label', () => {
        const { getLabel } = renderTextInput();

        expect(getLabel()).toBeInTheDocument();
        expect(getLabel()).toHaveTextContent(defaultProps.label);
      });

      test('returns null', () => {
        const { getLabel } = renderTextInput({ label: '' });

        expect(getLabel()).not.toBeInTheDocument();
      });
    });

    describe('getDescription', () => {
      test('returns description', () => {
        const { getDescription } = renderTextInput();

        expect(getDescription()).toBeInTheDocument();
        expect(getDescription()).toHaveTextContent(defaultProps.description);
      });

      test('returns null', () => {
        const { getDescription } = renderTextInput({ description: '' });

        expect(getDescription()).not.toBeInTheDocument();
      });
    });

    describe('getInput', () => {
      test('returns input', () => {
        const { getInput } = renderTextInput();

        expect(getInput()).toBeInTheDocument();
        expect(getInput()?.value).toBe('');
      });
    });

    describe('getErrorMessage', () => {
      test('returns error message', () => {
        const { getErrorMessage } = renderTextInput({
          state: State.Error,
          errorMessage: error,
        });

        expect(getErrorMessage()).toBeInTheDocument();
        expect(getErrorMessage()).toHaveTextContent(error);
      });

      test('returns null', () => {
        const { getErrorMessage } = renderTextInput();

        expect(getErrorMessage()).not.toBeInTheDocument();
      });
    });

    describe('isDisabled', () => {
      test('is true', () => {
        const { isDisabled } = renderTextInput({ disabled: true });

        expect(isDisabled()).toBe(true);
      });

      test('is false', () => {
        const { isDisabled } = renderTextInput();

        expect(isDisabled()).toBe(false);
      });
    });

    describe('isValid', () => {
      test('is true', () => {
        const { isValid } = renderTextInput({ state: State.Valid });

        expect(isValid()).toBe(true);
      });

      test('is false', () => {
        const { isValid } = renderTextInput();

        expect(isValid()).toBe(false);
      });
    });

    describe('isError', () => {
      test('is true', () => {
        const { isError } = renderTextInput({ state: State.Error });

        expect(isError()).toBe(true);
      });

      test('is false', () => {
        const { isError } = renderTextInput();

        expect(isError()).toBe(false);
      });
    });

    describe('inputValue', () => {
      test('returns value when uncontrolled', () => {
        const { getInput, inputValue } = renderTextInput();

        const input = getInput();
        userEvent.type(input as HTMLInputElement, '123');
        expect(inputValue()).toBe('123');
      });

      test('returns value when controlled', () => {
        const { inputValue, rerenderTextInput } = renderTextInput({
          value: '456',
        });

        expect(inputValue()).toBe('456');
        rerenderTextInput({ value: 'I was rerendered' });
        expect(inputValue()).toBe('I was rerendered');
      });
    });

    describe('multiple inputs', () => {
      test('getInput', () => {
        const { elementsOne, elementsTwo } = renderMultipleInputs();

        expect(elementsOne.getInput() as HTMLInputElement).toBeInTheDocument();
        expect(elementsTwo.getInput() as HTMLInputElement).toBeInTheDocument();
      });

      test('getLabel', () => {
        const { elementsOne, elementsTwo } = renderMultipleInputs();

        expect(elementsOne.getLabel()).toHaveTextContent('label 1');
        expect(elementsTwo.getLabel()).toHaveTextContent('label 2');
      });

      test('getDescription', () => {
        const { elementsOne, elementsTwo } = renderMultipleInputs();

        expect(elementsOne.getDescription()).toHaveTextContent('description 1');
        expect(elementsTwo.getDescription()).toHaveTextContent('description 2');
      });

      test('inputValue', () => {
        const { utilsOne, utilsTwo } = renderMultipleInputs();

        expect(utilsOne.inputValue()).toBe('text input 1');
        expect(utilsTwo.inputValue()).toBe('text input 2');
      });
    });

    describe('LG Modal', () => {
      test('find LG TextInput inside a LG Modal after awaiting modal', async () => {
        const { modalButton, findByTestId } = renderModalWithTextInput();

        userEvent.click(modalButton);

        const modal = await findByTestId('lg-modal');
        expect(modal).toBeInTheDocument();

        // After awaiting modal, look for text input
        const {
          elements: { getInput },
        } = getLGTextInputUtils('lg-text_input-modal');
        expect(getInput()).toBeInTheDocument();
      });

      test('find LG TextInput inside a LG Modal awaiting getLGTextInputUtils', async () => {
        const { modalButton } = renderModalWithTextInput();

        userEvent.click(modalButton);

        // awaiting getLGTextInputUtils
        await waitFor(() => {
          const {
            elements: { getInput },
          } = getLGTextInputUtils('lg-text_input-modal');
          expect(getInput()).toBeInTheDocument();
        });
      });

      test('Updates the value inside a LG Modal', async () => {
        const { modalButton, findByTestId } = renderModalWithTextInput();

        userEvent.click(modalButton);
        const modal = await findByTestId('lg-modal');
        expect(modal).toBeInTheDocument();

        // After awaiting modal, look for text input
        const {
          elements: { getInput },
          utils: { inputValue },
        } = getLGTextInputUtils('lg-text_input-modal');
        const input = getInput();
        userEvent.type(
          input as HTMLInputElement,
          'what rhymes with modal? xodal',
        );
        expect(inputValue()).toBe('what rhymes with modal? xodal');
      });

      test('passing utils', async () => {
        const { modalButton, findByTestId, getLGTextInputUtil } =
          await renderModalWithTextInputAndUtils();

        userEvent.click(modalButton);
        const modal = await findByTestId('lg-modal');
        expect(modal).toBeInTheDocument();

        // After awaiting modal, look for text input
        const { elements } = getLGTextInputUtil();
        expect(elements.getInput()).toBeInTheDocument();
      });
    });
  });
});
