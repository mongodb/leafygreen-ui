import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { type EditorView, type ViewUpdate } from '@codemirror/view';
import debounce from 'lodash/debounce';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { findChild } from '@leafygreen-ui/lib';
import { Size, Spinner } from '@leafygreen-ui/loading-indicator/spinner';
import { Body, useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { CodeEditorContextMenu } from '../CodeEditorContextMenu';
import { CodeEditorCopyButton } from '../CodeEditorCopyButton';
import { CopyButtonVariant } from '../CodeEditorCopyButton/CodeEditorCopyButton.types';
import { Panel as CodeEditorPanel } from '../Panel';
import { getLgIds } from '../utils';

import { useSearchPanelExtension } from './hooks/extensions/useSearchPanelExtension';
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
  CodeEditorSelectors,
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
      enableSearchPanel = true,
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
    const [undoDepth, setUndoDepth] = useState(0);
    const [redoDepth, setRedoDepth] = useState(0);
    const [hasTopShadow, setHasTopShadow] = useState(false);
    const [hasBottomShadow, setHasBottomShadow] = useState(false);

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

    // Track whether extensions have been initialized
    const [extensionsInitialized, setExtensionsInitialized] = useState(false);

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
      const EditorView = modules?.['@codemirror/view'];

      if (!editorViewRef.current || !commands || !EditorView) {
        console.warn('Undo is not available - editor or commands not loaded');
        return false;
      }

      const result = commands.undo(editorViewRef.current);

      // Focus the editor and scroll cursor into view after undo
      if (result && editorViewRef.current) {
        editorViewRef.current.focus();
        editorViewRef.current.dispatch({
          effects: EditorView.EditorView.scrollIntoView(
            editorViewRef.current.state.selection.main,
            { y: 'center' },
          ),
        });
      }

      return result;
    }, [modules]);

    /**
     * Redoes the last undone editor action if possible.
     * @returns boolean indicating if redo was successful
     */
    const handleRedo = useCallback((): boolean => {
      const commands = modules?.['@codemirror/commands'];
      const EditorView = modules?.['@codemirror/view'];

      if (!editorViewRef.current || !commands || !EditorView) {
        console.warn('Redo is not available - editor or commands not loaded');
        return false;
      }

      const result = commands.redo(editorViewRef.current);

      // Focus the editor and scroll cursor into view after redo
      if (result && editorViewRef.current) {
        editorViewRef.current.focus();
        editorViewRef.current.dispatch({
          effects: EditorView.EditorView.scrollIntoView(
            editorViewRef.current.state.selection.main,
            { y: 'center' },
          ),
        });
      }

      return result;
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

    const searchPanelExtension = useSearchPanelExtension({
      props: {
        ...props,
        darkMode,
        baseFontSize,
      },
      modules,
      hasPanel: !!panel,
    });

    // Create the editor when modules are loaded
    useLayoutEffect(() => {
      const EditorView = modules?.['@codemirror/view'];

      if (!editorContainerRef?.current || !EditorView) {
        return;
      }

      const domNode = editorContainerRef.current as HTMLElementWithCodeMirror;

      // Reset extensions initialized state
      setExtensionsInitialized(false);

      // Create editor with minimal setup - extensions will be configured in separate effect
      editorViewRef.current = new EditorView.EditorView({
        doc: controlledValue || defaultValue,
        parent: domNode,
      });

      return () => {
        /** Delete the CodeMirror instance from the DOM node */
        delete domNode._cm;
        editorViewRef.current?.destroy();
      };
      // Only recreate editor when modules are loaded
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modules]);

    // Configure/update extensions whenever relevant props change
    useLayoutEffect(() => {
      const EditorView = modules?.['@codemirror/view'];
      const commands = modules?.['@codemirror/commands'];
      const searchModule = modules?.['@codemirror/search'];
      const Prec = modules?.['@codemirror/state']?.Prec;
      const StateEffect = modules?.['@codemirror/state']?.StateEffect;

      if (
        !editorViewRef.current ||
        !EditorView ||
        !Prec ||
        !commands ||
        !searchModule ||
        !StateEffect
      ) {
        return;
      }

      // Configure the editor with necessary extensions
      editorViewRef.current.dispatch({
        effects: StateEffect.reconfigure.of([
          ...consumerExtensions.map((extension: CodeMirrorExtension) =>
            Prec.highest(extension),
          ),

          commands.history(),

          searchPanelExtension,

          EditorView.EditorView.updateListener.of((update: ViewUpdate) => {
            if (update.docChanged) {
              const commands = modules?.['@codemirror/commands'];
              const state = editorViewRef.current?.state;

              if (isControlled) {
                const editorText = getContents();
                onChangeProp?.(editorText);
                setControlledValue(editorText);
              }

              if (commands && state) {
                setUndoDepth(commands.undoDepth(state));
                setRedoDepth(commands.redoDepth(state));
              }
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
            ...(enableSearchPanel && searchModule
              ? searchModule.searchKeymap
              : []),
            ...commands.defaultKeymap,
            ...commands.historyKeymap,
          ]),

          ...customExtensions,
        ]),
      });

      // Wait for next frame to ensure extensions are rendered before hiding loading overlay
      const rafId = requestAnimationFrame(() => {
        setExtensionsInitialized(true);
      });

      if (forceParsingProp) {
        const Language = modules?.['@codemirror/language'];
        const docLength = editorViewRef.current?.state.doc.length ?? 0;

        if (Language && Language.forceParsing && docLength > 0) {
          Language.forceParsing(editorViewRef.current, docLength, 150);
        }
      }

      return () => {
        cancelAnimationFrame(rafId);
      };
    }, [
      consumerExtensions,
      customExtensions,
      forceParsingProp,
      getContents,
      enableSearchPanel,
      darkModeProp,
      baseFontSizeProp,
      panel,
      searchPanelExtension,
      isControlled,
      modules,
      onChangeProp,
    ]);

    // Debounced scroll shadow update function
    const debouncedUpdateScrollShadows = useMemo(
      () =>
        debounce(
          (scrollerElement: HTMLElement) => {
            const hasTop = scrollerElement.scrollTop > 0;
            const hasBottom =
              Math.abs(
                scrollerElement.scrollHeight -
                  scrollerElement.clientHeight -
                  scrollerElement.scrollTop,
              ) >= 1;

            // Only update state if values have actually changed
            setHasTopShadow(prev => (prev !== hasTop ? hasTop : prev));
            setHasBottomShadow(prev => (prev !== hasBottom ? hasBottom : prev));
          },
          50,
          { leading: true },
        ),
      [],
    );

    // Handle scroll shadows for overflow indication
    useLayoutEffect(() => {
      if (!editorContainerRef.current || !editorViewRef.current) {
        return;
      }

      const scrollerElement = editorContainerRef.current.querySelector(
        CodeEditorSelectors.Scroller, // CM Element that handles scrolling
      ) as HTMLElement | null;

      if (!scrollerElement) {
        return;
      }

      const handleScroll = () => {
        debouncedUpdateScrollShadows(scrollerElement);
      };

      // Initial check (immediate, no debounce)
      debouncedUpdateScrollShadows(scrollerElement);
      debouncedUpdateScrollShadows.flush(); // Execute immediately for initial state

      // Listen for scroll events
      scrollerElement.addEventListener('scroll', handleScroll);

      // Also check on resize in case content changes
      const resizeObserver = new ResizeObserver(handleScroll);
      resizeObserver.observe(scrollerElement);

      return () => {
        scrollerElement.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
        debouncedUpdateScrollShadows.cancel(); // Cancel any pending debounced calls
      };
    }, [modules, debouncedUpdateScrollShadows]);

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
      undoDepth,
      redo: handleRedo,
      redoDepth,
      downloadContent: handleDownloadContent,
      lgIds,
      maxWidth,
      minWidth,
      width,
      readOnly,
      darkMode,
      baseFontSize,
    };

    const numOfLines = (
      value ??
      defaultValue ??
      (typeof placeholder === 'string' ? placeholder : '')
    ).split('\n').length;

    return (
      <LeafyGreenProvider
        darkMode={darkMode}
        baseFontSize={baseFontSize === 13 ? 14 : 16}
      >
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
              theme,
              hasTopShadow,
              hasBottomShadow,
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
                  disabled={
                    isLoadingProp || isLoading || !extensionsInitialized
                  }
                  data-lgid={lgIds.copyButton}
                />
              )}
            {(isLoadingProp || isLoading || !extensionsInitialized) && (
              <div
                className={getLoaderStyles({
                  theme,
                  width,
                  minWidth,
                  maxWidth,
                  height,
                  minHeight,
                  maxHeight,
                  baseFontSize,
                  numOfLines,
                  isLoading,
                })}
                data-lgid={lgIds.loader}
              >
                <Body className={getLoadingTextStyles(theme)}>
                  <Spinner size={Size.Small} />
                  Loading code editor
                </Body>
              </div>
            )}
          </div>
        </CodeEditorContextMenu>
      </LeafyGreenProvider>
    );
  },
);

BaseCodeEditor.displayName = 'CodeEditor';

const Panel = CodeEditorPanel as PanelType;
Panel[CodeEditorSubcomponentProperty.Panel] = true;

export const CodeEditor = Object.assign(BaseCodeEditor, { Panel });
