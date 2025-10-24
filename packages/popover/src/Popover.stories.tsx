import React, { useRef, useState } from 'react';
import { faker } from '@faker-js/faker';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { Button } from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import { useEventListener } from '@leafygreen-ui/hooks';
import { palette } from '@leafygreen-ui/palette';
import { color, spacing } from '@leafygreen-ui/tokens';
import { Body, InlineCode } from '@leafygreen-ui/typography';

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

faker.seed(123);

const popoverStyles = css`
  border: 1px solid ${palette.gray.light1};
  text-align: center;
  padding: ${spacing[300]}px;
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
  render: () => <></>,
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
  render: () => <></>,
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
  render: () => <></>,
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
  render: () => <></>,
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
  render: () => <></>,
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
  render: () => <></>,
  args: {
    align: Align.CenterVertical,
  },
  parameters: {
    controls: {
      exclude: generatedStoryExcludedControlParams,
    },
  },
};

const paragraphs: Array<string> = faker.lorem.paragraphs(12).split('\n');

export const MaxHeight: StoryObj<PopoverStoryProps> = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const trigger1Ref = useRef<HTMLButtonElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const trigger2Ref = useRef<HTMLButtonElement>(null);

    const MAX_HEIGHT = 512;
    const MAX_WIDTH = 350;

    return (
      <table style={{ width: '100%', height: '100%' }}>
        <tr>
          <th>
            <code>maxHeight: undefined</code> (default)
          </th>
          <th>
            <code>maxHeight: {MAX_HEIGHT}px</code>
          </th>
        </tr>
        <tr>
          <td>
            <Button ref={trigger1Ref}>Trigger</Button>
            <Popover
              active
              refEl={trigger1Ref}
              dismissMode={DismissMode.Manual}
              renderMode={RenderMode.TopLayer}
              maxWidth={MAX_WIDTH}
              className={cx(
                popoverStyles,
                css`
                  text-align: left;
                `,
              )}
            >
              <Body>
                By default, a popover takes up the maximum amount of vertical
                space
              </Body>
              {paragraphs.map((p, i) => (
                <Body key={i}>{p}</Body>
              ))}
            </Popover>
          </td>
          <td>
            <Button ref={trigger2Ref}>Trigger</Button>
            <Popover
              active
              refEl={trigger2Ref}
              dismissMode={DismissMode.Manual}
              renderMode={RenderMode.TopLayer}
              maxHeight={MAX_HEIGHT}
              maxWidth={MAX_WIDTH}
              className={cx(
                popoverStyles,
                css`
                  text-align: left;
                `,
              )}
            >
              <Body>
                The height can be further restricted with the{' '}
                <InlineCode>maxHeight</InlineCode> prop
              </Body>
              {paragraphs.map((p, i) => (
                <Body key={i}>{p}</Body>
              ))}
            </Popover>
          </td>
        </tr>
      </table>
    );
  },
};

export const MaxWidth: StoryObj<PopoverStoryProps> = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const trigger1Ref = useRef<HTMLButtonElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const trigger2Ref = useRef<HTMLButtonElement>(null);

    const MAX_HEIGHT = 128;
    const MAX_WIDTH = 350;

    return (
      <table style={{ width: '100%', height: '100%' }}>
        <tr style={{ height: 2 * MAX_HEIGHT }}>
          <th style={{ width: '25%' }}>
            <code>maxWidth: undefined</code> (default)
          </th>
          <td>
            <Button ref={trigger1Ref}>Trigger</Button>
            <Popover
              active
              refEl={trigger1Ref}
              dismissMode={DismissMode.Manual}
              renderMode={RenderMode.TopLayer}
              maxHeight={MAX_HEIGHT}
              className={cx(
                popoverStyles,
                css`
                  text-align: left;
                `,
              )}
            >
              <Body>
                By default, a popover takes up the maximum amount of horizontal
                space
              </Body>
              {paragraphs.map((p, i) => (
                <Body key={i}>{p}</Body>
              ))}
            </Popover>
          </td>
        </tr>
        <tr style={{ height: 2 * MAX_HEIGHT }}>
          <th style={{ width: '25%' }}>
            <code>maxWidth: {MAX_WIDTH}px</code>
          </th>
          <td>
            <Button ref={trigger2Ref}>Trigger</Button>
            <Popover
              active
              refEl={trigger2Ref}
              dismissMode={DismissMode.Manual}
              renderMode={RenderMode.TopLayer}
              maxHeight={MAX_HEIGHT}
              maxWidth={MAX_WIDTH}
              className={cx(
                popoverStyles,
                css`
                  text-align: left;
                `,
              )}
            >
              <Body>
                The width can be further restricted with the{' '}
                <InlineCode>maxWidth</InlineCode> prop
              </Body>
              {paragraphs.map((p, i) => (
                <Body key={i}>{p}</Body>
              ))}
            </Popover>
          </td>
        </tr>
      </table>
    );
  },
};

export const MovingPopover: StoryObj<PopoverStoryProps> = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const triggerRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [position, setPosition] = useState({ top: 0, left: 0 });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEventListener(
      'click',
      event => {
        const { clientX, clientY } = event;
        const position = { top: clientY, left: clientX };
        // @ts-ignore
        setPosition(position);
      },
      {
        dependencies: [setPosition],
      },
    );

    return (
      <>
        <div
          style={{ position: 'absolute', width: 1, height: 1, ...position }}
          ref={triggerRef}
        ></div>
        <Popover
          active
          refEl={triggerRef}
          dismissMode={DismissMode.Manual}
          renderMode={RenderMode.TopLayer}
          className={popoverStyles}
        >
          Popover with refEl position{' '}
          <code>{JSON.stringify(position, null, 2)}</code>
        </Popover>
      </>
    );
  },
  play: async () => {
    // We'll simulate a click at coordinates {left: 200, top: 180}
    await new Promise(r => setTimeout(r, 200)); // Let the story render

    const clickX = 200;
    const clickY = 180;

    // Simulate click event on the document at (clickX, clickY)
    // Use the 'pointerEvents' API if available, otherwise dispatch manually
    const event = new MouseEvent('click', {
      clientX: clickX,
      clientY: clickY,
      bubbles: true,
      cancelable: true,
      view: window,
    });
    document.dispatchEvent(event);
  },
};
