import React from 'react';
import { bodyThemeStyles, bodyTitleStyles, contentStyles } from './styles';
import { Body } from '@leafygreen-ui/typography';
import { cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';

interface ContentProps {
  theme: Theme;
  ariaLabelledby: string;
  ariaDescribedby: string;
  title: string;
  children: React.ReactNode;
}

function Content({
  theme,
  ariaLabelledby,
  ariaDescribedby,
  title,
  children,
}: ContentProps) {
  return (
    <div className={contentStyles}>
      <Body
        id={ariaLabelledby}
        as="h2"
        className={cx(bodyThemeStyles[theme], bodyTitleStyles)}
      >
        <strong>{title}</strong>
      </Body>
      <Body as="div" className={bodyThemeStyles[theme]} id={ariaDescribedby}>
        {children}
      </Body>
    </div>
  );
}

Content.displayName = 'Content';
export default Content;
