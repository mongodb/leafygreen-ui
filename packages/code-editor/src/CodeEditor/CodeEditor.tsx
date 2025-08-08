import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { type EditorView } from '@codemirror/view';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import {
  getEditorStyles,
  getLoaderStyles,
  getLoadingTextStyles,
  getToolbarStyles,
} from './CodeEditor.styles';
import {
  CodeEditorHandle,
  type CodeEditorProps,
  type HTMLElementWithCodeMirror,
  ToolbarVariant,
} from './CodeEditor.types';
import { useExtensions, useLazyModules, useModuleLoaders } from './hooks';

export const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(
  (props, forwardedRef) => {
    const {
      defaultValue,
      value,
      forceParsing: forceParsingProp = false,
      onChange: onChangeProp,
      isLoading: isLoadingProp = false,
      extensions: consumerExtensions = [],
      darkMode: darkModeProp,
      baseFontSize: baseFontSizeProp,
      toolbarVariant = ToolbarVariant.Window,
      className,
      height,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      width,
      language,
      enableClickableUrls,
      enableCodeFolding,
      enableLineNumbers,
      enableLineWrapping,
      indentUnit,
      indentSize,
      placeholder,
      readOnly,
      tooltips,
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
      props: {
        ...props,
        forceParsing: forceParsingProp,
        onChange: onChangeProp,
        isLoading: isLoadingProp,
        extensions: consumerExtensions,
        darkMode: darkModeProp,
        baseFontSize: baseFontSizeProp,
        toolbarVariant,
      },
      modules,
    });

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
              const editorText = editorViewRef.current?.state.sliceDoc() ?? '';
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
    ]);

    useImperativeHandle(forwardedRef, () => ({
      getEditorViewInstance: () => editorViewRef.current,
    }));

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
        })}
        {...rest}
      >
        <div className={getToolbarStyles(theme, toolbarVariant)}></div>
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
