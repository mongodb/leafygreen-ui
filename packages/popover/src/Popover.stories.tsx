import React, { useRef, useState } from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
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
  max-width: 200px;
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
      // eslint-disable-next-line react/display-name
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
    refButtonPosition: {
      options: ['centered', 'top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
      description:
        'Storybook only prop. Used to change position of the reference button',
      defaultValue: 'centered',
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
  refButtonPosition: string;
};
export const LiveExample: StoryFn<PopoverStoryProps> = ({
  refButtonPosition,
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

  const position = referenceElPositions[refButtonPosition];

  const handleClick = () => {
    setActive(active => !active);
  };

  const handleToggle = (e: ToggleEvent) => {
    onToggle?.(e);
    const newActive = e.newState === 'open';
    setActive(newActive);
  };

  const popoverProps = {
    active,
    refEl: buttonRef,
    ...getPopoverRenderModeProps({
      dismissMode,
      onToggle: handleToggle,
      portalClassName,
      portalContainer,
      portalRef,
      renderMode,
      scrollContainer,
    }),
    ...rest,
  };

  return (
    <div className={containerStyles}>
      <Button
        className={cx(buttonStyles, position)}
        onClick={handleClick}
        ref={buttonRef}
      >
        {buttonText}
      </Button>
      <Popover {...popoverProps}>
        <div className={popoverStyle}>Popover content</div>
      </Popover>
    </div>
  );
};
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

const PortalPopoverInScrollableContainer = ({
  refButtonPosition,
  buttonText,
  ...props
}: PopoverStoryProps) => {
  const { dismissMode, onToggle, renderMode, ...rest } = props;
  const [active, setActive] = useState<boolean>(false);
  const portalRef = useRef<HTMLElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const position = referenceElPositions[refButtonPosition];

  return (
    <div className={scrollableOuterStyles}>
      <div className={scrollableInnerStyles} ref={scrollContainer}>
        <Button
          onClick={() => setActive(active => !active)}
          className={position}
        >
          {buttonText}
          <Popover
            {...rest}
            active={active}
            renderMode={RenderMode.Portal}
            portalContainer={scrollContainer.current}
            portalRef={portalRef}
            scrollContainer={scrollContainer.current}
          >
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
};

const InlinePopover = ({
  refButtonPosition,
  buttonText,
  ...props
}: PopoverStoryProps) => {
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

  const position = referenceElPositions[refButtonPosition];

  return (
    <div className={containerStyles}>
      <Button
        className={cx(buttonStyles, position)}
        onClick={() => setActive(active => !active)}
        ref={buttonRef}
      >
        {buttonText}
      </Button>
      <Popover
        {...rest}
        active={active}
        refEl={buttonRef}
        renderMode={RenderMode.Inline}
      >
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
