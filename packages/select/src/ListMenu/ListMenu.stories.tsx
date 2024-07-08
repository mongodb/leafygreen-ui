/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name, react/jsx-key */
import React, { useEffect, useState } from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { InternalOption } from '../Option';
import { SelectContext } from '../SelectContext';

import ListMenu from './ListMenu';

const meta: StoryMetaType<typeof ListMenu> = {
  title: 'Components/Select/ListMenu',
  component: ListMenu,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
      },
      decorator: (Instance, context) => {
        const [open, setOpen] = useState(false);
        useEffect(() => {
          setOpen(true);
        }, []);
        const divRef = React.useRef<HTMLDivElement>(null);
        return (
          <LeafyGreenProvider darkMode={context?.args.darkMode}>
            <SelectContext.Provider
              value={{ open: open, size: 'default', disabled: false }}
            >
              <div
                ref={divRef}
                className={css`
                  height: 0;
                  color: transparent;

                  td:has(&) {
                    vertical-align: top;
                  }
                `}
              >
                SearchInput Placeholder
              </div>
              <Instance referenceElement={divRef}>
                {/* @ts-expect-error missing props*/}
                <InternalOption>Cat</InternalOption>
              </Instance>
            </SelectContext.Provider>
          </LeafyGreenProvider>
        );
      },
    },
  },
};

export default meta;

export const Generated: StoryType<typeof ListMenu> = () => <></>;
Generated.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
