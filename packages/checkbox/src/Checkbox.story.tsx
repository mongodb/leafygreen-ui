import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { colors } from '@leafygreen-ui/theme';
import Checkbox from '.';

interface ControlProps {
  darkMode?: boolean;
  checked?: boolean;
  bold?: boolean;
  indeterminate?: boolean;
  label?: string;
  disabled?: boolean;
  animate?: boolean;
}

// class Control extends PureComponent<ControlProps> {
//   static propTypes = {
//     darkMode: PropTypes.bool,
//     checked: PropTypes.bool,
//     disabled: PropTypes.bool,
//     indeterminate: PropTypes.bool,
//     label: PropTypes.string,
//     bold: PropTypes.bool,
//     animate: PropTypes.bool,
//   };

//   state = { checked: false };

//   onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({ checked: e.target.checked });
//   };

//   render() {
//     const {
//       bold,
//       indeterminate,
//       animate,
//       label,
//       disabled,
//       darkMode = false,
//     } = this.props;
//     const { checked } = this.state;

//     return (
//       <div
//         className={css`
//           background-color: ${!darkMode ? colors.gray[1] : colors.gray[8]};
//           padding: 20px;
//         `}
//       >
//         <Checkbox
//           checked={checked}
//           disabled={disabled}
//           indeterminate={indeterminate}
//           onChange={this.onChange}
//           label={label}
//           darkMode={darkMode}
//           bold={bold}
//           animate={animate}
//         />
//       </div>
//     );
//   }
// }

storiesOf('Checkbox', module).add('Default', () => (
  <Checkbox
    checked={boolean('chcked', false)}
    darkMode={boolean('darkMode', false)}
    disabled={boolean('Disabled', false)}
    indeterminate={boolean('Indeterminate', false)}
    label={text('Label', 'I agree to this thing.')}
    bold={boolean('Bold', false)}
    animate={boolean('Animate', true)}
  />
));
