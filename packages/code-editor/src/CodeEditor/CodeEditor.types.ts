import { ForwardRefExoticComponent, PropsWithChildren } from 'react';
import { type EditorState, type Extension } from '@codemirror/state';
import { type EditorView } from '@codemirror/view';

import { type DarkModeProps, type LgIdProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { CodeEditorTooltipProps } from '../CodeEditorTooltip';
import { type ContextMenuItem } from '../ContextMenu';
import { PanelProps } from '../Panel';

import { type LanguageName } from './hooks/extensions/useLanguageExtension';
import { CodeEditorModules } from './hooks';

/**
 * Static property names used to identify CodeEditor compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const CodeEditorSubcomponentProperty = {
  Panel: 'isLGPanel',
} as const;

/**
 * Type representing the possible static property names for CodeEditor subcomponents.
 */
export type CodeEditorSubcomponentProperty =
  (typeof CodeEditorSubcomponentProperty)[keyof typeof CodeEditorSubcomponentProperty];

export type PanelType = ForwardRefExoticComponent<PanelProps> & {
  [CodeEditorSubcomponentProperty.Panel]?: boolean;
};

/**
 * Re-export of CodeMirror's {@link Extension} type.
 * Extensions provide additional functionality to the editor.
 * @see {@link https://codemirror.net/docs/ref/#state.Extension}
 */
export type CodeMirrorExtension = Extension;

/**
 * Re-export of CodeMirror's {@link EditorState} type.
 * Represents the complete editor state configuration.
 * @see {@link https://codemirror.net/docs/ref/#state.EditorState}
 */
export type CodeMirrorState = EditorState;

/**
 * Re-export of CodeMirror's {@link EditorView} type.
 * The main editor component that displays and manages the document.
 * @see {@link https://codemirror.net/docs/ref/#view.EditorView}
 */
export type CodeMirrorView = EditorView;

/**
 * Type for the DOM node that the CodeMirror editor is rendered into.
 */
export interface HTMLElementWithCodeMirror extends HTMLDivElement {
  _cm?: EditorView;
}

/**
 * The appearance of the copy button.
 */
export const CopyButtonAppearance = {
  Hover: 'hover',
  Persist: 'persist',
  None: 'none',
} as const;
export type CopyButtonAppearance =
  (typeof CopyButtonAppearance)[keyof typeof CopyButtonAppearance];

export const CopyButtonLgId = 'lg-code_editor-code_editor_copy_button';

/**
 * The important elements in the code mirror editor have regular (non-generated)
 * CSS class names, which can be targeted. For example, the outer element has
 * class cm-editor. This is a mapping of those selectors which can be used for
 * both testing and styling.
 */
export const CodeEditorSelectors = {
  ActiveLine: '.cm-activeLine',
  ActiveLineGutter: '.cm-activeLineGutter',
  Content: '.cm-content',
  CopyButton: `[data-lgid="${CopyButtonLgId}"]`,
  Cursor: '.cm-cursor',
  Diagnostic: '.cm-diagnostic',
  DiagnosticInfo: '.cm-diagnostic-info',
  Editor: '.cm-editor',
  Focused: '.cm-focused',
  FoldGutter: '.cm-foldGutter',
  GutterElement: '.cm-gutterElement',
  Gutters: '.cm-gutters',
  HyperLink: '.cm-hyper-link-icon',
  InnerEditor: '.cm-scroller',
  Line: '.cm-line',
  LineNumbers: '.cm-lineNumbers',
  LineWrapping: '.cm-lineWrapping',
  SearchInput:
    'input[type="text"], .cm-textfield, input[placeholder*="search" i]',
  SearchPanel: '.cm-panel',
  SearchPanelContainer: '.cm-panels',
  SearchPanelContainerTop: '.cm-panels-top',
  SelectionBackground: '.cm-selectionBackground',
  Tooltip: '.cm-tooltip',
} as const;
export type CodeEditorSelectors =
  (typeof CodeEditorSelectors)[keyof typeof CodeEditorSelectors];

export const IndentUnits = {
  Space: 'space',
  Tab: 'tab',
} as const;
export type IndentUnits = (typeof IndentUnits)[keyof typeof IndentUnits];

export const CodeEditorTooltipSeverity = {
  Info: 'info',
  Warning: 'warning',
  Error: 'error',
  Hint: 'hint',
} as const;
export type CodeEditorTooltipSeverity =
  (typeof CodeEditorTooltipSeverity)[keyof typeof CodeEditorTooltipSeverity];

export interface CodeEditorTooltip
  extends Omit<CodeEditorTooltipProps, 'darkMode' | 'baseFontSize'> {
  /**
   * Which line in the document the tooltip should be rendered. 1 based.
   */
  line: number;

  /**
   * The length the text that the tooltip should cover in characters.
   */
  length: number;

  /**
   * Which character, going from left to right, the tooltip should start. 1 based.
   * Defaults to 1.
   */
  column?: number;

  /**
   * Severity level of the tooltip. Defaults to 'info'.
   */
  severity?: CodeEditorTooltipSeverity;
}

type BaseCodeEditorProps = DarkModeProps &
  LgIdProps & {
    /**
     * Font size of text in the editor.
     *
     * @default 13
     */
    baseFontSize?: BaseFontSize;

    /**
     * Styling prop
     */
    className?: string;

    /**
     * Determines the appearance of the copy button when no panel is present. The copy button allows the code block to be copied to the user's clipboard by clicking the button.
     *
     * If `hover`, the copy button will only appear when the user hovers over the code block. On mobile devices, the copy button will always be visible.
     *
     * If `persist`, the copy button will always be visible.
     *
     * If `none`, the copy button will not be rendered.
     *
     * Note: When a `<CodeEditor.Panel>` child component is present, this prop is ignored as the panel provides its own copy button.
     *
     * @default `hover`
     */
    copyButtonAppearance?: CopyButtonAppearance;

    /**
     * Initial value to render in the editor.
     */
    defaultValue?: string;

    /**
     * Renders URLs as clickable links in the editor.
     */
    enableClickableUrls?: boolean;

    /**
     * Enables code folding arrows in the gutter.
     */
    enableCodeFolding?: boolean;

    /**
     * Enables line numbers in the editor's gutter.
     */
    enableLineNumbers?: boolean;

    /**
     * Enables line wrapping when the text exceeds the editor's width.
     */
    enableLineWrapping?: boolean;

    /**
     * Additional CodeMirror extensions to apply to the editor. These will be applied
     * with high precendence, meaning they can override extensions applied through
     * built in props.
     * @see {@link https://codemirror.net/docs/ref/#state.Extension}
     */
    extensions?: Array<CodeMirrorExtension>;

    /**
     * Forces parsing of complete document, even if it is not visible. USE WITH CAUTION!
     * By default the editor only parses the visible part of the code on the
     * screen. This significantly increases performance when there is a lot of
     * code rendered. When enabled, this forces parsing of non-visible code.
     * This should only be used in exceptional cases.
     */
    forceParsing?: boolean;

    /**
     * Sets the editor's height. If not set, the editor will automatically adjust
     * its height based on the content.
     */
    height?: string;

    /**
     * Sets the editor's indent size on tab click.
     */
    indentSize?: number;

    /**
     * Sets the editor's indent unit on tab click.
     */
    indentUnit?: IndentUnits;

    /**
     * Renders the editor in a loading state.
     *
     * @remarks
     * The CodeEditor is an asynchronous component that relies on lazy loading of
     * modules. Due to this, regardless of the `isLoading` prop, the editor will
     * always render a loading state until all required modules are loaded.
     * This is to ensure that the editor is fully functional before it is displayed.
     */
    isLoading?: boolean;

    /**
     * Language to use for syntax highlighting. Will have no highlighting if not set.
     */
    language?: LanguageName;

    /**
     * Sets the editor's max height.
     */
    maxHeight?: string;

    /**
     * Sets the editor's max width.
     */
    maxWidth?: string;

    /**
     * Sets the editor's minimum height.
     */
    minHeight?: string;

    /**
     * Sets the editor's minimum width.
     */
    minWidth?: string;

    /**
     * Callback that receives the updated editor value when changes are made.
     */
    onChange?: (value: string) => void;

    /**
     * Value to display in the editor when it is empty.
     */
    placeholder?: HTMLElement | string;

    /**
     * Pre-loaded modules to be used instead of dynamically loading them.
     * When provided, the editor will use ONLY these modules and skip all lazy loading,
     * ensuring synchronous behavior. Missing required modules will generate console warnings
     * but will not be loaded automatically. Consumers are responsible for providing all
     * necessary modules for their editor configuration. Use with caution.
     */
    preLoadedModules?: Partial<CodeEditorModules>;

    /**
     * Enables read only mode, making the contents uneditable.
     */
    readOnly?: boolean;

    /**
     * Add tooltips to the editor content.
     */
    tooltips?: Array<CodeEditorTooltip>;

    /**
     * Controlled value of the editor. If set, the editor will not be editable
     * and will not update its value on change. Use `onChange` to update the
     * value externally.
     */
    value?: string;

    /**
     * Sets the editor's width. If not set, the editor will be 100% width of its
     * parent container.
     */
    width?: string;

    /**
     * Additional menu items to show in the context menu below the default Cut/Copy/Paste items.
     * A separator will automatically be added between default and custom items if custom items are provided.
     */
    customContextMenuItems?: Array<Omit<ContextMenuItem, 'isSeparator'>>;
  };

export type CodeEditorProps = PropsWithChildren<BaseCodeEditorProps>;

/**
 * Imperative handle for the CodeEditor component.
 */
export interface CodeEditorHandle {
  /**
   * Returns the CodeMirror EditorView instance or null if not available.
   */
  getEditorViewInstance: () => EditorView | null;

  /**
   * Returns the current contents of the editor as a string.
   */
  getContents: () => string;

  /**
   * Formats the current code content and updates the editor.
   * @returns Promise resolving to the formatted code string
   */
  formatCode: () => Promise<string>;

  /**
   * Indicates whether code formatting is available for the current language.
   */
  isFormattingAvailable: boolean;

  /**
   * Undoes the last editor action if possible.
   * @returns boolean indicating if undo was successful
   */
  undo: () => boolean;

  /**
   * Redoes the last undone editor action if possible.
   * @returns boolean indicating if redo was successful
   */
  redo: () => boolean;

  /**
   * Downloads the current editor content as a file with an appropriate extension
   * based on the selected language.
   * @param filename - Optional custom filename (without extension). Defaults to 'code'
   */
  downloadContent: (filename?: string) => void;
}
