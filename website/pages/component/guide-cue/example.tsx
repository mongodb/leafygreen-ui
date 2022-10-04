import React from 'react';
import GuideCue, { TooltipAlign, TooltipJustify } from '@leafygreen-ui/guide-cue';
import { Align as BeaconAlign } from '@leafygreen-ui/popover';
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
  buttonText?: string,
  darkMode: boolean;
  tooltipAlign: TooltipAlign;
  tooltipJustify?: TooltipJustify;
  beaconAlign?: BeaconAlign;
}> = {
  title: {
    type: 'text',
    default: 'New feature',
    label: 'title',
  },
  numberOfSteps: {
    type: 'number',
    default: 1,
    label: 'numberOfSteps',
  },
  currentStep: {
    type: 'number',
    default: 1,
    label: 'currentStep',
  },
  buttonText: {
    type: 'text',
    default: 'Next',
    label: 'buttonText',
  },
  children: {
    type: 'area',
    default: "This is a new feature. You should try it out",
    label: 'Children',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  tooltipAlign: {
    type: 'select',
    options: Object.values(Align),
    default: Align.Top,
    label: 'Align',
  },
  tooltipJustify: {
    type: 'select',
    options: Object.values(Justify),
    default: Justify.Middle,
    label: 'Justify',
  },
  beaconAlign: {
    type: 'select',
    options: Object.values(Align),
    default: Align.Top,
    label: 'Align',
  },
};

export default function CardLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({
        title,
        numberOfSteps,
        currentStep,
        children,
        darkMode,
        tooltipAlign,
        tooltipJustify,
        beaconAlign
      }) => (
        // <GuideCue darkMode={darkMode}>

        // </GuideCue>
        <p>hi</p>
      )}
    </LiveExample>
  );
}
