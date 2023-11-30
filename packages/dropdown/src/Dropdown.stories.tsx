import React, { useRef, useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { RenderedContext } from '@leafygreen-ui/input-option';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import {
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownLabel,
  DropdownProps,
} from '.';

type StoryProps = Omit<
  DropdownProps,
  'triggerRef' | 'open' | 'setOpen' | 'usePortal'
>;

const meta: StoryMetaType<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'triggerRef',
        'children',
        'setOpen',
        'as',
        'open',
      ],
    },
    generate: {
      combineArgs: {
        darkMode: [true, false],
        renderedContext: Object.values(RenderedContext),
      },
      args: {
        open: true,
        maxHeight: 200,
      },
      decorator: (_, ctx) => (
        <div
          className={css`
            height: 250px;
          `}
        >
          <DropdownExample {...ctx?.args} />
        </div>
      ),
    },
  },
};

export default meta;

const DropdownExample = (props: StoryProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.nativeEvent.stopPropagation();

    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Button ref={ref} onClick={handleTriggerClick}>
      Content!
      <Dropdown
        triggerRef={ref}
        open={open}
        setOpen={setOpen}
        maxWidth={400}
        {...props}
      >
        <DropdownLabel label="Testing">
          <DropdownItem description="I am a description">Child A</DropdownItem>
          <DropdownItem>Child B</DropdownItem>
        </DropdownLabel>
        <DropdownItem disabled>Child C</DropdownItem>
        <DropdownItem active>Child D</DropdownItem>
        <DropdownGroup hasAction href="string" title="title">
          <DropdownItem>Hey</DropdownItem>
          <DropdownItem>There</DropdownItem>
        </DropdownGroup>
      </Dropdown>
    </Button>
  );
};

export const LiveExample: StoryFn<React.ComponentType<DropdownProps>> = (
  props: DropdownProps,
) => <DropdownExample {...props} />;

export const Generated = () => <></>;
