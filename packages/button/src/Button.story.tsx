import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import Button, { Variant, Size } from '.';

storiesOf('Button', module)
  .add('Default', () => {
    const buttonText = text('Text', 'MongoDB');
    const variant = select('Variant', Object.values(Variant), Variant.Default);
    const size = select('Size', Object.values(Size), Size.Default);
    const baseFontSize = select('Base Font Size', [14, 16], 14);
    const disabled = boolean('Disabled', false);
    const darkMode = boolean('Dark Mode', false);
    const href = select(
      'href',
      [undefined, 'https://mongodb.design'],
      undefined,
    );
    const leftGlyph = select(
      'Left Glyph',
      [...Object.keys(glyphs), undefined],
      undefined,
    );
    const rightGlyph = select(
      'Right Glyph',
      [...Object.keys(glyphs), undefined],
      undefined,
    );

    const wrapperStyle = cx(
      css`
        background-color: ${!darkMode ? uiColors.white : uiColors.gray.dark3};
        padding: 40px;
      `,
    );

    return (
      <LeafygreenProvider>
        <div className={wrapperStyle}>
          <Button
            variant={variant}
            darkMode={darkMode}
            size={size}
            disabled={disabled}
            baseFontSize={baseFontSize}
            href={href}
            leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
            rightGlyph={rightGlyph ? <Icon glyph={rightGlyph} /> : undefined}
            className={css`
              width: 100%;
            `}
          >
            {buttonText}
          </Button>
        </div>
      </LeafygreenProvider>
    );
  })
  .add('Icon only', () => {
    const variant = select('Variant', Object.values(Variant), Variant.Default);
    const size = select('Size', Object.values(Size), Size.Default);
    const baseFontSize = select('Base Font Size', [14, 16], 14);
    const disabled = boolean('Disabled', false);
    const darkMode = boolean('Dark Mode', false);
    const href = select(
      'href',
      [undefined, 'https://mongodb.design'],
      undefined,
    );
    const leftGlyph = select(
      'Left Glyph',
      [...Object.keys(glyphs), undefined],
      'Beaker',
    );
    const rightGlyph = select(
      'Right Glyph',
      [...Object.keys(glyphs), undefined],
      undefined,
    );

    const className = css`
      background-color: ${!darkMode ? uiColors.white : uiColors.gray.dark3};
      padding: 40px;
    `;

    return (
      <LeafygreenProvider>
        <div className={className}>
          <Button
            variant={variant}
            darkMode={darkMode}
            size={size}
            disabled={disabled}
            baseFontSize={baseFontSize}
            href={href}
            leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
            rightGlyph={rightGlyph ? <Icon glyph={rightGlyph} /> : undefined}
          />
        </div>
      </LeafygreenProvider>
    );
  });
