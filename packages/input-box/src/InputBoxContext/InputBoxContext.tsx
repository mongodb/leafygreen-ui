// // TODO: since we're no longer passing the enum object to inputSegment, t should extend a string not an object

// import React, { createContext, useContext, useMemo } from 'react';
// import { InputSegmentChangeEventHandler } from '../InputSegment/InputSegment.types';

// export interface InputBoxContextType<T extends string = string> {
//   charsPerSegment: Record<T, number>;
//   segmentEnum: Record<string, T>;
//   onChange: InputSegmentChangeEventHandler<T, string>;
//   onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
// }

// export interface InputBoxProviderProps<T extends Record<string, any>> {
//   children: React.ReactNode;
//   charsPerSegment: Record<T[keyof T], number>;
//   segmentEnum: T;
//   onChange: InputSegmentChangeEventHandler<T[keyof T], string>;
//   onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
// }

// // The Context itself MUST be defined with a fixed type.
// // We use the most generic version of InputBoxContextType that the provider handles.
// export const InputBoxContext = createContext<InputBoxContextType | null>(null);

// // The Provider takes the generic T and provides the value.
// export const InputBoxProvider = <T extends Record<string, string>>({
//   children,
//   charsPerSegment,
//   segmentEnum,
//   onChange,
//   onBlur,
// }: InputBoxProviderProps<T>) => {
//   const value = useMemo(
//     () => ({
//       charsPerSegment,
//       segmentEnum,
//       onChange,
//       onBlur,
//     }),
//     [charsPerSegment, segmentEnum, onChange, onBlur],
//   );

//   // The 'value' here has the correct specific type T
//   return (
//     <InputBoxContext.Provider value={value as InputBoxContextType}>
//       {children}
//     </InputBoxContext.Provider>
//   );
// };

// // This is where we force the type T back.
// // We assert the type *at the point of consumption*.
// // You must provide a type argument when using the hook (e.g., useInputBoxContext<MyEnum>())
// export const useInputBoxContext = <T extends string>() => {
//   // Assert the type of the context to be the specific generic type T
//   const context = useContext(InputBoxContext) as InputBoxContextType<T> | null;

//   if (!context) {
//     throw new Error(
//       'useInputBoxContext must be used within an InputBoxProvider',
//     );
//   }
//   return context;
// };

import React, { createContext, useContext, useMemo } from 'react';
import { InputSegmentChangeEventHandler } from '../InputSegment/InputSegment.types';

// --- Type Helpers ---

// Helper type to represent the constrained Enum Object structure
type SegmentEnumObject<T extends string> = Record<string, T>;

// --- Context Definition ---

// 1. T is the string union of segment names (e.g., 'areaCode' | 'prefix')
export interface InputBoxContextType<T extends string = string> {
  charsPerSegment: Record<T, number>; // Keyed by T
  segmentEnum: SegmentEnumObject<T>; // Values are T
  onChange: InputSegmentChangeEventHandler<T, string>;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// --- Provider Props ---

// 2. Props are generic over T and use SegmentEnumObject<T> for segmentEnum
export interface InputBoxProviderProps<T extends string> {
  children: React.ReactNode;
  charsPerSegment: Record<T, number>;
  segmentEnum: SegmentEnumObject<T>;
  onChange: InputSegmentChangeEventHandler<T, string>;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// 3. The Context constant is defined with the default/fixed type
export const InputBoxContext = createContext<InputBoxContextType | null>(null);

// --- Provider Component ---

// 4. Provider is generic over T, the string union
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
  return (
    <InputBoxContext.Provider value={value as unknown as InputBoxContextType}>
      {children}
    </InputBoxContext.Provider>
  );
};

// --- Hook Component ---

// 5. The hook is generic over T, the string union
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
