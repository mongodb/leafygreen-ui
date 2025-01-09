import React, { useMemo } from 'react';

import {
  DescendantsProvider,
  useInitDescendants,
} from '@leafygreen-ui/descendants';
import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { LGIDS_VERTICAL_STEPPER } from '../constants';
import {
  VerticalStepperDescendantsContext,
  VerticalStepperProvider,
} from '../context';

import { baseStyles } from './VerticalStepper.styles';
import { VerticalStepperProps } from './VerticalStepper.types';

export const VerticalStepper = React.forwardRef<
  HTMLOListElement,
  VerticalStepperProps
>(
  (
    {
      currentStep = 0,
      darkMode: darkModeProp,
      children,
      className,
      'data-lgid': dataLgId = LGIDS_VERTICAL_STEPPER.root,
    }: VerticalStepperProps,
    forwardRef,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);
    const childrenLength = React.Children.toArray(children).length;

    const { descendants, dispatch } = useInitDescendants<HTMLLIElement>(
      VerticalStepperDescendantsContext,
    );

    const providerData = useMemo(() => {
      return { currentStep, hasVerticalStepperParent: true };
    }, [currentStep]);

    if (childrenLength < 2) {
      console.warn('Two or more <VerticalStep/> components are required');
      return null;
    }

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <DescendantsProvider
          context={VerticalStepperDescendantsContext}
          descendants={descendants}
          dispatch={dispatch}
        >
          <VerticalStepperProvider {...providerData}>
            <ol
              ref={forwardRef}
              className={cx(baseStyles, className)}
              data-lgid={dataLgId}
              data-testid={dataLgId}
            >
              {children}
            </ol>
          </VerticalStepperProvider>
        </DescendantsProvider>
      </LeafyGreenProvider>
    );
  },
);

VerticalStepper.displayName = 'VerticalStepper';
