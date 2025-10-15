// ModalFormTemplate is the top-level component that is used directly by consumers.
// It sets up the FormTemplate context provider and renders the ModalFormTemplateView.

import React from 'react';
import { FormTemplateProvider } from '../../FormTemplateContext/FormTemplateContext';
import ModalFormTemplateView from './ModalFormTemplateView';
import { ModalFormTemplateProps } from './ModalFormTemplate.types';

const ModalFormTemplate = React.forwardRef<
  HTMLDialogElement,
  ModalFormTemplateProps
>(({ children, ...props }, ref) => (
  <FormTemplateProvider>
    <ModalFormTemplateView ref={ref} {...props}>
      {children}
    </ModalFormTemplateView>
  </FormTemplateProvider>
));

ModalFormTemplate.displayName = 'ModalFormTemplate';

export default ModalFormTemplate;
