import React, { createContext, useContext, useMemo } from 'react';
import { InputSegmentChangeEventHandler } from '../InputSegment/InputSegment.types';

// Helper type to represent the constrained Enum Object structure
type SegmentEnumObject<T extends string> = Record<string, T>;

// T is the string union of segment names (e.g., 'areaCode' | 'prefix')
export interface InputBoxContextType<T extends string = string> {
  charsPerSegment: Record<T, number>; // Keyed by T
  segmentEnum: SegmentEnumObject<T>; // Values are T
  onChange: InputSegmentChangeEventHandler<T, string>;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// Props are generic over T and use SegmentEnumObject<T> for segmentEnum
export interface InputBoxProviderProps<T extends string> {
  children: React.ReactNode;
  charsPerSegment: Record<T, number>;
  segmentEnum: SegmentEnumObject<T>;
  onChange: InputSegmentChangeEventHandler<T, string>;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// The Context constant is defined with the default/fixed type
export const InputBoxContext = createContext<InputBoxContextType | null>(null);

// Provider is generic over T, the string union
export const InputBoxProvider = <T extends string>({
  children,
  charsPerSegment,
  segmentEnum,
  onChange,
  onBlur,
}: InputBoxProviderProps<T>) => {
  const value = useMemo(
    () => ({
      charsPerSegment,
      segmentEnum,
      onChange,
      onBlur,
    }),
    [charsPerSegment, segmentEnum, onChange, onBlur],
  );

  // Single assertion to the fixed context type
  // TODO: why is this necessary?
  return (
    <InputBoxContext.Provider value={value as unknown as InputBoxContextType}>
      {children}
    </InputBoxContext.Provider>
  );
};

// The hook is generic over T, the string union
export const useInputBoxContext = <T extends string>() => {
  // Assert the context type to the specific generic T
  const context = useContext(InputBoxContext) as InputBoxContextType<T> | null;

  if (!context) {
    throw new Error(
      'useInputBoxContext must be used within an InputBoxProvider',
    );
  }
  return context;
};
