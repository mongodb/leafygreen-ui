import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { type EditorView } from '@codemirror/view';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { CodeEditorCopyButton } from '../CodeEditorCopyButton';
import { CopyButtonVariant } from '../CodeEditorCopyButton/CodeEditorCopyButton.types';

import { useFormattingModuleLoaders } from './hooks/formatting/useFormattingModuleLoaders';
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
import {
  useCodeFormatter,
  useExtensions,
  useLazyModules,
  useModuleLoaders,
} from './hooks';

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

    // Load modules
    const coreModuleLoaders = useModuleLoaders(props);
    const formattingModuleLoaders = useFormattingModuleLoaders(language);
    const { isLoading, modules } = useLazyModules({
      ...coreModuleLoaders,
      ...formattingModuleLoaders,
    });

    // Get formatting functionality
    const { formatCode, isFormattingAvailable } = useCodeFormatter({
      props: { language, indentSize, indentUnit },
      modules,
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
      modules,
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

          // Update controlled value if in controlled mode
          if (isControlled) {
            setControlledValue(formattedContent);
            onChangeProp?.(formattedContent);
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

    useLayoutEffect(() => {
      const EditorView = modules?.['@codemirror/view'];
      const commands = modules?.['@codemirror/commands'];
      const Prec = modules?.['@codemirror/state']?.Prec;

      if (!editorContainerRef?.current || !EditorView || !Prec || !commands) {
        return;
      }

      const domNode = editorContainerRef.current as HTMLElementWithCodeMirror;

      editorViewRef.current = new EditorView.EditorView({
        doc: controlledValue || defaultValue,
        parent: domNode,
        extensions: [
          ...consumerExtensions.map(extension => Prec.highest(extension)),

          commands.history(),

          EditorView.EditorView.updateListener.of(update => {
            if (isControlled && update.docChanged) {
              const editorText = getContents();
              onChangeProp?.(editorText);
              setControlledValue(editorText);
            }
          }),

          EditorView.keymap.of([
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
    }));

    const contextValue = {
      getContents,
      formatCode: handleFormatCode,
      isFormattingAvailable,
      language,
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
