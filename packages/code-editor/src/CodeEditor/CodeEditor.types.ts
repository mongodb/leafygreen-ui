import { DarkModeProps } from '@leafygreen-ui/lib';

export interface CodeEditorProps extends DarkModeProps {
  enableActiveLineHighlighting?: boolean;
  enableClickableUrls?: boolean;
  enableCodeFolding?: boolean;
  enableLineNumbers?: boolean;
  enableLineWrapping?: boolean;
  forceParsing?: boolean;
  placeholder?: HTMLElement | string;
  readOnly?: boolean;
  value?: string;
}
