import React from 'react';
import { ComponentStory } from '@storybook/react';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import IconButton from './IconButton';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

export default {
  title: 'Packages/IconButton',
  component: IconButton,
  argTypes: {
    href: {
      control: 'string',
    },
    darkMode: {
      control: 'boolean',
    },
    active: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  }
};

const Template: ComponentStory<typeof IconButton> = ({ darkMode, ...args }) => (
  <div className={css`
    padding: 60px;
    ${ darkMode && `background-color: ${palette.gray.dark3};` }
  `}>
    <IconButton darkMode={darkMode} {...args}>
      <CloudIcon />
    </IconButton>
  </div>
)

export const Basic = Template.bind({})

export const Link = Template.bind({})
Link.args = {
  href: 'https://mongodb.design',
}


// const containerStyle = css`
//   padding: 60px;
// `;

// const darkBackground = css`
//   background-color: ${uiColors.gray.dark3};
// `;

// function getContainerStyle(darkMode: boolean) {
//   return cx(containerStyle, {
//     [darkBackground]: darkMode,
//   });
// }

// function getCommonProps() {
//   return {
//     'aria-label': 'Cloud',
//     active: boolean('active', false),
//     disabled: boolean('disabled', false),
//     darkMode: boolean('darkMode', false),
//     size: select('Size', Object.values(Size) as Array<Size>, Size.Default),
//     // eslint-disable-next-line no-console
//     onClick: () => console.log('Click'),
//   };
// }

// storiesOf('Packages/IconButton', module)
//   .add('Default', () => {
//     const commonProps = getCommonProps();

//     return (
//       <LeafyGreenProvider>
//         <div className={getContainerStyle(commonProps.darkMode)}>
//           <IconButton {...commonProps}>
//             <CloudIcon />
//           </IconButton>
//         </div>
//       </LeafyGreenProvider>
//     );
//   })
//   .add('Link', () => {
//     const commonProps = getCommonProps();

//     return (
//       <div className={getContainerStyle(commonProps.darkMode)}>
//         <IconButton {...commonProps} href="https://mongodb.design">
//           <EllipsisIcon />
//         </IconButton>
//       </div>
//     );
//   });
