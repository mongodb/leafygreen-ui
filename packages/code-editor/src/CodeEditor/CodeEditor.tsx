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
import { useExtensions, useLazyModules, useModuleLoaders } from './hooks';

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

    const moduleLoaders = useModuleLoaders(props);
    const { isLoading, modules } = useLazyModules(moduleLoaders);

    const customExtensions = useExtensions({
      editorViewInstance: editorViewRef.current,
      props,
      modules,
    });

    const getContents = useCallback(() => {
      return editorViewRef.current?.state.sliceDoc() ?? '';
    }, []);

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

          // Core configurations ------------
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

          // Custom extensions ------------
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
    }));

    const contextValue = {
      getContents,
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
