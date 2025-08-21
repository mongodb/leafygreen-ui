import React, { createContext, useContext } from 'react';

/**
 * Internal context values provided by CodeEditor to its children (like Panel).
 */
export interface CodeEditorContextValue {
  /**
   * Function to retrieve the current editor contents.
   */
  getContents: () => string;
}

// Default context value for when Panel is used standalone
const defaultContextValue: CodeEditorContextValue = {
  getContents: () => '',
};

const CodeEditorContext =
  createContext<CodeEditorContextValue>(defaultContextValue);

/**
 * Provider component that makes CodeEditor internal values available to child components.
 * This is used internally and should not be used by consumers.
 */
export function CodeEditorProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: CodeEditorContextValue;
}) {
  return (
    <CodeEditorContext.Provider value={value}>
      {children}
    </CodeEditorContext.Provider>
  );
}

/**
 * Hook to access CodeEditor internal context values.
 * This is intended for use by internal components like Panel.
 * When used outside of CodeEditor, returns default values.
 */
export function useCodeEditorContext(): CodeEditorContextValue {
  return useContext(CodeEditorContext);
}
