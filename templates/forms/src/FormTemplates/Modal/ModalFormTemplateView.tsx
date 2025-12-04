// ModalFormTemplateView is an internal component that renders the modal dialog, and does
// the heavy lifting of using the state from the context provider to render the actual form.

import React from 'react';
import { Modal } from '@leafygreen-ui/modal';
import { ModalFormTemplatePassthroughProps } from './ModalFormTemplate.types';
import { useFormStore } from '../../formStore';
import { isPromise } from '../../utils/typeGuards';
import FormFooter from '@leafygreen-ui/form-footer';
import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { H2 } from '@leafygreen-ui/typography';
import { Spinner } from '@leafygreen-ui/loading-indicator';
import FormFields from './FormFields';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';

const ModalFormTemplateView = React.forwardRef<
  HTMLDialogElement,
  ModalFormTemplatePassthroughProps
>(({ children, open, setOpen, onChange, onSubmit, title, onClose }, ref) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const formStore = useFormStore();

  console.log('rendered: ModalFormTemplateView');

  function closeModal() {
    setOpen(false);
    onClose?.();
    setIsLoading(false);
  }

  function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();

    // TODO: Handle client-side validation

    const onSubmitResult = onSubmit(formStore.fieldValues);

    if (isPromise(onSubmitResult)) {
      setIsLoading(true);

      onSubmitResult.then(
        action(() => {
          closeModal();
          formStore.resetFields();
        }),
      );
    } else {
      closeModal();
    }
  }

  return (
    <Modal
      ref={ref}
      open={open}
      setOpen={open => {
        if (open) {
          setOpen(true);
        } else {
          closeModal();
        }
      }}
      className={css`
        padding-bottom: 0;
      `}
    >
      <form onSubmit={onSubmitHandler}>
        <div
          className={css`
            position: relative;
            z-index: 1; // Allows focus states to appear above the footer without adding spacing.
            gap: ${spacing[600]}px;
            display: flex;
            flex-direction: column;
          `}
        >
          <H2>{title}</H2>

          <FormFields onChange={onChange} />
        </div>

        {children}

        <FormFooter
          className={css`
            box-shadow: none;

            // Removes padding from modal around the footer
            width: calc(100% + ${spacing[600] * 2}px);
            margin-left: -${spacing[600]}px;
            margin-right: -${spacing[600]}px;
          `}
          cancelButtonProps={{
            onClick: () => setOpen(false),
            children: 'Cancel',
          }}
          primaryButtonProps={{
            children: 'Submit',
            type: 'submit',
            disabled: !formStore.isValid,
            isLoading,
            loadingIndicator: <Spinner />,
            loadingText: 'Submitting...', // TODO: Make this customizable via props
          }}
        />
      </form>
    </Modal>
  );
});

ModalFormTemplateView.displayName = 'ModalFormTemplateView';

export default observer(ModalFormTemplateView);
