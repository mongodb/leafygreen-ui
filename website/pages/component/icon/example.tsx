import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import { css } from 'emotion';
import { keyMap } from '@leafygreen-ui/lib';
import Tooltip from '@leafygreen-ui/tooltip';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import Icon, { Size, glyphs } from '@leafygreen-ui/icon';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const resetButtonStyles = css`
  display: inline;
  border: none;
  background-color: transparent;
  margin: 0px;
  padding: 0px;
  height: 70px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const containerStyle = css`
  width: 150px;
  height: 70px;
  flex-shrink: 0;
  text-align: center;
  border: 1px solid #babdbe;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: wrap;
`;

const textStyle = css`
  font-size: 12px;
  color: #babdbe;
  margin-top: 0.5rem;
`;

const knobsConfig: KnobsConfigInterface<{ size: Size }> = {
  size: {
    type: 'select',
    options: Object.values(Size),
    default: Size.Default,
    label: 'Size',
  },
};

function WrappedIconBlock({ glyph, size }: { glyph: string; size: Size }) {
  const [copied, setCopied] = useState(false);
  const [blockRef, setBlockRef] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!blockRef) {
      return;
    }

    const clipboard = new ClipboardJS(blockRef, {
      text: () => glyph,
    });

    if (copied) {
      const timeoutId = setTimeout(() => {
        setCopied(false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }

    return () => clipboard.destroy();
  }, [blockRef, glyph, copied]);

  const trigger = (
    <InteractionRing borderRadius="5px">
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
        <div key={glyph} className={containerStyle}>
          <Icon glyph={glyph} fill="#000000" size={size} />
          <div className={textStyle}>{glyph}</div>
        </div>
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

export default function IconLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => (
        <>
          {Object.keys(glyphs).map(glyph => (
            <WrappedIconBlock key={glyph} glyph={glyph} size={props?.size} />
          ))}
        </>
      )}
    </LiveExample>
  );
}
