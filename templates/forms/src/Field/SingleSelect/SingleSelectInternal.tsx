// import React, { useEffect } from 'react';
// import { useFormTemplateContext } from '../../FormTemplateContext/FormTemplateContext';
// import {
//   SingleSelectFieldProperties,
//   InternalFieldProperties,
// } from '../../FormTemplateContext/FormTemplateContext.types';
// import { useSingleSelectContext } from './SingleSelectContext';

// interface SingleSelectProps
//   extends Omit<SingleSelectFieldProperties, InternalFieldProperties> {
//   // The name for the input
//   name: string;

//   // Option Definitions
//   children: React.ReactNode;
// }

// function SingleSelectInternal({
//   name,
//   type = 'select',
//   required = false,
//   ...rest
// }: SingleSelectProps) {
//   const { addField, removeField } = useFormTemplateContext();
//   const { options } = useSingleSelectContext();

//   useEffect(() => {
//     addField(name, {
//       type,
//       value: '',
//       required,
//       // options,
//       ...rest,
//     });

//     return () => {
//       removeField(name);
//     };
//   }, []);

//   // Fields are not responsible for rendering themselves.
//   return null;
// }

// SingleSelectInternal.displayName = 'Field.SingleSelect';

// export default SingleSelectInternal;
