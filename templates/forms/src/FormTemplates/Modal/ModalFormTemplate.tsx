// ModalFormTemplate is the top-level component that is used directly by consumers.
// It sets up the FormTemplate context provider and renders the ModalFormTemplateView.

import React, { useEffect } from 'react';
import { FormTemplateProvider } from '../../FormTemplateContext/FormTemplateContext';
import ModalFormTemplateView from './ModalFormTemplateView';
import { ModalFormTemplateProps } from './ModalFormTemplate.types';
import useValidChildren from '../../utils/useValidChildren';

const ModalFormTemplate = React.forwardRef<
  HTMLDialogElement,
  ModalFormTemplateProps
>(({ children, ...props }, ref) => {
  const validChildren = useValidChildren(children);

  return (
    <FormTemplateProvider>
      <ModalFormTemplateView ref={ref} {...props}>
        {validChildren}
      </ModalFormTemplateView>
    </FormTemplateProvider>
  );
});

ModalFormTemplate.displayName = 'ModalFormTemplate';

export default ModalFormTemplate;
