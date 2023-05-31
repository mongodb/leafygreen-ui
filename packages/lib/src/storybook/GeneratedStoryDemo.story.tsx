/* eslint-disable react/display-name */
import React, { useRef } from 'react';

import { Variant } from '@leafygreen-ui/badge';
import { badgeVariants as variantStyle } from '@leafygreen-ui/badge/src/Badge/styles';
import { css, cx } from '@leafygreen-ui/emotion';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import LeafyGreenProvider, {
  useBaseFontSize,
} from '@leafygreen-ui/leafygreen-provider';
import {
  DarkModeProps,
  GeneratedStoryFn,
  getTheme,
  HTMLElementProps,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { BaseFontSize } from '@leafygreen-ui/tokens';

interface DemoProps extends HTMLElementProps<'button'>, DarkModeProps {
  checked: boolean;
  variant: Variant;
  glyph?: keyof typeof glyphs;
}

const DemoComponent = ({
  children,
  checked,
  darkMode,
  glyph,
  variant,
}: DemoProps) => {
  const theme = getTheme(darkMode ?? false);

  const baseFontSize = useBaseFontSize();

  return (
    <div
      className={cx(
        css`
          display: flex;
          align-items: center;
          gap: 0.5em;
          padding: 0.25em 1em;
          color: ${darkMode ? palette.white : palette.black};
          background-color: ${darkMode
            ? palette.gray.dark4
            : palette.gray.light3};
          font-size: ${baseFontSize}px;
        `,
        variantStyle[theme][variant],
      )}
    >
      {checked && <Icon size="xlarge" glyph="Checkmark" />}
      {glyph && !checked && <Icon glyph={glyph} />}
      {children}
    </div>
  );
};

const meta: StoryMetaType<
  typeof DemoComponent,
  { baseFontSize: BaseFontSize }
> = {
  title: 'Demo/GeneratedStoryDecorator',
  component: DemoComponent,
  parameters: {
    default: null,
    generate: {
      props: {
        darkMode: [false, true],
        baseFontSize: [14, 16],
        glyph: [undefined, 'Cloud'],
        checked: [false, true],
        variant: Object.values(Variant),
      },
      args: {
        children: 'Demo Content',
      },
      excludeCombinations: [
        {
          checked: true,
          glyph: 'Cloud',
        },
      ],
      decorator: (InstanceFn, context) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ref = useRef(null);
        return (
          <LeafyGreenProvider baseFontSize={context?.args.baseFontSize}>
            <InstanceFn ref={ref} />
          </LeafyGreenProvider>
        );
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};
export default meta;

export const Generated: GeneratedStoryFn<
  React.ElementType<DemoProps>
> = () => {};
