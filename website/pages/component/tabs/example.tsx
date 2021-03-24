// import React from 'react';
// import { css } from 'emotion';
// import { Tab, Tabs } from '@leafygreen-ui/tabs';
// import LiveExample, { KnobsConfigInterface } from 'components/live-example';
// import { uiColors } from '@leafygreen-ui/palette/dist';

// const knobsConfig: KnobsConfigInterface<{
//   darkMode: boolean;
//   disabled: boolean;
//   name: string;
//   children: string;
// }> = {
//   darkMode: {
//     type: 'boolean',
//     default: false,
//     label: 'Dark Mode',
//   },
//   disabled: {
//     type: 'boolean',
//     default: false,
//     label: 'Disabled',
//   },
//   name: {
//     type: 'text',
//     default: 'Users',
//     label: 'Name',
//   },
//   children: {
//     type: 'text',
//     default: 'Find a user',
//     label: 'Children',
//   },
// };

// export default function TabsLiveExample() {
//   return (
//     <LiveExample knobsConfig={knobsConfig}>
//       {({ children, name, disabled, darkMode }) => (
//         <div
//           className={css`
//             min-width: 400px;
//           `}
//         >
//           <Tabs darkMode={darkMode} aria-label="Example usage of Tab component">
//             <Tab default name={name}>
//               <div
//                 className={css`
//                   color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
//                 `}
//               >
//                 {children}
//               </div>
//             </Tab>
//             <Tab name="Teams">
//               <div
//                 className={css`
//                   color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
//                 `}
//               >
//                 Grant teams of users access to projects
//               </div>
//             </Tab>
//             <Tab name="API Keys" disabled={disabled}>
//               <div
//                 className={css`
//                   color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
//                 `}
//               >
//                 Manage your infrastructure in code
//               </div>
//             </Tab>
//           </Tabs>
//         </div>
//       )}
//     </LiveExample>
//   );
// }

import React, { useState } from 'react';
import { css } from 'emotion';
import { Tab, Tabs } from '@leafygreen-ui/tabs';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';
import { uiColors } from '@leafygreen-ui/palette/dist';
const knobsConfig: KnobsConfigInterface<{
  darkMode: boolean;
  disabled: boolean;
  name: string;
  children: string;
}> = {
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
  name: {
    type: 'text',
    default: 'Users',
    label: 'Name',
  },
  children: {
    type: 'text',
    default: 'Find a user',
    label: 'Children',
  },
};

