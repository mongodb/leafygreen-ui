import React, { useEffect, useState } from 'react';
import ClipboardJS from 'clipboard';
import { darken, lighten, readableColor, transparentize } from 'polished';

import LiveExample, { KnobsConfigInterface } from 'components/live-example';

import { keyMap } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import Tooltip from '@leafygreen-ui/tooltip';

import { css, cx } from '@emotion/css';

const knobsConfig: KnobsConfigInterface<{
  darkMode: boolean;
}> = {
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'View in Dark Mode',
  },
};

const resetButtonStyles = css`
  display: inline;
  border: none;
  background-color: transparent;
  margin: 0px;
  padding: 0px;
  height: 60px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const colorBlockStyles = css`
  border-top-color: transparent;
  display: inline-block;
  position: relative;
  height: 68px;
  width: 80px;
  border-radius: 8px;

  &:before {
    content: attr(color);
    position: absolute;
    bottom: 0.3rem;
    left: 0.3rem;
    right: 0.3rem;
    font-size: 12px;
    text-align: center;
    padding: 3px 0.3rem;
    border-radius: 4px;
  }

  &:after {
    content: attr(name);
    position: absolute;
    top: calc(100% + ${spacing[2]}px);
    font-size: 12px;
    text-align: center;
    color: ${palette.gray.dark1};
    margin: auto;
    left: -10px;
    right: -10px;
  }
`;

interface ColorBlockProps {
  color: string;
  name: string;
  darkMode: boolean;
}

function ColorBlock({ color, name, darkMode }: ColorBlockProps) {
  return (
    <div
      className={cx(
        colorBlockStyles,
        css`
          background-color: ${color};
          box-shadow: 0 8px 6px -8px ${transparentize(0.7, darken(0.2, color))},
            0 2px 3px ${transparentize(0.8, darken(0.5, color))};

          &:before {
            content: '${color}';
            background-color: ${lighten(0.2, color)};
            color: ${readableColor(lighten(0.2, color))};
          }

          &:after {
            content: '${name}';
            color: ${darkMode ? palette.gray.light3 : palette.gray.dark3};
          }
        `,
      )}
    ></div>
  );
}

function WrappedColorBlock({ color, name, darkMode }: ColorBlockProps) {
  const [copied, setCopied] = useState(false);
  const [blockRef, setBlockRef] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!blockRef) {
      return;
    }

    const clipboard = new ClipboardJS(blockRef, {
      text: () => color,
    });

    if (copied) {
      const timeoutId = setTimeout(() => {
        setCopied(false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }

    return () => clipboard.destroy();
  }, [blockRef, color, copied]);

  const trigger = (
    <button
      onClick={() => setCopied(true)}
      onKeyDown={e => {
        if (e.keyCode === keyMap.Space) {
          setCopied(true);
        }
      }}
      ref={setBlockRef}
      className={resetButtonStyles}
    >
      <ColorBlock key={color} color={color} name={name} darkMode={darkMode} />
    </button>
  );

  return (
    <div
      className={css`
        margin: 16px 12px;
        margin-bottom: 20px;
        display: inline-block;
      `}
    >
      <Tooltip
        open={copied}
        align="top"
        justify="middle"
        trigger={trigger}
        triggerEvent="click"
      >
        Copied!
      </Tooltip>
    </div>
  );
}

function renderColors(darkMode: boolean) {
  const ranges = Object.keys(palette) as Array<keyof typeof palette>;

  const renderedRanges = ranges.map(range => {
    const currentVal = palette[range];

    if (typeof currentVal === 'string') {
      return (
        <WrappedColorBlock
          darkMode={darkMode}
          key={range}
          color={currentVal}
          name={range}
        />
      );
    }

    return (
      <div key={range}>
        {(Object.keys(currentVal) as Array<keyof typeof currentVal>).map(
          name => (
            <WrappedColorBlock
              key={currentVal[name]}
              color={currentVal[name]}
              name={`${range} ${name}`}
              darkMode={darkMode}
            />
          ),
        )}
      </div>
    );
  });

  return <div>{renderedRanges}</div>;
}

export default function PaletteLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ darkMode }) => renderColors(darkMode)}
    </LiveExample>
  );
}
