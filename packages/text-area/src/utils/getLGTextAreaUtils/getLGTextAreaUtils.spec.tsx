// TODO: move tests inside /TextArea.spec.tsx
import React, { useState } from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal, { ModalView } from '@leafygreen-ui/modal';

import { TextArea, TextAreaProps } from '../../TextArea';
import { State } from '../../TextArea';

import { getLGTextAreaUtils } from '.';

const error = 'This is the error message';
const defaultProps = {
  label: 'Test Area Label',
  description: 'This is the description',
  placeholder: 'This is some placeholder text',
};

function renderTextArea(props = {}) {
  const renderUtils = render(
    <TextArea
      label={defaultProps.label}
      description={defaultProps.description}
      {...props}
    />,
  );

  const rerenderTextArea = (newProps?: Partial<TextAreaProps>) => {
    const allProps = { ...props, ...newProps };
    renderUtils.rerender(
      <TextArea
        label={defaultProps.label}
        description={defaultProps.description}
        {...allProps}
      />,
    );
  };

  const { elements, utils } = getLGTextAreaUtils();
  return { ...renderUtils, ...elements, ...utils, rerenderTextArea };
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
        <TextArea data-lgid="lg-text_area-modal" label={defaultProps.label} />
      </Modal>
    </>
  );
};

function renderModalWithTextArea(
  props: Partial<React.ComponentProps<typeof ModalView>> = {},
) {
  const renderModalUtils = render(<ModalWrapper {...props} />);
  const modalButton = renderModalUtils.getByTestId('lg-modal-button');

  return {
    ...renderModalUtils,
    modalButton,
  };
}

async function renderModalWithTextAreaAndUtils(
  props: Partial<React.ComponentProps<typeof ModalView>> = {},
) {
  const renderModalUtils = render(<ModalWrapper {...props} />);
  const modalButton = renderModalUtils.getByTestId('lg-modal-button');

  const getLGTextAreaUtil = () => {
    const { elements, utils } = getLGTextAreaUtils('lg-text_area-modal');
    return { elements, utils };
  };

  return {
    ...renderModalUtils,
    modalButton,
    getLGTextAreaUtil: () => getLGTextAreaUtil(),
  };
}

function renderMultipleInputs() {
  render(
    <>
      <TextArea
        data-lgid="lg-text_area-1"
        label="label 1"
        description="description 1"
        value="text input 1"
      />
      <TextArea
        data-lgid="lg-text_area-2"
        label="label 2"
        description="description 2"
        value="text input 2"
      />
    </>,
  );

  const { elements: elementsOne, utils: utilsOne } =
    getLGTextAreaUtils('lg-text_area-1');
  const { elements: elementsTwo, utils: utilsTwo } =
    getLGTextAreaUtils('lg-text_area-2');

  return {
    elementsOne,
    elementsTwo,
    utilsOne,
    utilsTwo,
  };
}

