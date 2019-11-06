import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import IconButton from './IconButton';

storiesOf('IconButton', module)
  .add('Light', () => (
    <IconButton>
      <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
        <title>Ellipsis</title>
        <desc>Created with Sketch.</desc>
        <g
          id="Ellipsis-Copy"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <path
            d="M2,6.5 C2.828125,6.5 3.5,7.171875 3.5,8 C3.5,8.828125 2.828125,9.5 2,9.5 C1.171875,9.5 0.5,8.828125 0.5,8 C0.5,7.171875 1.171875,6.5 2,6.5 Z M8,6.5 C8.828125,6.5 9.5,7.171875 9.5,8 C9.5,8.828125 8.828125,9.5 8,9.5 C7.171875,9.5 6.5,8.828125 6.5,8 C6.5,7.171875 7.171875,6.5 8,6.5 Z M14,6.5 C14.828125,6.5 15.5,7.171875 15.5,8 C15.5,8.828125 14.828125,9.5 14,9.5 C13.171875,9.5 12.5,8.828125 12.5,8 C12.5,7.171875 13.171875,6.5 14,6.5 Z"
            id=""
            fill="#000000"
          ></path>
        </g>
      </svg>
    </IconButton>
  ))
  .add('Dark', () => (
    <IconButton href="https://mongodb.design" variant="dark">
      <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
        <title>Ellipsis</title>
        <desc>Created with Sketch.</desc>
        <g
          id="Ellipsis-Copy"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <path
            d="M2,6.5 C2.828125,6.5 3.5,7.171875 3.5,8 C3.5,8.828125 2.828125,9.5 2,9.5 C1.171875,9.5 0.5,8.828125 0.5,8 C0.5,7.171875 1.171875,6.5 2,6.5 Z M8,6.5 C8.828125,6.5 9.5,7.171875 9.5,8 C9.5,8.828125 8.828125,9.5 8,9.5 C7.171875,9.5 6.5,8.828125 6.5,8 C6.5,7.171875 7.171875,6.5 8,6.5 Z M14,6.5 C14.828125,6.5 15.5,7.171875 15.5,8 C15.5,8.828125 14.828125,9.5 14,9.5 C13.171875,9.5 12.5,8.828125 12.5,8 C12.5,7.171875 13.171875,6.5 14,6.5 Z"
            id=""
            fill="#000000"
          ></path>
        </g>
      </svg>
    </IconButton>
  ));
