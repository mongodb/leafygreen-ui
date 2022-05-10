import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import Popover, { Align, Justify } from '.';

const scrollableStyle = css`
  height: 200vh;
  padding-top: 50vh;
`;

export default {
  title: 'Packages/Popover',
  component: Popover,
  args: {
    align: Align.Top,
    justify: Justify.Start,
    usePortal: true,
    spacing: 10,
    adjustOnMutation: false,
    buttonText: 'Button Text',
  },
  argTypes: {
    className: {
      type: 'string',
    },
    children: {
      control: false,
    },
  },
} as Meta<typeof Popover>;

const Template = ({ buttonText, ...args }) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <button onClick={() => setActive(active => !active)}>
      {buttonText}
      <Popover
          {...args}
          active={active}
        >
          <div className={popoverStyle}>Popover content</div>
        </Popover>
    </button>
  )
}

export const Basic = Template.bind({})

export const ScrollableContainer = (args) => (
  <div className={scrollableStyle}><Template {...args} /></div>
)

// export function DefaultExample() {
//   const [active, setActive] = useState(false);
//   const exampleIsScrollable = boolean('Example page scrolling', false);

//   return (
//     <div className={cx({ [scrollableStyle]: exampleIsScrollable })}>
//       <button
//         onClick={() => setActive(!active)}
//         className={cx(
//           containerStyle,
//           referenceElPositions[
//             select(
//               'Reference Element Position',
//               ['centered', 'top', 'right', 'bottom', 'left'],
//               'centered',
//             )
//           ],
//         )}
//       >
//         {text('Button Content', 'Popover')}
//         <Popover
//           align={select('Align', Object.values(Align), 'top')}
//           justify={select('justify', Object.values(Justify), 'start')}
//           active={active}
//           usePortal={boolean('usePortal', true)}
//           spacing={number('spacing', 10)}
//           adjustOnMutation={boolean('adjustOnMutation', false)}
//         >
//           <div className={popoverStyle}>Popover content</div>
//         </Popover>
//       </button>
//     </div>
//   );
// }

// function AdvancedExample() {
//   const [active, setActive] = useState(false);
//   const refEl = useRef(null);

//   return (
//     <>
//       <button
//         ref={refEl}
//         onClick={() => setActive(!active)}
//         className={cx(
//           containerStyle,
//           referenceElPositions[
//             select(
//               'Reference Element Position',
//               ['centered', 'top', 'right', 'bottom', 'left'],
//               'centered',
//             )
//           ],
//         )}
//       >
//         {text('Button Content', 'Popover')}
//       </button>

//       <Popover
//         align={select('Align', Object.values(Align), 'top')}
//         justify={select('justify', Object.values(Justify), 'start')}
//         active={active}
//         usePortal={boolean('usePortal', true)}
//         spacing={number('spacing', 10)}
//         adjustOnMutation={boolean('adjustOnMutation', false)}
//         popoverZIndex={number('popoverZIndex', 1)}
//         refEl={refEl}
//       >
//         <div className={popoverStyle}>Popover content</div>
//       </Popover>
//     </>
//   );
// }

// function ScrollExample() {
//   const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
//     null,
//   );
//   const [active, setActive] = useState(false);
//   const buttonRef = useRef(null);

//   return (
//     <>
//       <div
//         ref={el => setPortalContainer(el)}
//         className={css`
//           margin: 150px;
//           width: 100%;
//           overflow-y: auto;
//           background-color: #eaeaea;
//           max-height: calc(100vh - 200px);
//           padding: 100px;
//           position: relative;
//         `}
//       >
//         <button
//           ref={buttonRef}
//           onClick={() => setActive(curr => !curr)}
//           className={cx(
//             containerStyle,
//             referenceElPositions[
//               select(
//                 'Reference Element Position',
//                 ['centered', 'top', 'right', 'bottom', 'left'],
//                 'centered',
//               )
//             ],
//           )}
//         >
//           {text('Button Content', 'Popover')}
//         </button>
//       </div>

//       <Popover
//         align={select('Align', Object.values(Align), 'top')}
//         justify={select('justify', Object.values(Justify), 'start')}
//         spacing={number('spacing', 10)}
//         adjustOnMutation={boolean('adjustOnMutation', false)}
//         portalContainer={portalContainer}
//         scrollContainer={portalContainer}
//         active={active}
//         refEl={buttonRef}
//       >
//         <div className={popoverStyle}>Popover content</div>
//       </Popover>
//     </>
//   );
// }

// // storiesOf('Packages/Popover', module)
// //   .add('Default', () => <DefaultExample />)
// //   .add('Advanced', () => <AdvancedExample />)
// //   .add('Scroll Container', () => <ScrollExample />);
