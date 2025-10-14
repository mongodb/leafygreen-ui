import React, { forwardRef, useRef } from 'react';

import Card from '@leafygreen-ui/card';
import CheckmarkWithCircle from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';
import { VerticalStep, VerticalStepper } from '@leafygreen-ui/vertical-stepper';

import { Section } from '../Section';

import {
  cardStyles,
  childrenContainerStyles,
  getIconFill,
  getMessageContainerStyles,
  getMessageStyles,
  verticalStepperStyles,
} from './ActivationSteps.styles';
import { ActivationStepsProps } from './ActivationSteps.types';
import { DEFAULT_COMPLETED_MESSAGE } from './constants';

export const ActivationSteps = forwardRef<HTMLElement, ActivationStepsProps>(
  (
    {
      className,
      completedMessage = DEFAULT_COMPLETED_MESSAGE,
      currentStep,
      darkMode: darkModeProp,
      steps,
      title,
      ...rest
    },
    fwdRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    const messageContainerRef = useRef<HTMLDivElement>(null);

    const showMessage = currentStep >= steps.length;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <Card className={cardStyles}>
          <Section {...rest} className={className} ref={fwdRef} title={title}>
            <div className={childrenContainerStyles}>
              <VerticalStepper
                className={verticalStepperStyles}
                currentStep={currentStep}
              >
                {steps.map((props, index) => (
                  <VerticalStep key={props.title + index} {...props} />
                ))}
              </VerticalStepper>
              <div
                aria-live="polite"
                aria-relevant="all"
                className={getMessageContainerStyles(theme, showMessage)}
                hidden={!showMessage}
                ref={messageContainerRef}
              >
                <CheckmarkWithCircle fill={getIconFill(theme)} />
                <Body className={getMessageStyles(theme)}>
                  {completedMessage}
                </Body>
              </div>
            </div>
          </Section>
        </Card>
      </LeafyGreenProvider>
    );
  },
);

ActivationSteps.displayName = 'ActivationSteps';
