import React, { useRef, useState } from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { color, spacing } from '@leafygreen-ui/tokens';

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

const popoverStyles = css`
  border: 1px solid ${palette.gray.light1};
  text-align: center;
  padding: ${spacing[300]}px;
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

const largePopoverStyles = css`
  ${popoverStyles}
  height: 200px;
  width: 360px;
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
  title: 'Composition/Overlays/Popover',
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
        children: <div className={popoverStyles}>Popover content</div>,
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line no-console
    console.log('handleClick', e);
    setActive(active => !active);
  };

  const handleToggle = (e: ToggleEvent) => {
    // eslint-disable-next-line no-console
    console.log('handleToggle', e);
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
      <Button onClick={handleClick} ref={buttonRef}>
        {buttonText}
      </Button>
      <Popover {...popoverProps}>
        <div className={popoverStyles}>Popover content</div>
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
  buttonText,
  ...props
}: PopoverStoryProps) => {
  const { dismissMode, onToggle, renderMode, ...rest } = props;
  const [active, setActive] = useState<boolean>(false);
  const portalRef = useRef<HTMLElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  return (
    <div className={scrollableOuterStyles}>
      <div className={scrollableInnerStyles} ref={scrollContainer}>
        <Button onClick={() => setActive(active => !active)}>
          {buttonText}
          <Popover
            {...rest}
            active={active}
            renderMode={RenderMode.Portal}
            portalContainer={scrollContainer.current}
            portalRef={portalRef}
            scrollContainer={scrollContainer.current}
          >
            <div className={popoverStyles}>Popover content</div>
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

  return (
    <div className={containerStyles}>
      <Button onClick={() => setActive(active => !active)} ref={buttonRef}>
        {buttonText}
      </Button>
      <Popover
        {...rest}
        active={active}
        refEl={buttonRef}
        renderMode={RenderMode.Inline}
      >
        <div className={popoverStyles}>Popover content</div>
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

const WITH_ADJUST_POPOVER_TEXT = `This popover was set to align="top" and justify="end" but detected it would overflow the viewport. With adjustOnMutation enabled, it flipped to align="bottom" and justify="start" to stay fully visible.`;
const WITHOUT_ADJUST_POPOVER_TEXT = `This popover is set to align="bottom" and justify="start" but won't adjust its position. With adjustOnMutation disabled, it remains in its initial position and gets clipped.`;

const AdjustOnMutationComponent = () => {
  const buttonWithAdjustRef = useRef<HTMLButtonElement | null>(null);
  const buttonWithoutAdjustRef = useRef<HTMLButtonElement | null>(null);
  const [activeWithAdjust, setActiveWithAdjust] = useState<boolean>(true);
  const [activeWithoutAdjust, setActiveWithoutAdjust] = useState<boolean>(true);

  return (
    <div
      className={css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      `}
    >
      <div
        className={css`
          position: absolute;
          top: 140px;
          left: 160px;
        `}
      >
        <Button
          onClick={() => setActiveWithAdjust(a => !a)}
          ref={buttonWithAdjustRef}
        >
          adjustOnMutation: true
        </Button>
        <Popover
          active={activeWithAdjust}
          adjustOnMutation={true}
          align={Align.Top}
          dismissMode={DismissMode.Manual}
          justify={Justify.End}
          refEl={buttonWithAdjustRef}
          renderMode={RenderMode.TopLayer}
        >
          <div className={largePopoverStyles}>
            <strong>✅ adjustOnMutation: true</strong>
            <p>{WITH_ADJUST_POPOVER_TEXT}</p>
          </div>
        </Popover>
      </div>
      <div
        className={css`
          position: absolute;
          bottom: 140px;
          right: 160px;
        `}
      >
        <Button
          onClick={() => setActiveWithoutAdjust(a => !a)}
          ref={buttonWithoutAdjustRef}
        >
          adjustOnMutation: false
        </Button>
        <Popover
          active={activeWithoutAdjust}
          adjustOnMutation={false}
          align={Align.Bottom}
          dismissMode={DismissMode.Manual}
          justify={Justify.Start}
          refEl={buttonWithoutAdjustRef}
          renderMode={RenderMode.TopLayer}
        >
          <div className={largePopoverStyles}>
            <strong>❌ adjustOnMutation: false</strong>
            <p>{WITHOUT_ADJUST_POPOVER_TEXT}</p>
          </div>
        </Popover>
      </div>
    </div>
  );
};
export const AdjustOnMutation: StoryObj<PopoverStoryProps> = {
  render: AdjustOnMutationComponent,
};
