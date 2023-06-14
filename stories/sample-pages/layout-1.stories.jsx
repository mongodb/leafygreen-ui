import React from 'react';
import Button from '@leafygreen-ui/button';

export default {
  title: 'Sample Pages (WIP)/Layout 1',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

const Template = ({ children }) => {
  return (
    <>
      This is some layout. Things like side nav could go here.
      {children}
    </>
  );
};

export const ProfilePage = Template.bind({});
ProfilePage.parameters = {
  chromatic: {disableSnapshot: true}
}
ProfilePage.args = {
  children: (
    <>
      <Button>Some button.</Button>
    </>
  ),
};

export const SomeOtherPage = Template.bind({});
SomeOtherPage.parameters = {
  chromatic: {disableSnapshot: true}
}
SomeOtherPage.args = {
  children: (
    <>
      <Button>Some other button.</Button>
    </>
  ),
};
