import React, { useState } from 'react';
import { css } from '@emotion/css';
import { uiColors } from '@leafygreen-ui/palette';
import Popover, { Align, Justify } from '@leafygreen-ui/popover';
import Button from '@leafygreen-ui/button';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const wrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const containerStyle = css`
  position: absolute;
`;

const popoverStyle = css`
  border: 1px solid ${uiColors.gray.light1};
  text-align: center;
  padding: 20px;
  overflow: hidden;
  // Reset these properties since they'll be inherited
  // from the container element when not using a portal.
  font-size: initial;
  color: initial;
  background-color: initial;
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
  children,
}: Knobs) {
  const [active, setActive] = useState(false);
  return (
    <div className={wrapper}>
      <Button onClick={() => setActive(!active)} className={containerStyle}>
        Popover
        <Popover
          align={align}
          justify={justify}
          active={active}
          usePortal={usePortal}
          spacing={spacing}
          adjustOnMutation={adjustOnMutation}
        >
          <div className={popoverStyle}>{children}</div>
        </Popover>
      </Button>
    </div>
  );
}

export default function PopoverLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <DefaultExample {...props} />}
    </LiveExample>
  );
}
