/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import Button from '@leafygreen-ui/button';
import { FormTemplate, Field } from '.';

export default {
  title: 'Components/Forms',
  component: FormTemplate.Modal,
};

type FormTemplateKnobProps = (typeof FormTemplate)['Modal'];

const Template: StoryFn<FormTemplateKnobProps> = ({
  open: _open,
  setOpen: _setOpen,
  onSubmit: _onSubmit,
  title = 'Example modal form',
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <FormTemplate.Modal
        open={open}
        setOpen={setOpen}
        title={title}
        onSubmit={() => {
          console.log('onSubmit called');
          return new Promise(resolve => setTimeout(resolve, 2000));
        }}
        {...props}
      >
        <Field.String
          required
          type="text"
          name="first"
          label="Example String Input"
        />

        <Field.String type="text" name="second" label="Second input" />
      </FormTemplate.Modal>
    </>
  );
};

export const Basic = Template.bind({});
