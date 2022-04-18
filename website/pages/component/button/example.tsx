import React from 'react';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import Button, { Variant, Size } from '@leafygreen-ui/button';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  disabled: boolean;
  variant: Variant;
  size: Size;
  leftGlyph: string;
  rightGlyph: string;
  baseFontSize: 13 | 16;
  darkMode: boolean;
  children: React.ReactNode;
  hasHrefProp: boolean;
}> = {
  variant: {
    type: 'select',
    options: Object.values(Variant),
    default: Variant.Primary,
    label: 'Variant',
  },
  size: {
    type: 'select',
    options: Object.values(Size),
    default: Size.Default,
    label: 'Size',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  hasHrefProp: {
    type: 'boolean',
    default: false,
    label: 'href',
  },
  children: {
    type: 'text',
    default: 'Edit',
    label: 'Children',
  },
  leftGlyph: {
    type: 'select',
    options: Object.keys(glyphs),
    default: 'InviteUser',
    label: 'Left Glyph',
  },
  rightGlyph: {
    type: 'select',
    options: Object.keys(glyphs),
    default: 'CaretDown',
    label: 'Right Glyph',
  },
  baseFontSize: {
    type: 'select',
    options: [13, 16],
    default: 13,
    label: 'Base Font Size',
  },
};

export default function ButtonLiveExample() {
  return (
    <>
      <LiveExample knobsConfig={knobsConfig}>
        {({ leftGlyph, rightGlyph, hasHrefProp, ...props }) => (
          <Button
            href={hasHrefProp ? 'https://cloud.mongodb.com' : undefined}
            leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
            rightGlyph={rightGlyph ? <Icon glyph={rightGlyph} /> : undefined}
            {...props}
          />
        )}
      </LiveExample>
    </>
  );
}
