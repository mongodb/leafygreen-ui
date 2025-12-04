import React, { createContext, useContext } from 'react';
import { FormStoreProvider } from '../../formStore';
import ModalFormTemplateView from './ModalFormTemplateView';
import { ModalFormTemplateProps } from './ModalFormTemplate.types';
import useValidChildren from '../../utils/useValidChildren';

const ModalFormTemplate = React.forwardRef<
  HTMLDialogElement,
  ModalFormTemplateProps
>(({ children, ...props }, ref) => {
  const validChildren = useValidChildren(children);

  return (
    <FormStoreProvider>
      <ModalFormTemplateView ref={ref} {...props}>
        {validChildren}
      </ModalFormTemplateView>
    </FormStoreProvider>
  );
});

ModalFormTemplate.displayName = 'ModalFormTemplate';

export default ModalFormTemplate;
