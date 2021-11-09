import { useState } from 'react';

export default function useValidation<
  T extends HTMLInputElement | HTMLTextAreaElement
>(handleValidation?: (value: string) => void) {
  const [isDirty, setIsDirty] = useState(false);

  if (typeof handleValidation !== 'function') {
    console.error(
      'Error in `useValidation` hook: `handleValidation` must be a function',
    );
    return {
      onBlur: () => {},
      onChange: () => {},
    };
  }

  const onBlur = (e: React.FocusEvent<T>) => {
    setIsDirty(true);
    handleValidation?.(e.target.value);
  };

  const onChange = (e: React.ChangeEvent<T>) => {
    if (isDirty) {
      handleValidation?.(e.target.value);
    }
  };

  return {
    onBlur,
    onChange,
  };
}
