export { FormTemplate, type ModalFormTemplateProps } from './FormTemplates';
export { Field } from './Field';

// This is a runtime check to ensure that the transpiler is configured correctly for class fields, as documented by the MobX documentation: https://mobx.js.org/installation.html.
if (
  !new (class {
    // @ts-ignore
    x;
  })().hasOwnProperty('x')
)
  throw new Error('Transpiler is not configured correctly');
