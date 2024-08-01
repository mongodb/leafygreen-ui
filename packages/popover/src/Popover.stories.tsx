import React, { useRef, useState } from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

import Popover, { Align, Justify, PopoverProps } from '.';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

const popoverStyle = css`
  border: 1px solid ${palette.gray.light1};
  text-align: center;
  padding: 12px;
  max-height: 100%;
  overflow: hidden;
  // Reset these properties since they'll be inherited
  // from the container element when not using a portal.
  font-size: initial;
  color: initial;
  background-color: initial;
`;

const regularStyles = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const scrollableStyle = css`
  width: 500px;
  height: 90vh;
  background-color: ${palette.gray.light2};
  overflow: scroll;
  position: relative;
`;

const scrollableInnerStyle = css`
  position: relative;
  height: 130vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const buttonStyles = css`
  position: relative;
`;

const referenceElPositions: { [key: string]: string } = {
  centered: css`
    position: relative;
  `,
  top: css`
    top: 0;
    position: absolute;
  `,
  right: css`
    right: 0;
    position: absolute;
  `,
  bottom: css`
    bottom: 0;
    position: absolute;
  `,
  left: css`
    left: 0;
    position: absolute;
  `,
};

const meta: StoryMetaType<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'children',
        'active',
        'refEl',
        'portalClassName',
        'refButtonPosition',
        'usePortal',
      ],
    },
    generate: {
      combineArgs: {
        align: Object.values(Align),
        justify: Object.values(Justify),
      },
      args: {
        active: true,
        children: <div className={popoverStyle}>Popover content</div>,
      },
      // eslint-disable-next-line react/display-name
      decorator: (Instance, ctx) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ref = useRef(null);

        return (
          <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
            <div
              className={css`
                position: relative;
                width: 50vw;
                height: 150px;
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              <Button ref={ref}>refEl</Button>
              <Instance refEl={ref} />
            </div>
          </LeafyGreenProvider>
        );
      },
    },
  },
  args: {
    align: Align.Top,
    justify: Justify.Start,
    spacing: 10,
    adjustOnMutation: false,
    buttonText: 'Button Text',
  },
  argTypes: {
    buttonText: {
      type: 'string',
      description:
        'Storybook only prop. Used to change the reference button text',
    },
    refButtonPosition: {
      options: ['centered', 'top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
      description:
        'Storybook only prop. Used to change position of the reference button',
      defaultValue: 'centered',
    },
  },
};
export default meta;

type PopoverStoryProps = PopoverProps & {
  buttonText: string;
  refButtonPosition: string;
};

export const LiveExample: StoryFn<PopoverStoryProps> = ({
  refButtonPosition,
  buttonText,
  ...args
}: PopoverStoryProps) => {
  const button1Ref = useRef<HTMLButtonElement | null>(null);
  const button2Ref = useRef<HTMLButtonElement | null>(null);

  const [active, setActive] = useState<boolean>(false);
  const [active2, setActive2] = useState<boolean>(false);

  const position = referenceElPositions.centered;
  const position2 = referenceElPositions.centered;

  const handleClick1 = e => {
    /* e.stopPropagation(); */
    console.log('CLICK 1');
    setActive(active => !active);
  }

  const handleClick2 = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('CLICK 2');
    setActive2(active2 => !active2);
  }

  return (
    <div className={regularStyles}>
      <Button
        className={cx(buttonStyles, position)}
        onClick={handleClick1}
        ref={button1Ref}
      >
        {buttonText}
      </Button>
      <Popover {...args} refEl={button1Ref} active={active} dismissMode="manual" onDismiss={() => setActive(false)}>
        <div className={popoverStyle}>Popover content</div>
        <Button
          className={cx(buttonStyles, position2)}
          onClick={handleClick2}
          ref={button2Ref}
          autoFocus
        >
          {buttonText}
        </Button>
        <Button onClick={() => setActive(false)}>x</Button>
        <Popover refEl={button2Ref} active={active2} dismissMode="manual" onDismiss={() => setActive2(false)}>
          <div className={popoverStyle}>Popover 2 content</div>
          <Button onClick={() => setActive2(false)} autoFocus>x</Button>
        </Popover>
      </Popover>
    </div>
  );
};
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const ScrollableContainer: StoryFn<PopoverStoryProps> = ({
  refButtonPosition,
  buttonText,
  ...args
}: PopoverStoryProps) => {
  const [active, setActive] = useState<boolean>(false);
  const portalRef = useRef<HTMLElement | null>(null);
  const portalContainer = useRef<HTMLDivElement | null>(null);

  const position = referenceElPositions[refButtonPosition];

  return (
    <div className={scrollableStyle}>
      <div className={scrollableInnerStyle} ref={portalContainer}>
        <Button
          onClick={() => setActive(active => !active)}
          className={position}
        >
          {buttonText}
          {/* @ts-expect-error */}
          <Popover
            {...args}
            active={active}
            portalContainer={portalContainer.current}
            portalRef={portalRef}
            scrollContainer={portalContainer.current}
          >
            <div className={popoverStyle}>Popover content</div>
          </Popover>
        </Button>
      </div>
    </div>
  );
};
ScrollableContainer.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
ScrollableContainer.args = {
  usePortal: true,
};
ScrollableContainer.argTypes = {
  usePortal: { control: 'none' },
  portalClassName: { control: 'none' },
  refEl: { control: 'none' },
  className: { control: 'none' },
  active: { control: 'none' },
};

export const Generated = () => {};
