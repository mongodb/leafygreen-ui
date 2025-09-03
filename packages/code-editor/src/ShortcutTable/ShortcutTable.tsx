import React from 'react';

import Badge from '@leafygreen-ui/badge';
import { Disclaimer, H3 } from '@leafygreen-ui/typography';

import {
  HeadingStyles,
  PlusSignStyles,
  TableContainerStyles,
  TableStyles,
} from './ShortcutTable.styles';

export function ShortcutTable({ className }: { className?: string }) {
  return (
    <div className={className}>
      <H3 className={HeadingStyles}>Code Editor Shortcuts</H3>
      <div className={TableContainerStyles}>
        <table className={TableStyles}>
          <tr>
            <td>
              <Badge variant="lightgray">TAB</Badge>
            </td>
            <td>
              <Disclaimer>to indent</Disclaimer>
            </td>
          </tr>
          <tr>
            <td>
              <Badge variant="lightgray">ESC</Badge>
            </td>
            <td>
              <Disclaimer>to unfocus editor</Disclaimer>
            </td>
          </tr>
          <tr>
            <td>
              <Badge variant="lightgray">⌘/CTRL</Badge>
              <Disclaimer className={PlusSignStyles}>+</Disclaimer>
              <Badge variant="lightgray">F</Badge>
            </td>
            <td>
              <Disclaimer>to find</Disclaimer>
            </td>
          </tr>
          <tr>
            <td>
              <Badge variant="lightgray">⌘/CTRL</Badge>
              <Disclaimer className={PlusSignStyles}>+</Disclaimer>
              <Badge variant="lightgray">Z</Badge>
            </td>
            <td>
              <Disclaimer>to undo</Disclaimer>
            </td>
          </tr>
          <tr>
            <td>
              <Badge variant="lightgray">⌘/CTRL</Badge>
              <Disclaimer className={PlusSignStyles}>+</Disclaimer>
              <Badge variant="lightgray">SHIFT</Badge>
              <Disclaimer className={PlusSignStyles}>+</Disclaimer>
              <Badge variant="lightgray">Z</Badge>
            </td>
            <td>
              <Disclaimer>to redo</Disclaimer>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
