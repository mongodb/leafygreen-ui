import React from 'react';
import { ComponentStory, Meta, storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import FormFooter from '.';

export default {
  title: 'Packages/FormFooter',
  component: FormFooter,
  // args: {
  //   cancelButtonText: 'Cancel button text',
  //   backButtonText: 'Back button text',
  //   errorMessage: 'Error message',
  //   primaryButton: {
  //     text: 'Primary button text'
  //   },
  // },
  parameters: { 
    controls: { 
      exclude: ['children', 'onClose', 'ref'] 
    }
  }
} as Meta<typeof FormFooter>;

const Template: ComponentStory<typeof FormFooter> = args => <FormFooter {...args} />

export const Basic = Template.bind({})
Basic.args = {
  primaryButton: {
    text: 'Primary button text'
  },
}

export const AllButtons = Template.bind({})
AllButtons.args = {
  cancelButtonText: 'Cancel button text',
  backButtonText: 'Back button text',
  errorMessage: 'Error message',
  primaryButton: {
    text: 'Primary button text'
  },
}

export const WithCustomPrimaryButton = Template.bind({})
WithCustomPrimaryButton.args = {
  cancelButtonText: 'Cancel button text',
  backButtonText: 'Back button text',
  errorMessage: 'Error message',
  primaryButton: <Button
              leftGlyph={<Icon glyph={'Cloud'} />}
              rightGlyph={<Icon glyph={'Checkmark'} />}
              variant="primary"
              disabled
            >
              Save to cloud
            </Button>
}

export const InLargerContainer: ComponentStory<typeof FormFooter> = args => (
  <div
    className={css`
      width: 2000px;
    `}
  >
    <FormFooter {...args} />
  </div>
)
InLargerContainer.args = {
  primaryButton: {
    text: 'Primary button text'
  },
}

// storiesOf('Packages/FormFooter', module)
//   .add('Default', () => (
//     <div
//       className={css`
//         width: 1200px;
//         margin: auto;
//         position: relative;
//       `}
//     >
//       <FormFooter
//         className={css`
//           position: absolute;
//           bottom: 0;
//           left: 0;
//         `}
//         primaryButton={{
//           text: text('Primary button text', 'Save Draft'),
//         }}
//         cancelButtonText={text('Cancel button text', '')}
//         backButtonText={text('Back button text', '')}
//         errorMessage={text('Error message', 'There is an error in this form')}
//         contentClassName={css`
//           max-width: 1024px;
//         `}
//       />
//     </div>
//   ))
//   .add('with custom primary button', () => (
//     <div
//       className={css`
//         position: relative;
//         width: 1200px;
//         margin: auto;
//       `}
//     >
//       <FormFooter
//         className={css`
//           position: absolute;
//           bottom: 0;
//           left: 0;
//         `}
//         primaryButton={
//           <Button
//             leftGlyph={<Icon glyph={'Cloud'} />}
//             rightGlyph={<Icon glyph={'Checkmark'} />}
//             variant="primary"
//             disabled={boolean('Primary button disabled', false)}
//           >
//             Save to cloud
//           </Button>
//         }
//         cancelButtonText={text('Cancel button text', '')}
//         backButtonText={text('Back button text', 'Go back')}
//         errorMessage={text('Error message', 'There is an error in this form')}
//       />
//     </div>
//   ));
