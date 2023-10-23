import React, { useRef, useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { storybookExcludedControlParams } from '@leafygreen-ui/lib';

import { Dropdown, DropdownGroup, DropdownItem, DropdownLabel } from '.';

const DropdownExample = props => {
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
        <DropdownItem href="test" active>
          Child D
        </DropdownItem>
        <DropdownGroup title="title">
          <DropdownItem>Hey</DropdownItem>
          <DropdownItem>There</DropdownItem>
        </DropdownGroup>
      </Dropdown>
    </Button>
  );
};

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'trigger',
        'children',
        'refEl',
        'setOpen',
        'as',
        'open',
      ],
    },
  },
};

const Template: StoryFn<typeof Dropdown> = props => (
  <DropdownExample {...props} />
);

export const Basic = Template.bind({});
