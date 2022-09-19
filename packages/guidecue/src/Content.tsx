import React from 'react';
import {
  bodyThemeStyles,
  bodyTitleStyles,
  buttonStyles,
  contentStyles,
  footerStyles,
  stepStyles,
} from './styles';
import { Body, Disclaimer } from '@leafygreen-ui/typography';
import { cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import Button from '@leafygreen-ui/button';

interface ContentProps {
  theme: Theme;
  ariaLabelledby: string;
  ariaDescribedby: string;
  title: string;
  children: React.ReactNode;
  darkMode: boolean;
  handleButtonClick: () => void;
  focusId: string;
  buttonText: string;
  currentStep: number;
  numberOfSteps: number;
  isStandalone: boolean;
}

function Content({
  theme,
  ariaLabelledby,
  ariaDescribedby,
  title,
  children,
  darkMode,
  handleButtonClick,
  focusId,
  buttonText,
  currentStep,
  numberOfSteps,
  isStandalone,
}: ContentProps) {
  return (
    <>
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
      <div className={footerStyles}>
        {!isStandalone && (
          <Disclaimer className={stepStyles[theme]}>
            {currentStep} of {numberOfSteps}
          </Disclaimer>
        )}
        <Button
          variant="primary"
          onClick={() => handleButtonClick()}
          darkMode={!darkMode}
          id={focusId}
          className={buttonStyles}
        >
          {buttonText}
        </Button>
      </div>
    </>
  );
}

Content.displayName = 'Content';
export default Content;
