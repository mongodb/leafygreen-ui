/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import Button from '@leafygreen-ui/button';
import { FormTemplate, Field, ModalFormTemplateProps } from '.';

export default {
  title: 'Components/Forms',
  component: FormTemplate.Modal,
};

interface FormTemplateKnobProps extends ModalFormTemplateProps {
  testText: string;
}

// type FormTemplateKnobProps = (typeof FormTemplate)['Modal'] & {
//   testText: string;
// };

const Template: StoryFn<FormTemplateKnobProps> = ({
  open: _open,
  setOpen: _setOpen,
  onSubmit: _onSubmit,
  title = 'Example modal form',
  testText = '',
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
        // name="hello" TODO: Add name support for id prefixes, eventual telemetry tie-ins
        onSubmit={() => {
          return new Promise(resolve => setTimeout(resolve, 2000));
        }}
        {...props}
      >
        <Field.String // id: lg-<form-name>-first
          required
          type="text"
          name="first"
          label={`This is a required input  ${title}`}
        />

        <Field.String
          type="textarea"
          name="second"
          label="This is an optional input"
          description="Textareas can render descriptions too"
        />

        <Field.String
          type="text"
          name="third"
          label="This is a special custom validated input"
          description="Only the word 'hello' is valid"
          validator={value => value === 'hello'}
        />

        {/* <Field.SingleSelect
          type="select"
          label="This is a single select field"
          name="singleselect"
        >
          <Field.SingleSelect.Option name="option1" label="hello" /> // TODO:
          Option should be scoped more broadly
          <Field.SingleSelect.Option name="option2" label="world" />
        </Field.SingleSelect> */}
      </FormTemplate.Modal>
    </>
  );
};

export const Basic = Template.bind({});
