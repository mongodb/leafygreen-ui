// ModalFormTemplateView is an internal component that renders the modal dialog, and does
// the heavy lifting of using the state from the context provider to render the actual form.

import React from 'react';
import { Modal } from '@leafygreen-ui/modal';
import { ModalFormTemplatePassthroughProps } from './ModalFormTemplate.types';
import { useFormTemplateContext } from '../../FormTemplateContext/FormTemplateContext';
import FormFooter from '@leafygreen-ui/form-footer';
import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { H2 } from '@leafygreen-ui/typography';
import { Spinner } from '@leafygreen-ui/loading-indicator';
import {
  isStringInput,
  isSingleSelect,
  isMultiSelect,
} from '../../Field/fieldTypeGuards';
import StringInputFieldView from './ModalStringInputFieldView';

const isPromise = (value: any): value is Promise<any> =>
  value instanceof Promise;

const ModalFormTemplateView = React.forwardRef<
  HTMLDialogElement,
  ModalFormTemplatePassthroughProps
>(({ children, open, setOpen, onSubmit, title, onClose }, ref) => {
  const { fields, clearFormValues } = useFormTemplateContext();
  const { fieldProperties, invalidFields } = fields;
  const [isLoading, setIsLoading] = React.useState(false);

  const displayFields: Array<React.ReactNode> = [];

  console.log('fieldProperties: ', fieldProperties);
  fieldProperties.forEach((properties, name) => {
    if (isStringInput(properties)) {
      displayFields.push(
        <StringInputFieldView key={name} name={name} {...properties} />,
      );
    } else if (isSingleSelect(properties)) {
      // Handle Single Select
    } else if (isMultiSelect(properties)) {
      // Handle Multi Select
    }
  });
  console.log('invalidFields', invalidFields);

  function closeModal() {
    setOpen(false);
    onClose?.();
    setIsLoading(false);
  }

  function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();

    // TODO: Handle client-side validation

    const onSubmitResult = onSubmit();
    console.log('Submitting form', onSubmitResult);

    if (isPromise(onSubmitResult)) {
      setIsLoading(true);

      onSubmitResult.then(() => {
        closeModal();
        clearFormValues();
      });
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
          `}
        >
          <H2
            className={css`
              margin-bottom: ${spacing[600]}px;
            `}
          >
            {title}
          </H2>

          {displayFields}
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
            disabled: !!invalidFields.length,
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

export default ModalFormTemplateView;
