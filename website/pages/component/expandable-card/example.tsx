import React from 'react';

import LiveExample, { KnobsConfigInterface } from 'components/live-example';

import ExpandableCard from '@leafygreen-ui/expandable-card';
import { uiColors } from '@leafygreen-ui/palette';
import TextInput from '@leafygreen-ui/text-input';
import Toggle from '@leafygreen-ui/toggle';
import { Label } from '@leafygreen-ui/typography';

import { css } from '@emotion/css';

const knobsConfig: KnobsConfigInterface<{
  title: string;
  description: string;
  flagText: string;
  darkMode: boolean;
}> = {
  title: {
    type: 'text',
    default: 'Trigger Details',
    label: 'Title',
  },
  description: {
    type: 'text',
    default: 'Name and enable your Trigger.',
    label: 'Description',
  },
  flagText: {
    type: 'text',
    default: '',
    label: 'Flag',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
};

export default function CardLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => (
        <ExpandableCard {...props}>
          <div
            className={css`
              color: ${props.darkMode ? uiColors.white : uiColors.gray.dark3};
            `}
          >
            <TextInput
              label="Trigger Name"
              description="Enter the name for the new Trigger"
              placeholder="trigger-0"
              className={css`
                margin-bottom: 12px;
              `}
            />
            <Label
              htmlFor="enabled"
              className={css`
                display: block;
              `}
            >
              Enabled
            </Label>
            <Toggle aria-labelledby="enabled" />
          </div>
        </ExpandableCard>
      )}
    </LiveExample>
  );
}