describe('packages/text-input', () => {
  describe('getLGTextAreaUtils', () => {
    describe('throws error if LG TextArea is not found', () => {
      test('', () => {
        render(<TextArea data-lgid="lg-text_output" label="hey" />);

        try {
          const {
            // eslint-disable-next-line
            elements: { getInput },
          } = getLGTextAreaUtils('lg-text_area');
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
        const { getLabel } = renderTextArea();

        expect(getLabel()).toBeInTheDocument();
        expect(getLabel()).toHaveTextContent(defaultProps.label);
      });

      test('returns null', () => {
        const { getLabel } = renderTextArea({ label: '' });

        expect(getLabel()).not.toBeInTheDocument();
      });
    });

    describe('getDescription', () => {
      test('returns description', () => {
        const { getDescription } = renderTextArea();

        expect(getDescription()).toBeInTheDocument();
        expect(getDescription()).toHaveTextContent(defaultProps.description);
      });

      test('returns null', () => {
        const { getDescription } = renderTextArea({ description: '' });

        expect(getDescription()).not.toBeInTheDocument();
      });
    });

    describe('getInput', () => {
      test('returns input', () => {
        const { getInput } = renderTextArea();

        expect(getInput()).toBeInTheDocument();
        expect(getInput()?.value).toBe('');
      });
    });

    describe('getErrorMessage', () => {
      test('returns error message', () => {
        const { getErrorMessage } = renderTextArea({
          state: State.Error,
          errorMessage: error,
        });

        expect(getErrorMessage()).toBeInTheDocument();
        expect(getErrorMessage()).toHaveTextContent(error);
      });

      test('returns null by default', () => {
        const { getErrorMessage } = renderTextArea();

        expect(getErrorMessage()).not.toBeInTheDocument();
      });

      test('returns null when only the errorMessage is passed', () => {
        const { getErrorMessage } = renderTextArea({ errorMessage: error });

        expect(getErrorMessage()).not.toBeInTheDocument();
      });
    });

    describe('isDisabled', () => {
      test('is true', () => {
        const { isDisabled } = renderTextArea({ disabled: true });

        expect(isDisabled()).toBe(true);
      });

      test('is false', () => {
        const { isDisabled } = renderTextArea();

        expect(isDisabled()).toBe(false);
      });
    });

    describe('isError', () => {
      test('is true', () => {
        const { isError } = renderTextArea({ state: State.Error });

        expect(isError()).toBe(true);
      });

      test('is false', () => {
        const { isError } = renderTextArea();

        expect(isError()).toBe(false);
      });
    });

    describe('inputValue', () => {
      test('returns value when uncontrolled', () => {
        const { getInput, inputValue } = renderTextArea();

        const input = getInput();
        userEvent.type(input as HTMLInputElement, '123');
        expect(inputValue()).toBe('123');
      });

      test('returns value when controlled', () => {
        const { inputValue, rerenderTextArea } = renderTextArea({
          value: '456',
        });

        expect(inputValue()).toBe('456');
        rerenderTextArea({ value: 'I was rerendered' });
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
      test('find LG TextArea inside a LG Modal after awaiting modal', async () => {
        const { modalButton, findByTestId } = renderModalWithTextArea();

        userEvent.click(modalButton);

        const modal = await findByTestId('lg-modal');
        expect(modal).toBeInTheDocument();

        // After awaiting modal, look for text input
        const {
          elements: { getInput },
        } = getLGTextAreaUtils('lg-text_area-modal');
        expect(getInput()).toBeInTheDocument();
      });

      test('find LG TextArea inside a LG Modal awaiting getLGTextAreaUtils', async () => {
        const { modalButton } = renderModalWithTextArea();

        userEvent.click(modalButton);

        // awaiting getLGTextAreaUtils
        await waitFor(() => {
          const {
            elements: { getInput },
          } = getLGTextAreaUtils('lg-text_area-modal');
          expect(getInput()).toBeInTheDocument();
        });
      });

      test('Updates the value inside a LG Modal', async () => {
        const { modalButton, findByTestId } = renderModalWithTextArea();

        userEvent.click(modalButton);
        const modal = await findByTestId('lg-modal');
        expect(modal).toBeInTheDocument();

        // After awaiting modal, look for text input
        const {
          elements: { getInput },
          utils: { inputValue },
        } = getLGTextAreaUtils('lg-text_area-modal');
        const input = getInput();
        userEvent.type(
          input as HTMLInputElement,
          'what rhymes with modal? xodal',
        );
        expect(inputValue()).toBe('what rhymes with modal? xodal');
      });

      test('passing utils', async () => {
        const { modalButton, findByTestId, getLGTextAreaUtil } =
          await renderModalWithTextAreaAndUtils();

        userEvent.click(modalButton);
        const modal = await findByTestId('lg-modal');
        expect(modal).toBeInTheDocument();

        // After awaiting modal, look for text input
        const { elements } = getLGTextAreaUtil();
        expect(elements.getInput()).toBeInTheDocument();
      });
    });
  });
});
