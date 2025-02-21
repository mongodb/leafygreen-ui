import { TokenObject } from '../highlight';

export interface FlatTokenObject {
  kind: string;
  children: Array<string>;
}

export interface TokenProps {
  kind?: string;
  children: React.ReactNode;
}

export type TreeItem =
  | null
  | undefined
  | string
  | Array<string | TokenObject>
  | TokenObject;

export type LineDefinition = Array<Array<string | FlatTokenObject>>;

export interface LineTableRowProps {
  lineNumber?: number;
  children: React.ReactNode;
  highlighted?: boolean;
  darkMode: boolean;
}

export interface TableContentProps {
  lines: LineDefinition;
}
