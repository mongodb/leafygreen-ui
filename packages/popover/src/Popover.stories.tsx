/* eslint-disable no-console */
import React, { useRef, useState } from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { color } from '@leafygreen-ui/tokens';

import { getPopoverRenderModeProps } from './utils/getPopoverRenderModeProps';
import {
  Align,
  DismissMode,
  Justify,
  Popover,
  PopoverProps,
  RenderMode,
  ToggleEvent,
} from './Popover';

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

const containerStyles = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const scrollableOuterStyles = css`
  width: 500px;
  height: 90vh;
  background-color: ${palette.gray.light2};
  overflow: scroll;
  position: relative;
`;

const scrollableInnerStyles = css`
  position: relative;
  height: 160vh;
  width: 80vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const defaultExcludedControls = [
  ...storybookExcludedControlParams,
  'active',
  'children',
  'portalClassName',
  'refButtonPosition',
  'refEl',
];

const meta: StoryMetaType<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: defaultExcludedControls,
    },
    generate: {
      storyNames: [
        'Top',
        'Right',
        'Bottom',
        'Left',
        'CenterHorizontal',
        'CenterVertical',
      ],
      combineArgs: {
        justify: Object.values(Justify),
      },
      args: {
        active: true,
        children: <div className={popoverStyle}>Popover content</div>,
      },

      decorator: Instance => {
        return (
          <div
            className={css`
              position: relative;
              width: 60vw;
              height: 150px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <Button>
              Button Text
              <Instance
                buttonText={undefined}
                className={css`
                  background-color: ${color.light.background.primary.default};
                `}
                dismissMode="manual"
              />
            </Button>
          </div>
        );
      },
    },
  },
  args: {
    adjustOnMutation: false,
    align: Align.Top,
    buttonText: 'Button Text',
    dismissMode: DismissMode.Auto,
    justify: Justify.Start,
    renderMode: RenderMode.TopLayer,
    spacing: 4,
  },
  argTypes: {
    align: {
      options: Object.values(Align),
      control: { type: 'radio' },
    },
    buttonText: {
      type: 'string',
      description:
        'Storybook only prop. Used to change the reference button text',
    },
    dismissMode: {
      options: Object.values(DismissMode),
      control: { type: 'radio' },
    },
    justify: {
      options: Object.values(Justify),
      control: { type: 'radio' },
    },
    renderMode: {
      options: Object.values(RenderMode),
      control: { type: 'radio' },
    },
  },
};
export default meta;

type PopoverStoryProps = PopoverProps & {
  buttonText: string;
};
export const LiveExample: StoryFn<PopoverStoryProps> = ({
  buttonText,
  ...props
}: PopoverStoryProps) => {
  const {
    portalClassName,
    portalContainer,
    portalRef,
    scrollContainer,
    dismissMode,
    renderMode = RenderMode.TopLayer,
    onToggle,
    ...rest
  } = props;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState<boolean>(false);

  const handleClick = () => {
    console.log('Button clicked');
    setActive(active => !active);
  };

  const handleToggle = (e: ToggleEvent) => {
    console.log('Toggle event', e);
    onToggle?.(e);
    const newActive = e.newState === 'open';
    setActive(newActive);
  };

  const handleBeforeToggle = (e: ToggleEvent) => {
    console.log('handleBeforeToggle', e);
    // e.preventDefault();
  };

  const popoverProps = getPopoverRenderModeProps({
    dismissMode,
    onToggle: handleToggle,
    onBeforeToggle: handleBeforeToggle,
    portalClassName,
    portalContainer,
    portalRef,
    renderMode,
    scrollContainer,
    ...rest,
  });

  return (
    <div className={containerStyles}>
      <Button onClick={handleClick} ref={buttonRef}>
        {buttonText}
      </Button>
      <Popover active={active} refEl={buttonRef} {...popoverProps}>
        <div className={popoverStyle}>Popover content</div>
      </Popover>
      <Button
        onClick={() => {
          console.log('Other button clicked');
        }}
      >
        Other button
      </Button>
    </div>
  );
};
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

