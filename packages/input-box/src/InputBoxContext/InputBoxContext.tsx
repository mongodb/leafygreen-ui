import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import {
  InputBoxContextType,
  InputBoxProviderProps,
} from './InputBoxContext.types';

// The Context constant is defined with the default/fixed type, which is string. This is the loose type because we don't know the type of the string yet.
export const InputBoxContext = createContext<InputBoxContextType | null>(null);

// Provider is generic over T, the string union
export const InputBoxProvider = <Segment extends string>({
  charsPerSegment,
  children,
  disabled,
  labelledBy,
  onChange,
  onBlur,
  segments,
  segmentEnum,
  segmentRefs,
  size,
}: PropsWithChildren<InputBoxProviderProps<Segment>>) => {
  const value = useMemo(
    () => ({
      charsPerSegment,
      children,
      disabled,
      labelledBy,
      onChange,
      onBlur,
      segments,
      segmentEnum,
      segmentRefs,
      size,
    }),
    [
      charsPerSegment,
      children,
      disabled,
      labelledBy,
      onChange,
      onBlur,
      segments,
      segmentEnum,
      segmentRefs,
      size,
    ],
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
      'useInputBoxContext must be used within a InputBoxProvider',
    );
  }

  return context;
};
