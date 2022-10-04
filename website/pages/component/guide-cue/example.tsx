import React, { useRef, useState } from 'react';
import {
  GuideCue,
  TooltipAlign,
  TooltipJustify,
} from '@leafygreen-ui/guide-cue';
import { Align as BeaconAlign } from '@leafygreen-ui/popover';
import { Body } from '@leafygreen-ui/typography';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const Align = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
} as const;

const Justify = {
  Start: 'start',
  Middle: 'middle',
  End: 'end',
} as const;

const knobsConfig: KnobsConfigInterface<{
  title: string;
  numberOfSteps: number;
  currentStep?: number;
  children: string;
  buttonText?: string;
  darkMode: boolean;
  tooltipAlign: TooltipAlign;
  tooltipJustify?: TooltipJustify;
  beaconAlign?: BeaconAlign;
}> = {
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  title: {
    type: 'text',
    default: 'New feature',
    label: 'Title',
  },
  numberOfSteps: {
    type: 'number',
    default: 2,
    label: 'Number of Steps',
  },
  currentStep: {
    type: 'number',
    default: 1,
    label: 'Current Step',
  },
  buttonText: {
    type: 'text',
    default: 'Next',
    label: 'Button Text',
  },
  children: {
    type: 'area',
    default: 'This is a new feature. You should try it out',
    label: 'Children',
  },
  tooltipAlign: {
    type: 'select',
    options: Object.values(Align),
    default: Align.Top,
    label: 'Tooltip Align',
  },
  tooltipJustify: {
    type: 'select',
    options: Object.values(Justify),
    default: Justify.Middle,
    label: 'Tooltip Justify',
  },
  beaconAlign: {
    type: 'select',
    options: Object.values(Align),
    default: BeaconAlign.CenterHorizontal,
    label: 'Beacon Align(pulsing circle)',
  },
};

export default function CardLiveExample() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<null | HTMLDivElement>(null);

  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({
        title,
        numberOfSteps,
        currentStep = 1,
        children,
        darkMode,
        tooltipAlign,
        tooltipJustify,
        beaconAlign,
        buttonText,
      }) => (
        <div>
          <Button
            onClick={() => setOpen(o => !o)}
            className={css`
              margin-bottom: 100px;
            `}
            darkMode={darkMode}
          >
            Open me
          </Button>
          <div ref={triggerRef}>
            <Body darkMode={darkMode}>story refEl trigger</Body>
          </div>
          <GuideCue
            open={open}
            setOpen={setOpen}
            refEl={triggerRef}
            darkMode={darkMode}
            title={title}
            numberOfSteps={numberOfSteps}
            currentStep={currentStep}
            tooltipAlign={tooltipAlign}
            tooltipJustify={tooltipJustify}
            beaconAlign={beaconAlign}
            buttonText={buttonText}
          >
            {children}
          </GuideCue>
        </div>
      )}
    </LiveExample>
  );
}
