import React, { forwardRef } from 'react';

import Button, { Variant } from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body, H2, Subtitle } from '@leafygreen-ui/typography';

import {
  buttonsContainerStyles,
  containerStyles,
  getTextStyles,
  textContainerStyles,
} from './Header.styles';
import { HeaderProps } from './Header.types';

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  (
    {
      className,
      darkMode: darkModeProp,
      description,
      primaryButtonProps,
      secondaryButtonProps,
      subtitle,
      title,
      ...rest
    },
    fwdRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const textStyles = getTextStyles(theme);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={cx(containerStyles, className)} ref={fwdRef} {...rest}>
          <div className={textContainerStyles}>
            {subtitle && (
              <Subtitle className={textStyles.subtitle}>{subtitle}</Subtitle>
            )}
            <H2 className={textStyles.title}>{title}</H2>
            {description && (
              <Body className={textStyles.description}>{description}</Body>
            )}
          </div>
          <div className={buttonsContainerStyles}>
            <Button variant={Variant.Primary} {...primaryButtonProps} />
            {secondaryButtonProps && (
              <Button variant={Variant.Default} {...secondaryButtonProps} />
            )}
          </div>
        </div>
      </LeafyGreenProvider>
    );
  },
);

Header.displayName = 'Header';
