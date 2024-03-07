import React, { useState } from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal, { ModalView } from '@leafygreen-ui/modal';

import Toggle from '../../Toggle/Toggle';

import { getLGToggleUtils } from '.';

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
        <Toggle aria-label="Toggle who?" data-lgid="lg-toggle-modal" />
      </Modal>
    </>
  );
};

function renderModalWithToggle(
  props: Partial<React.ComponentProps<typeof ModalView>> = {},
) {
  const renderModalUtils = render(<ModalWrapper {...props} />);
  const modalButton = renderModalUtils.getByTestId('lg-modal-button');

  return {
    ...renderModalUtils,
    modalButton,
  };
}

function renderMultipleToggles() {
  render(
    <>
      <Toggle aria-label="Toggle who?" data-lgid="lg-toggle-1" />
      <Toggle aria-label="Toggle who?" data-lgid="lg-toggle-2" checked={true} />
    </>,
  );

  const { elements: elementsOne, utils: utilsOne } =
    getLGToggleUtils('lg-toggle-1');
  const { elements: elementsTwo, utils: utilsTwo } =
    getLGToggleUtils('lg-toggle-2');

  return {
    elementsOne,
    elementsTwo,
    utilsOne,
    utilsTwo,
  };
}

describe('packages/toggle', () => {
  describe('getLGToggleUtils', () => {
    describe('throws error if LG Toggle is not found', () => {
      test('', () => {
        render(<Toggle aria-label="Toggle who?" />);

        try {
          // @ts-expect-error
          // eslint-disable-next-line
          const { elements } = getLGToggleUtils();
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(/Unable to find an element by: /),
          );
        }
      });
    });

    describe('multiple toggles', () => {
      test('getInput', () => {
        const { elementsOne, elementsTwo } = renderMultipleToggles();

        expect(elementsOne.getInput()).toBeInTheDocument();
        expect(elementsTwo.getInput()).toBeInTheDocument();
      });

      test('inputValue', () => {
        const { utilsOne, utilsTwo } = renderMultipleToggles();

        expect(utilsOne.inputValue()).toBe('false');
        expect(utilsTwo.inputValue()).toBe('true');
      });
    });

    describe('LG Modal', () => {
      test('find LG Toggle inside a LG Modal after awaiting modal', async () => {
        const { modalButton, findByTestId } = renderModalWithToggle();

        userEvent.click(modalButton);

        const modal = await findByTestId('lg-modal');
        expect(modal).toBeInTheDocument();

        // After awaiting modal, look for text input
        const {
          elements: { getInput },
        } = getLGToggleUtils('lg-toggle-modal');
        expect(getInput()).toBeInTheDocument();
      });

      test('find LG Toggle inside a LG Modal awaiting getLGToggleUtils', async () => {
        const { modalButton } = renderModalWithToggle();

        userEvent.click(modalButton);

        // awaiting getLGToggleUtils
        await waitFor(() => {
          const {
            elements: { getInput },
          } = getLGToggleUtils('lg-toggle-modal');
          expect(getInput()).toBeInTheDocument();
        });
      });

      test('Updates the value inside a LG Modal', async () => {
        const { modalButton, findByTestId } = renderModalWithToggle();

        userEvent.click(modalButton);
        const modal = await findByTestId('lg-modal');
        expect(modal).toBeInTheDocument();

        // After awaiting modal, look for toggle
        const {
          elements: { getInput },
          utils: { inputValue },
        } = getLGToggleUtils('lg-toggle-modal');
        const input = getInput();
        userEvent.click(input);
        expect(inputValue()).toBe('true');
      });
    });
  });
});
