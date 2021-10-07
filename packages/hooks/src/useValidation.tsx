import { useState } from 'react';

export default function useValidation<
  T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>(handleValidation?: (value: string) => void) {
  const [isDirty, setIsDirty] = useState(false);

  const handleBlur = (e: React.FocusEvent<T>) => {
    setIsDirty(true);
    handleValidation?.((e.target as T).value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<T>) => {
    if (isDirty) {
      handleValidation?.((e.target as T).value);
    }
  };

  return {
    handleBlur,
    handleKeyPress,
  };
}
