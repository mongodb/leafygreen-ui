import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { Body } from '@leafygreen-ui/typography';

import { useDarkMode } from '../../../../../packages/leafygreen-provider/src/DarkModeContext';

import { badgeVariants, baseStyles, labelStyles } from './RichLinkBadge.styles';
import { RichLinkBadgeProps } from './RichLinkBadge.types';

const RelativeContainer = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) => {
  return <div style={{ position: 'relative', color }}>{children}</div>;
};

export interface RichLinkBadgesProps {}

export const RichLinkBadges = (props: RichLinkBadgesProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RelativeContainer>
        <RichLinkBadge variant="gray" label="Code" glyph="CodeBlock" />
      </RelativeContainer>
      <br />

      <RelativeContainer>
        <RichLinkBadge variant="purple" label="Website" glyph="Laptop" />
      </RelativeContainer>
      <br />

      <RelativeContainer>
        <RichLinkBadge variant="red" label="Video" glyph="Play" />
      </RelativeContainer>
      <br />

      <RelativeContainer>
        <RichLinkBadge variant="green" label="Blog" glyph="SMS" />
      </RelativeContainer>
      <br />

      <RelativeContainer>
        <RichLinkBadge variant="yellow" label="Book" glyph="University" />
      </RelativeContainer>
      <br />

      <RelativeContainer>
        <RichLinkBadge variant="blue" label="Docs" glyph="Note" />
      </RelativeContainer>
      <br />

      <RelativeContainer>
        <RichLinkBadge
          darkMode={true}
          variant="gray"
          label="Code"
          glyph="CodeBlock"
        />
      </RelativeContainer>
      <br />

      <RelativeContainer>
        <RichLinkBadge
          darkMode={true}
          variant="purple"
          label="Website"
          glyph="Laptop"
        />
      </RelativeContainer>
      <br />

      <RelativeContainer>
        <RichLinkBadge
          darkMode={true}
          variant="red"
          label="Video"
          glyph="Play"
        />
      </RelativeContainer>
      <br />

      <RelativeContainer>
        <RichLinkBadge
          darkMode={true}
          variant="green"
          label="Blog"
          glyph="SMS"
        />
      </RelativeContainer>
      <br />

      <RelativeContainer>
        <RichLinkBadge
          darkMode={true}
          variant="yellow"
          label="Book"
          glyph="University"
        />
      </RelativeContainer>
      <br />

      <RelativeContainer>
        <RichLinkBadge
          darkMode={true}
          variant="blue"
          label="Docs"
          glyph="Note"
        />
      </RelativeContainer>
      <br />
    </div>
  );
};

export const RichLinkBadge = ({
  darkMode: darkModeProp,
  glyph: glyphName,
  variant = 'gray',
  label,
}: RichLinkBadgeProps) => {
  const { theme } = useDarkMode(darkModeProp);

  return (
    <div className={cx(baseStyles, badgeVariants[theme][variant])}>
      {glyphName ? <Icon glyph={glyphName} /> : null}
      <Body className={cx(labelStyles)}>{label}</Body>
    </div>
  );
};
