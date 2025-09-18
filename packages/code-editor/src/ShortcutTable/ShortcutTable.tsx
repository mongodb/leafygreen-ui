import React from 'react';

import Badge from '@leafygreen-ui/badge';
import { Disclaimer, H3 } from '@leafygreen-ui/typography';

import {
  PlusSignStyles,
  TableContainerStyles,
  TableStyles,
} from './ShortcutTable.styles';

const PlusSign = () => (
  <div className={PlusSignStyles}>
    <Disclaimer>+</Disclaimer>
  </div>
);

export function ShortcutTable({ className }: { className?: string }) {
  return (
    <div className={className}>
      <H3>Code Editor Shortcuts</H3>
      <div className={TableContainerStyles}>
        <table className={TableStyles}>
          <tbody>
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
                <PlusSign />
                <Badge variant="lightgray">F</Badge>
              </td>
              <td>
                <Disclaimer>to find</Disclaimer>
              </td>
            </tr>
            <tr>
              <td>
                <Badge variant="lightgray">⌘/CTRL</Badge>
                <PlusSign />
                <Badge variant="lightgray">Z</Badge>
              </td>
              <td>
                <Disclaimer>to undo</Disclaimer>
              </td>
            </tr>
            <tr>
              <td>
                <Badge variant="lightgray">⌘/CTRL</Badge>
                <PlusSign />
                <Badge variant="lightgray">SHIFT</Badge>
                <PlusSign />
                <Badge variant="lightgray">Z</Badge>
              </td>
              <td>
                <Disclaimer>to redo</Disclaimer>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
