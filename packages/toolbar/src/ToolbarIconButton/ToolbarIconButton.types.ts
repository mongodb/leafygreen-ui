export interface ToolbarIconButtonProps {
  glyph: string; // should come from icon package.

  label: string;

  active?: boolean;

  diasbled?: boolean; // is this a prop?
}
