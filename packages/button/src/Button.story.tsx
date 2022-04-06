import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { palette } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import Button, { Variant, Size } from '.';
import { FontSize } from './types';

const wrapperStyle = (darkMode: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${!darkMode ? palette.white : palette.gray.dark3};
  width: 100%;
  height: 100vh;
`;

storiesOf('Button', module)
  .add('Default', () => {
    const buttonText = text('Text', 'MongoDB');
    const variant = select('Variant', Object.values(Variant), Variant.Default);
    const size = select('Size', Object.values(Size), Size.Default);
    const baseFontSize = select(
      'Base Font Size',
      Object.values(FontSize),
      FontSize.Body1,
    );
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

    return (
      <LeafygreenProvider>
        <div className={wrapperStyle(darkMode)}>
          <Button
            variant={variant}
            darkMode={darkMode}
            size={size}
            disabled={disabled}
            baseFontSize={baseFontSize}
            href={href}
            leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
            rightGlyph={rightGlyph ? <Icon glyph={rightGlyph} /> : undefined}
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
    const baseFontSize = select(
      'Base Font Size',
      Object.values(FontSize),
      FontSize.Body1,
    );
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

    return (
      <LeafygreenProvider>
        <div className={wrapperStyle(darkMode)}>
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