export default function TabsLiveExample() {
  const [selected, setSelected] = useState(0);
  const disabled = false;
  const darkMode = false;
  const name = 'test';
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => (
        <div>
          <Tabs
            darkMode={darkMode}
            aria-label="Example usage of Tab component"
            setSelected={setSelected}
            selected={selected}
          >
            <Tab default name={name}>
              <div
                className={css`
                  color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
                `}
              >
                testing
              </div>
            </Tab>
            <Tab name="Teams">
              <div
                className={css`
                  color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
                `}
              >
                Grant teams of users access to projects
              </div>
            </Tab>
            <Tab name="API Keys" disabled={disabled}>
              <div
                className={css`
                  color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
                `}
              >
                Manage your infrastructure in code
              </div>
            </Tab>
          </Tabs>
          <ul>
            <li>
              Morbi in sem quis dui placerat ornare. Pellentesque odio nisi,
              euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras
              consequat.
            </li>
            <li>
              Praesent dapibus, neque id cursus faucibus, tortor neque egestas
              augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam
              dui mi, tincidunt quis, accumsan porttitor, facilisis luctus,
              metus.
            </li>
            <li>
              Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
              consectetuer ligula vulputate sem tristique cursus. Nam nulla
              quam, gravida non, commodo a, sodales sit amet, nisi.
            </li>
            <li>
              Pellentesque fermentum dolor. Aliquam quam lectus, facilisis
              auctor, ultrices ut, elementum vulputate, nunc.
            </li>
            <Tabs
              darkMode={darkMode}
              aria-label="Example usage of Tab component"
              setSelected={setSelected}
              selected={selected}
            >
              <Tab default name={name}>
                <div
                  className={css`
                    color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
                  `}
                >
                  testing
                </div>
              </Tab>
              <Tab name="Teams">
                <div
                  className={css`
                    color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
                  `}
                >
                  Grant teams of users access to projects
                </div>
              </Tab>
              <Tab name="API Keys" disabled={disabled}>
                <div
                  className={css`
                    color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
                  `}
                >
                  Manage your infrastructure in code
                </div>
              </Tab>
            </Tabs>
            <ul>
              <li>
                Morbi in sem quis dui placerat ornare. Pellentesque odio nisi,
                euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras
                consequat.
              </li>
              <li>
                Praesent dapibus, neque id cursus faucibus, tortor neque egestas
                augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.
                Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
                luctus, metus.
              </li>
              <li>
                Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
                consectetuer ligula vulputate sem tristique cursus. Nam nulla
                quam, gravida non, commodo a, sodales sit amet, nisi.
              </li>
              <li>
                Pellentesque fermentum dolor. Aliquam quam lectus, facilisis
                auctor, ultrices ut, elementum vulputate, nunc.
              </li>
            </ul>
            <ul>
              <li>
                Morbi in sem quis dui placerat ornare. Pellentesque odio nisi,
                euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras
                consequat.
              </li>
              <li>
                Praesent dapibus, neque id cursus faucibus, tortor neque egestas
                augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.
                Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
                luctus, metus.
              </li>
              <li>
                Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
                consectetuer ligula vulputate sem tristique cursus. Nam nulla
                quam, gravida non, commodo a, sodales sit amet, nisi.
              </li>
              <li>
                Pellentesque fermentum dolor. Aliquam quam lectus, facilisis
                auctor, ultrices ut, elementum vulputate, nunc.
              </li>
            </ul>
            <ul>
              <li>
                Morbi in sem quis dui placerat ornare. Pellentesque odio nisi,
                euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras
                consequat.
              </li>
              <li>
                Praesent dapibus, neque id cursus faucibus, tortor neque egestas
                augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.
                Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
                luctus, metus.
              </li>
              <li>
                Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
                consectetuer ligula vulputate sem tristique cursus. Nam nulla
                quam, gravida non, commodo a, sodales sit amet, nisi.
              </li>
              <li>
                Pellentesque fermentum dolor. Aliquam quam lectus, facilisis
                auctor, ultrices ut, elementum vulputate, nunc.
              </li>
            </ul>
            <ul>
              <li>
                Morbi in sem quis dui placerat ornare. Pellentesque odio nisi,
                euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras
                consequat.
              </li>
              <li>
                Praesent dapibus, neque id cursus faucibus, tortor neque egestas
                augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.
                Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
                luctus, metus.
              </li>
              <li>
                Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
                consectetuer ligula vulputate sem tristique cursus. Nam nulla
                quam, gravida non, commodo a, sodales sit amet, nisi.
              </li>
              <li>
                Pellentesque fermentum dolor. Aliquam quam lectus, facilisis
                auctor, ultrices ut, elementum vulputate, nunc.
              </li>
            </ul>
            <Tabs
              darkMode={darkMode}
              aria-label="Example usage of Tab component"
              setSelected={setSelected}
              selected={selected}
            >
              <Tab default name={name}>
                <div
                  className={css`
                    color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
                  `}
                >
                  testing
                </div>
              </Tab>
              <Tab name="Teams">
                <div
                  className={css`
                    color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
                  `}
                >
                  Grant teams of users access to projects
                </div>
              </Tab>
              <Tab name="API Keys" disabled={disabled}>
                <div
                  className={css`
                    color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
                  `}
                >
                  Manage your infrastructure in code
                </div>
              </Tab>
            </Tabs>
            <ul>
              <li>
                Morbi in sem quis dui placerat ornare. Pellentesque odio nisi,
                euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras
                consequat.
              </li>
              <li>
                Praesent dapibus, neque id cursus faucibus, tortor neque egestas
                augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.
                Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
                luctus, metus.
              </li>
              <li>
                Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
                consectetuer ligula vulputate sem tristique cursus. Nam nulla
                quam, gravida non, commodo a, sodales sit amet, nisi.
              </li>
              <li>
                Pellentesque fermentum dolor. Aliquam quam lectus, facilisis
                auctor, ultrices ut, elementum vulputate, nunc.
              </li>
            </ul>
            <ul>
              <li>
                Morbi in sem quis dui placerat ornare. Pellentesque odio nisi,
                euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras
                consequat.
              </li>
              <li>
                Praesent dapibus, neque id cursus faucibus, tortor neque egestas
                augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.
                Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
                luctus, metus.
              </li>
              <li>
                Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
                consectetuer ligula vulputate sem tristique cursus. Nam nulla
                quam, gravida non, commodo a, sodales sit amet, nisi.
              </li>
              <li>
                Pellentesque fermentum dolor. Aliquam quam lectus, facilisis
                auctor, ultrices ut, elementum vulputate, nunc.
              </li>
            </ul>
            <ul>
              <li>
                Morbi in sem quis dui placerat ornare. Pellentesque odio nisi,
                euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras
                consequat.
              </li>
              <li>
                Praesent dapibus, neque id cursus faucibus, tortor neque egestas
                augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.
                Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
                luctus, metus.
              </li>
              <li>
                Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
                consectetuer ligula vulputate sem tristique cursus. Nam nulla
                quam, gravida non, commodo a, sodales sit amet, nisi.
              </li>
              <li>
                Pellentesque fermentum dolor. Aliquam quam lectus, facilisis
                auctor, ultrices ut, elementum vulputate, nunc.
              </li>
            </ul>
          </ul>
        </div>
      )}
    </LiveExample>
  );
}
