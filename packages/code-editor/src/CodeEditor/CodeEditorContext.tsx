import React, { createContext, useContext } from 'react';

import { getLgIds, type GetLgIdsReturnType } from '../utils/getLgIds';

import { type LanguageName } from './hooks/extensions/useLanguageExtension';

/**
 * Internal context values provided by CodeEditor to its children (like Panel).
 */
export interface CodeEditorContextValue {
  /**
   * Function to retrieve the current editor contents.
   */
  getContents: () => string;

  /**
   * Function to format the current editor content.
   */
  formatCode: () => Promise<string>;

  /**
   * Stateful boolean indicating if formatting is available for the current language.
   * This updates when formatting modules are loaded or language changes.
   */
  isFormattingAvailable: boolean;

  /**
   * Current language for formatting context.
   */
  language?: LanguageName;

  /**
   * Function to undo the last editor action.
   * @returns boolean indicating if undo was successful
   */
  undo: () => boolean;

  /**
   * Function to redo the last undone editor action.
   * @returns boolean indicating if redo was successful
   */
  redo: () => boolean;

  /**
   * Function to download the current editor content as a file with an appropriate extension
   * based on the selected language.
   * @param filename - Optional custom filename (without extension). Defaults to 'code'
   */
  downloadContent: (filename?: string) => void;

  /**
   * Generated lgIds from the CodeEditor component, enabling child components
   * to inherit custom data-lgid prefixes passed to the parent CodeEditor.
   */
  lgIds: GetLgIdsReturnType;
}

// Default context value for when Panel is used standalone
const defaultContextValue: CodeEditorContextValue = {
  getContents: () => '',
  formatCode: async () => '',
  isFormattingAvailable: false,
  language: undefined,
  undo: () => false,
  redo: () => false,
  downloadContent: () => {
    console.warn('downloadContent is not available - editor context not found');
  },
  lgIds: getLgIds(), // Use default lgIds when used standalone
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
