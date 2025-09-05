import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { type EditorView, type ViewUpdate } from '@codemirror/view';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { CodeEditorCopyButton } from '../CodeEditorCopyButton';
import { CopyButtonVariant } from '../CodeEditorCopyButton/CodeEditorCopyButton.types';

import { useModules } from './hooks/useModules';
import {
  getCopyButtonStyles,
  getEditorStyles,
  getLoaderStyles,
  getLoadingTextStyles,
} from './CodeEditor.styles';
import {
  CodeEditorHandle,
  type CodeEditorProps,
  CopyButtonAppearance,
  CopyButtonLgId,
  type HTMLElementWithCodeMirror,
} from './CodeEditor.types';
import { CodeEditorProvider } from './CodeEditorContext';
import { LANGUAGE_EXTENSION_MAP } from './constants';
import { useCodeFormatter, useExtensions } from './hooks';

export const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(
  (props, forwardedRef) => {
    const {
      baseFontSize: baseFontSizeProp,
      className,
      copyButtonAppearance,
      darkMode: darkModeProp,
      defaultValue,
      enableClickableUrls,
      enableCodeFolding,
      enableLineNumbers,
      enableLineWrapping,
      extensions: consumerExtensions = [],
      forceParsing: forceParsingProp = false,
      height,
      indentSize,
      indentUnit,
      isLoading: isLoadingProp = false,
      language,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      onChange: onChangeProp,
      panel,
      placeholder,
      preLoadedModules,
      readOnly,
      tooltips,
      value,
      width,
      ...rest
    } = props;

    const { theme } = useDarkMode(darkModeProp);
    const [controlledValue, setControlledValue] = useState(value || '');
    const isControlled = value !== undefined;
    const editorContainerRef = useRef<HTMLDivElement | null>(null);
    const editorViewRef = useRef<EditorView | null>(null);

    const { modules, isLoading } = useModules(props);

    // Get formatting functionality
    const { formatCode, isFormattingAvailable } = useCodeFormatter({
      props: { language, indentSize, indentUnit },
      modules: modules,
    });

    // Get custom extensions
    const customExtensions = useExtensions({
      editorViewInstance: editorViewRef.current,
      props: {
        ...props,
        forceParsing: forceParsingProp,
        onChange: onChangeProp,
        isLoading: isLoadingProp,
        extensions: consumerExtensions,
        darkMode: darkModeProp,
        baseFontSize: baseFontSizeProp,
      },
      modules: modules,
    });

    // Get the current contents of the editor
    const getContents = useCallback(() => {
      return editorViewRef.current?.state.sliceDoc() ?? '';
    }, []);

    /**
     * Formats the current code content and updates the editor.
     * @returns Promise resolving to the formatted code string
     */
    const handleFormatCode = useCallback(async (): Promise<string> => {
      const currentContent = getContents();

      if (!isFormattingAvailable) {
        console.warn('Formatting is not available for the current language');
        return currentContent;
      }

      try {
        const formattedContent = await formatCode(currentContent);

        // Update the editor with formatted content
        if (editorViewRef.current && formattedContent !== currentContent) {
          const transaction = editorViewRef.current.state.update({
            changes: {
              from: 0,
              to: editorViewRef.current.state.doc.length,
              insert: formattedContent,
            },
          });

          editorViewRef.current.dispatch(transaction);

          onChangeProp?.(formattedContent);

          // Update controlled value if in controlled mode
          if (isControlled) {
            setControlledValue(formattedContent);
          }
        }

        return formattedContent;
      } catch (error) {
        console.error('Error formatting code:', error);
        return getContents();
      }
    }, [
      isFormattingAvailable,
      getContents,
      formatCode,
      isControlled,
      onChangeProp,
    ]);

    /**
     * Undoes the last editor action if possible.
     * @returns boolean indicating if undo was successful
     */
    const handleUndo = useCallback((): boolean => {
      const commands = modules?.['@codemirror/commands'];

      if (!editorViewRef.current || !commands) {
        console.warn('Undo is not available - editor or commands not loaded');
        return false;
      }

      return commands.undo(editorViewRef.current);
    }, [modules]);

    /**
     * Redoes the last undone editor action if possible.
     * @returns boolean indicating if redo was successful
     */
    const handleRedo = useCallback((): boolean => {
      const commands = modules?.['@codemirror/commands'];

      if (!editorViewRef.current || !commands) {
        console.warn('Redo is not available - editor or commands not loaded');
        return false;
      }

      return commands.redo(editorViewRef.current);
    }, [modules]);

    /**
     * Downloads the current editor content as a file.
     * @param filename - Optional custom filename. If provided, used exactly as-is with no modifications. If omitted, defaults to 'code' with appropriate extension based on language.
     */
    const handleDownloadContent = useCallback(
      (filename?: string): void => {
        const content = getContents();

        if (!content.trim()) {
          console.warn('Cannot download empty content');
          return;
        }

        let fullFilename: string;

        if (filename === undefined) {
          // No filename provided, use default with appropriate extension
          const extension = language ? LANGUAGE_EXTENSION_MAP[language] : 'txt';
          fullFilename = `code.${extension}`;
        } else {
          // Use provided filename exactly as-is
          fullFilename = filename;
        }

        // Create blob and download
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        // Create temporary anchor element for download
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = fullFilename;
        anchor.style.display = 'none';

        // Trigger download
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

        // Clean up object URL
        URL.revokeObjectURL(url);
      },
      [getContents, language],
    );

    useLayoutEffect(() => {
      const EditorView = modules?.['@codemirror/view'];
      const commands = modules?.['@codemirror/commands'];
      const searchModule = modules?.['@codemirror/search'];
      const Prec = modules?.['@codemirror/state']?.Prec;

      if (
        !editorContainerRef?.current ||
        !EditorView ||
        !Prec ||
        !commands ||
        !searchModule
      ) {
        return;
      }

      const domNode = editorContainerRef.current as HTMLElementWithCodeMirror;

      editorViewRef.current = new EditorView.EditorView({
        doc: controlledValue || defaultValue,
        parent: domNode,
        extensions: [
          ...consumerExtensions.map(extension => Prec.highest(extension)),

          commands.history(),
          searchModule.search(),

          EditorView.EditorView.updateListener.of((update: ViewUpdate) => {
            if (isControlled && update.docChanged) {
              const editorText = getContents();
              onChangeProp?.(editorText);
              setControlledValue(editorText);
            }
          }),

          EditorView.keymap.of([
            {
              key: 'Escape',
              run: view => {
                // Move focus outside the editor to allow normal tab navigation
                view.contentDOM.blur();
                return true;
              },
            },
            {
              key: 'Tab',
              run: commands.insertTab,
            },
            {
              key: 'Shift-Tab',
              run: commands.indentLess,
            },
            ...searchModule.searchKeymap,
            ...commands.defaultKeymap,
            ...commands.historyKeymap,
          ]),

          ...customExtensions,
        ],
      });

      if (forceParsingProp) {
        const Language = modules?.['@codemirror/language'];
        const docLength = editorViewRef.current?.state.doc.length;

        if (Language && Language.forceParsing && docLength > 0) {
          Language.forceParsing(editorViewRef.current, docLength, 150);
        }
      }

      return () => {
        /** Delete the CodeMirror instance from the DOM node */
        delete domNode._cm;
        editorViewRef.current?.destroy();
      };
    }, [
      value,
      modules,
      controlledValue,
      defaultValue,
      isControlled,
      onChangeProp,
      consumerExtensions,
      customExtensions,
      forceParsingProp,
      getContents,
    ]);

    useImperativeHandle(forwardedRef, () => ({
      getEditorViewInstance: () => editorViewRef.current,
      getContents,
      formatCode: handleFormatCode,
      isFormattingAvailable,
      undo: handleUndo,
      redo: handleRedo,
      downloadContent: handleDownloadContent,
    }));

    const contextValue = {
      getContents,
      formatCode: handleFormatCode,
      isFormattingAvailable,
      language,
      undo: handleUndo,
      redo: handleRedo,
      downloadContent: handleDownloadContent,
    };

    return (
      <div
        ref={editorContainerRef}
        className={getEditorStyles({
          width,
          minWidth,
          maxWidth,
          height,
          minHeight,
          maxHeight,
          className,
          copyButtonAppearance,
        })}
        {...rest}
      >
        {panel && (
          <CodeEditorProvider value={contextValue}>{panel}</CodeEditorProvider>
        )}
        {!panel &&
          (copyButtonAppearance === CopyButtonAppearance.Hover ||
            copyButtonAppearance === CopyButtonAppearance.Persist) && (
            <CodeEditorCopyButton
              getContentsToCopy={getContents}
              className={getCopyButtonStyles(copyButtonAppearance)}
              variant={CopyButtonVariant.Button}
              disabled={isLoadingProp || isLoading}
              data-lgid={CopyButtonLgId}
            />
          )}
        {(isLoadingProp || isLoading) && (
          <div
            className={getLoaderStyles({
              theme,
              width,
              minWidth,
              maxWidth,
              height,
              minHeight,
              maxHeight,
            })}
          >
            <Body className={getLoadingTextStyles(theme)}>
              Loading code editor...
            </Body>
          </div>
        )}
      </div>
    );
  },
);

CodeEditor.displayName = 'CodeEditor';