const PortalPopoverInScrollableContainer = ({
  buttonText,
  ...rest
}: PopoverStoryProps) => {
  const [active, setActive] = useState<boolean>(false);
  const portalRef = useRef<HTMLElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const popoverProps = getPopoverRenderModeProps({
    renderMode: RenderMode.Portal,
    portalRef: portalRef,
    portalContainer: scrollContainer.current,
    scrollContainer: scrollContainer.current,
    ...rest,
  });

  return (
    <div className={scrollableOuterStyles}>
      <div className={scrollableInnerStyles} ref={scrollContainer}>
        <Button onClick={() => setActive(active => !active)}>
          {buttonText}
          <Popover active={active} {...popoverProps}>
            <div className={popoverStyle}>Popover content</div>
          </Popover>
        </Button>
      </div>
    </div>
  );
};
export const RenderModePortalInScrollableContainer = {
  render: PortalPopoverInScrollableContainer,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      exclude: [...defaultExcludedControls, 'dismissMode', 'renderMode'],
    },
  },
  argTypes: {
    renderMode: { control: 'none' },
    portalClassName: { control: 'none' },
    refEl: { control: 'none' },
    className: { control: 'none' },
    active: { control: 'none' },
  },
  args: {
    renderMode: RenderMode.Portal,
  },
};

const InlinePopover = ({ buttonText, ...props }: PopoverStoryProps) => {
  const {
    dismissMode,
    onToggle,
    renderMode,
    portalClassName,
    portalContainer,
    portalRef,
    scrollContainer,
    ...rest
  } = props;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState<boolean>(false);

  const popoverProps = getPopoverRenderModeProps({
    renderMode: RenderMode.Inline,
    ...rest,
  });

  return (
    <div className={containerStyles}>
      <Button onClick={() => setActive(active => !active)} ref={buttonRef}>
        {buttonText}
      </Button>
      <Popover active={active} refEl={buttonRef} {...popoverProps}>
        <div className={popoverStyle}>Popover content</div>
      </Popover>
    </div>
  );
};
export const RenderModeInline = {
  render: InlinePopover,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      exclude: [...defaultExcludedControls, 'dismissMode', 'renderMode'],
    },
  },
  argTypes: {
    renderMode: { control: 'none' },
    portalClassName: { control: 'none' },
    refEl: { control: 'none' },
    className: { control: 'none' },
    active: { control: 'none' },
  },
  args: {
    renderMode: RenderMode.Inline,
  },
};

const generatedStoryExcludedControlParams = [
  ...storybookExcludedControlParams,
  'active',
  'adjustOnMutation',
  'align',
  'buttonText',
  'children',
  'dismissMode',
  'justify',
  'portalClassName',
  'refButtonPosition',
  'refEl',
  'renderMode',
  'spacing',
  'usePortal',
];

export const Top = {
  render: LiveExample.bind({}),
  args: {
    align: Align.Top,
  },
  parameters: {
    controls: {
      exclude: generatedStoryExcludedControlParams,
    },
  },
};

export const Bottom = {
  render: LiveExample.bind({}),
  args: {
    align: Align.Bottom,
  },
  parameters: {
    controls: {
      exclude: generatedStoryExcludedControlParams,
    },
  },
};

export const Left = {
  render: LiveExample.bind({}),
  args: {
    align: Align.Left,
  },
  parameters: {
    controls: {
      exclude: generatedStoryExcludedControlParams,
    },
  },
};

export const Right = {
  render: LiveExample.bind({}),
  args: {
    align: Align.Right,
  },
  parameters: {
    controls: {
      exclude: generatedStoryExcludedControlParams,
    },
  },
};

export const CenterHorizontal = {
  render: LiveExample.bind({}),
  args: {
    align: Align.CenterHorizontal,
  },
  parameters: {
    controls: {
      exclude: generatedStoryExcludedControlParams,
    },
  },
};

export const CenterVertical: StoryObj<PopoverStoryProps> = {
  render: LiveExample.bind({}),
  args: {
    align: Align.CenterVertical,
  },
  parameters: {
    controls: {
      exclude: generatedStoryExcludedControlParams,
    },
  },
};
