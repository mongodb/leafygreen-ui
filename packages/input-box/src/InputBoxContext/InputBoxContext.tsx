import React, { createContext, useContext, useMemo } from 'react';
import { InputSegmentChangeEventHandler } from '../InputSegment/InputSegment.types';

// Helper type to represent the constrained Enum Object structure
type SegmentEnumObject<Segment extends string> = Record<string, Segment>;

// T is the string union of segment names (e.g., 'areaCode' | 'prefix')
export interface InputBoxContextType<Segment extends string = string> {
  charsPerSegment: Record<Segment, number>; // Keyed by Segment
  segmentEnum: SegmentEnumObject<Segment>; // Values are Segment
  onChange: InputSegmentChangeEventHandler<Segment, string>;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// Props are generic over T and use SegmentEnumObject<T> for segmentEnum
export interface InputBoxProviderProps<Segment extends string> {
  children: React.ReactNode;
  charsPerSegment: Record<Segment, number>;
  segmentEnum: SegmentEnumObject<Segment>;
  onChange: InputSegmentChangeEventHandler<Segment, string>;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// The Context constant is defined with the default/fixed type, which is string. This is the loose type because we don't know the type of the string yet.
export const InputBoxContext = createContext<InputBoxContextType | null>(null);

// Provider is generic over T, the string union
export const InputBoxProvider = <Segment extends string>({
  children,
  charsPerSegment,
  segmentEnum,
  onChange,
  onBlur,
}: InputBoxProviderProps<Segment>) => {
  const value = useMemo(
    () => ({
      charsPerSegment,
      segmentEnum,
      onChange,
      onBlur,
    }),
    [charsPerSegment, segmentEnum, onChange, onBlur],
  );

  // The provider passes a strict type of T but the context is defined as a loose type of string so TS sees a potential type mismatch. This assertion says that we know that the types do not overlap but we guarantee that the strict provider value satisfies the fixed context requirement.
  return (
    <InputBoxContext.Provider value={value as unknown as InputBoxContextType}>
      {children}
    </InputBoxContext.Provider>
  );
};

// The hook is generic over T, the string union
export const useInputBoxContext = <Segment extends string>() => {
  // Assert the context type to the specific generic T
  const context = useContext(
    InputBoxContext,
  ) as InputBoxContextType<Segment> | null;

  if (!context) {
    throw new Error(
      'useInputBoxContext must be used within an InputBoxProvider',
    );
  }
  return context;
};
