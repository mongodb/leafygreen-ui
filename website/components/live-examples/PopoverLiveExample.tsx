import React, { useState } from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Popover, { Align, Justify } from '@leafygreen-ui/popover';

const popoverStyle = css`
  border: 1px solid ${uiColors.gray.light1};
  text-align: center;
  padding: 20px;
  background-color: ${uiColors.white};
  max-height: 100%;
  overflow: hidden;
`;

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Knobs = {
  children: string;
  usePortal: boolean;
  align: Align;
  justify: Justify;
  spacing: number;
  adjustOnMutation: boolean;
};

const knobsConfig: KnobsConfigInterface<Knobs> = {
  children: {
    type: 'text',
    default: 'Popover content',
    label: 'Children',
  },
  usePortal: {
    type: 'boolean',
    default: true,
    label: 'usePortal',
  },
  align: {
    type: 'select',
    options: Object.values(Align),
    default: Align.Top,
    label: 'Align',
  },
  justify: {
    type: 'select',
    options: Object.values(Justify),
    default: Justify.Start,
    label: 'Justify',
  },
  spacing: {
    type: 'number',
    default: 10,
    label: 'Spacing',
  },
  adjustOnMutation: {
    type: 'boolean',
    default: false,
    label: 'Adjust on Mutation',
  },
};

function DefaultExample({
  align,
  justify,
  usePortal,
  spacing,
  adjustOnMutation,
}: Knobs) {
  const [active, setActive] = useState(false);
  return (
    <div>
      <button onClick={() => setActive(!active)}>
        Popover
        <Popover
          align={align}
          justify={justify}
          usePortal={usePortal}
          spacing={spacing}
          adjustOnMutation={adjustOnMutation}
        >
          <div className={popoverStyle}>Popover content</div>
        </Popover>
      </button>
    </div>
  );
}

const PopoverLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <DefaultExample {...props} />}
    </LiveExample>
  );
};

export default PopoverLiveExample;
