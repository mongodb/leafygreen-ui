import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createRoot } from 'react-dom/client';
import { type EditorView, type ViewUpdate } from '@codemirror/view';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { findChild } from '@leafygreen-ui/lib';
import { Body, useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { CodeEditorContextMenu } from '../CodeEditorContextMenu';
import { CodeEditorCopyButton } from '../CodeEditorCopyButton';
import { CopyButtonVariant } from '../CodeEditorCopyButton/CodeEditorCopyButton.types';
import { Panel as CodeEditorPanel } from '../Panel';
import { SearchPanel } from '../SearchPanel';
import { getLgIds } from '../utils';

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
  CodeEditorSubcomponentProperty,
  type CodeMirrorExtension,
  CopyButtonAppearance,
  type HTMLElementWithCodeMirror,
  PanelType,
} from './CodeEditor.types';
import { CodeEditorProvider } from './CodeEditorContext';
import { LANGUAGE_EXTENSION_MAP } from './constants';
import { useCodeFormatter, useExtensions } from './hooks';

const BaseCodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(
  (props, forwardedRef) => {
    const {
      baseFontSize: baseFontSizeProp,
      children,
      className,
      copyButtonAppearance = CopyButtonAppearance.Hover,
      customContextMenuItems,
      'data-lgid': dataLgId,
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
      placeholder,
      preLoadedModules,
      readOnly,
      tooltips,
      value,
      width,
      ...rest
    } = props;

    const lgIds = getLgIds(dataLgId);
    const panel = findChild(children, CodeEditorSubcomponentProperty.Panel);

    const { darkMode, theme } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
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
        baseFontSize,
        /**
         * CodeEditorTooltip in particular renders outside of the LeafyGreenProvider
         * so it won't be able to access the theme from the provider. So we must
         * pass the darkMode prop from the parent.
         */
        darkMode,
      },
      modules: modules,
      hasPanel: !!panel,
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
          const extension =
            language && language in LANGUAGE_EXTENSION_MAP
              ? LANGUAGE_EXTENSION_MAP[language]
              : 'txt';
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
          ...consumerExtensions.map((extension: CodeMirrorExtension) =>
            Prec.highest(extension),
          ),

          commands.history(),
          searchModule.search({
            createPanel: view => {
              const dom = document.createElement('div');
              dom.style.position = 'absolute';
              dom.style.top = '-8px'; // Accounts for top padding of the editor
              dom.style.right = '0';
              dom.style.left = '0';
              dom.style.display = 'flex';
              dom.style.justifyContent = 'flex-end';

              createRoot(dom).render(
                React.createElement(SearchPanel, {
                  view,
                }),
              );
              return { dom, top: true };
            },
          }),

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
              run: (view: EditorView) => {
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
        const docLength = editorViewRef.current?.state.doc.length ?? 0;

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
      lgIds,
    };

    return (
      <CodeEditorContextMenu
        customMenuItems={customContextMenuItems}
        data-lgid={dataLgId}
      >
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
          data-lgid={lgIds.root}
          {...rest}
        >
          {panel && (
            <div data-no-context-menu="true">
              <CodeEditorProvider value={contextValue}>
                {panel}
              </CodeEditorProvider>
            </div>
          )}
          {!panel &&
            (copyButtonAppearance === CopyButtonAppearance.Hover ||
              copyButtonAppearance === CopyButtonAppearance.Persist) && (
              <CodeEditorCopyButton
                getContentsToCopy={getContents}
                className={getCopyButtonStyles(copyButtonAppearance)}
                variant={CopyButtonVariant.Button}
                disabled={isLoadingProp || isLoading}
                data-lgid={lgIds.copyButton}
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
              data-lgid={lgIds.loader}
            >
              <Body className={getLoadingTextStyles(theme)}>
                Loading code editor...
              </Body>
            </div>
          )}
        </div>
      </CodeEditorContextMenu>
    );
  },
);

BaseCodeEditor.displayName = 'CodeEditor';

const Panel = CodeEditorPanel as PanelType;
Panel[CodeEditorSubcomponentProperty.Panel] = true;

export const CodeEditor = Object.assign(BaseCodeEditor, { Panel });
