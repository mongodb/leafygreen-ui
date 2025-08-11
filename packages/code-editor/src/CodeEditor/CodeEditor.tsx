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

import { CopyButton } from '../CopyButton';

import {
  getEditorStyles,
  getLoaderStyles,
  getLoadingTextStyles,
  minimalCopyButtonStyles,
} from './CodeEditor.styles';
import {
  CodeEditorHandle,
  type CodeEditorProps,
  CopyButtonAppearance,
  type HTMLElementWithCodeMirror,
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
      panel,
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
      copyButtonAppearance = CopyButtonAppearance.Hover,
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
      },
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
    }));

    const panelNode = React.isValidElement(panel)
      ? React.cloneElement(panel as React.ReactElement<any>, {
          getContents,
        })
      : panel;

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
        {panelNode}
        {!panel &&
          (copyButtonAppearance === CopyButtonAppearance.Hover ||
            copyButtonAppearance === CopyButtonAppearance.Persist) && (
            <CopyButton
              getContents={getContents}
              className={minimalCopyButtonStyles}
              isPanelVariant={false}
              disabled={isLoadingProp || isLoading}
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
