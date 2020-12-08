import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import { css } from 'emotion';
import styled from '@emotion/styled';
import { lighten, darken, readableColor, transparentize } from 'polished';
import { keyMap } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import Tooltip from '@leafygreen-ui/tooltip';
import LiveExample from 'components/live-example';

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

interface ColorBlockProps {
  color: string;
  name: string;
}

const ColorBlock = styled<'div', ColorBlockProps>('div')`
  background-color: ${props => props.color};
  border-top-color: transparent;
  display: inline-block;
  position: relative;
  height: 60px;
  width: 60px;
  border-radius: 8px;

  box-shadow: 0 8px 6px -8px ${props => transparentize(0.7, darken(0.2, props.color))},
    0 2px 3px ${props => transparentize(0.8, darken(0.5, props.color))};
  &:before {
    content: attr(color);
    position: absolute;
    bottom: 0.3rem;
    left: 0.3rem;
    right: 0.3rem;
    font-size: 9px;
    text-align: center;
    padding: 3px 0.3rem;
    color: ${props => readableColor(lighten(0.2, props.color))};
    // background-color: ${props => lighten(0.2, props.color)};
    border-radius: 4px;
  }
  &:after {
    content: attr(name);
    position: absolute;
    top: calc(100% + 8px);
    font-size: 12px;
    text-align: center;
    color: ${uiColors.gray.dark1};
    margin: auto;
    left: -10px;
    right: -10px;
  }
`;

function WrappedColorBlock({ color, name }: ColorBlockProps) {
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
    <InteractionRing borderRadius="8px">
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
        <ColorBlock key={color} color={color} name={name} />
      </button>
    </InteractionRing>
  );

  return (
    <div
      className={css`
        margin: 10px;
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

function renderColors() {
  const ranges = Object.keys(uiColors) as Array<keyof typeof uiColors>;

  const renderedRanges = ranges.map(range => {
    const currentVal = uiColors[range];

    if (typeof currentVal === 'string') {
      return <WrappedColorBlock key={range} color={currentVal} name={range} />;
    }

    return (
      <div key={range}>
        {(Object.keys(currentVal) as Array<keyof typeof currentVal>).map(
          name => (
            <WrappedColorBlock
              key={currentVal[name]}
              color={currentVal[name]}
              name={`${range} ${name}`}
            />
          ),
        )}
      </div>
    );
  });

  return <div>{renderedRanges}</div>;
}

export default function PaletteLiveExample() {
  return <LiveExample knobsConfig={{}}>{renderColors}</LiveExample>;
}
