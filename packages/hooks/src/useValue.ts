import { ChangeEventHandler, useEffect, useState } from 'react';

export const useValue = <T extends any>(
  controlledValue?: T,
  onChangeHandler?: ChangeEventHandler<any>,
) => {
  const [internalValue, setInternalValue] = useState<T | undefined>(
    controlledValue,
  );
  useEffect(() => {
    setInternalValue(controlledValue);
  }, [controlledValue]);

  const handleValueChange: ChangeEventHandler<any> = e => {
    setInternalValue(e.target.value);
    onChangeHandler?.(e);
  };

  return {
    internalValue,
    setInternalValue,
    handleValueChange,
  };
};
