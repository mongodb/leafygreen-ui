// import { glyphs } from '@leafygreen-ui/icon';

// const knobsConfig = {
//   variant: {
//     type: 'select',
//     options: ['primary', 'default', 'info', 'dark', 'danger'],
//     default: 'primary',
//     label: 'Variant',
//   },
//   size: {
//     type: 'select',
//     options: ['xsmall', 'small', 'normal', 'large'],
//     default: 'normal',
//     label: 'Size',
//   },
//   disabled: {
//     type: 'boolean',
//     default: false,
//     label: 'Disabled',
//   },
//   href: {
//     type: 'select',
//     options: ['components/box', undefined],
//     default: 'components/box',
//     label: 'href',
//   },
//   title: {
//     type: 'text',
//     default: 'The button title',
//     label: 'Title',
//   },
//   glyph: {
//     type: 'select',
//     options: Object.keys(glyphs),
//     default: 'Edit',
//     label: 'Glyph',
//   },
//   children: {
//     type: 'text',
//     default: 'Button',
//     label: 'Children',
//   },
// };

// // export default knobsConfig;
// export default () => (
//   <ExampleWrapper config={knobsConfig}>
//     {({ menuItemText, ...rest }) => (
//       <Menu {...rest}>
//         <MenuItem></MenuItem>
//       </Menu>
//     )}
//   </ExampleWrapper>
// );

// <LiveExample component={component} props={knobsConfig} />

// <LiveExample props={knobsConfig}>
//   {(props)} => (
//     <Component {...props}/>
//   )
// </LiveExample>
