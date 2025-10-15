import React from 'react';
import FormTemplateModal from './Modal/ModalFormTemplate';

interface FormTemplateType {
  Modal: typeof FormTemplateModal;
}

export const FormTemplate: FormTemplateType = {
  Modal: FormTemplateModal,
} as const;

export default FormTemplate;

// export function FormTemplate({}: FormsProps) {
//   return <div>your content here</div>;
// }

// Forms.displayName = 'Forms';

// # Forms
// FormTemplate
// FormTemplate.Modal
// FormTemplate.SinglePage
// FormTemplate.MultiPageForm

// # Fields
// Field
// Field.SingleSelect
// Field.SingleSelect.Option
// Field.MultiSelect
// Field.MultiSelect.Option
// Field.StringInput

// SingleSelect
// SingleSelect.Option
// MultiSelect
// MultiSelect.Option
// StringInput
