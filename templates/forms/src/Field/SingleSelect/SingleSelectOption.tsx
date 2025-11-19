// import { useEffect } from 'react';
// import { useSingleSelectContext } from './SingleSelectContext';
// import {
//   OptionProperties,
//   InternalFieldProperties,
// } from '../../FormTemplateContext/FormTemplateContext.types';

// interface SingleSelectOptionProps
//   extends Omit<OptionProperties, InternalFieldProperties> {
//   // The name of the option
//   name: string;
// }

// function SingleSelectOption({ name, ...rest }: SingleSelectOptionProps) {
//   const { addOption, removeOption } = useSingleSelectContext();

//   useEffect(() => {
//     addOption(name, rest);

//     return () => removeOption(name);
//   });

//   return null;
// }

// SingleSelectOption.displayName = 'Field.SingleSelect.Option';

// export default SingleSelectOption;
