import { useEffect, useState } from 'react';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../moduleLoaders.types';

import { formatCode } from './formatters';
import { areModulesLoaded } from './utils';

/**
 * Hook for creating a code formatting utility that can format code based on the selected language.
 *
 * This hook provides language-specific code formatting capabilities using pre-loaded
 * formatting modules. It supports both Prettier-based formatters and WASM-based formatters.
 *
 * @param params - Configuration object
 * @param params.props - Partial CodeEditor props containing language and indent configuration
 * @param params.modules - Pre-loaded CodeMirror and formatting modules
 * @returns Object containing the format function and availability check
 */
export function useCodeFormatter({
  props,
  modules,
}: {
  props: Partial<CodeEditorProps>;
  modules: Partial<CodeEditorModules>;
}) {
  // Extract editor configuration for consistent formatting
  const editorTabWidth = props.indentSize ?? 2;
  const editorUseTabs = props.indentUnit === 'tab';
  const [isFormattingAvailable, setIsFormattingAvailable] = useState(false);

  /**
   * Formats code using the appropriate formatter based on the selected language.
   * Uses opinionated formatting settings for consistency.
   *
   * @param code - The code string to format
   * @returns Promise resolving to formatted code, or original code if formatting fails/unavailable
   */
  const handleFormatCode = async (code: string): Promise<string> => {
    return formatCode({
      code,
      language: props.language,
      editorTabWidth,
      editorUseTabs,
      modules,
    });
  };

  useEffect(() => {
    setIsFormattingAvailable(
      (props.language &&
        areModulesLoaded({ language: props.language, modules })) ||
        false,
    );
  }, [modules, props.language]);

  return {
    formatCode: handleFormatCode,
    isFormattingAvailable,
  };
}
