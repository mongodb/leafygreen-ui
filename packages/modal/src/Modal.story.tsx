import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import Modal, { ModalSize } from '.';
import { Select, Option, OptionGroup } from '@leafygreen-ui/select';
import { Subtitle, Body } from '@leafygreen-ui/typography';
import { palette } from '@leafygreen-ui/palette';

const scroll = css`
  height: 200vh;
`;

const buttonPadding = css`
  margin-top: 4px;
`;

const titleMargin = css`
  margin-bottom: 4px;
`;

const darkModeColor = css`
  color: ${palette.white};
`;

function Default() {
  const [open, setOpen] = useState(false);
  const darkMode = boolean('darkMode', false);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open Modal</Button>
      <Modal
        open={open}
        setOpen={setOpen}
        size={select('size', Object.values(ModalSize), ModalSize.Default)}
        darkMode={darkMode}
      >
        <Subtitle
          className={cx(titleMargin, {
            [darkModeColor]: darkMode,
          })}
        >
          Base modal
        </Subtitle>
        <Body
          className={cx({
            [darkModeColor]: darkMode,
          })}
        >
          Modal Content goes here.
        </Body>
      </Modal>
    </>
  );
}

function Scroll() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open Modal</Button>
      <Modal
        open={open}
        setOpen={setOpen}
        size={select('size', Object.values(ModalSize), ModalSize.Default)}
      >
        <div className={scroll}>Modal Content goes here.</div>
      </Modal>
    </>
  );
}

function Interactive() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open Modal</Button>
      <Modal
        open={open}
        setOpen={setOpen}
        size={select('size', Object.values(ModalSize), ModalSize.Default)}
      >
        <div>
          <div>Modal Content goes here.</div>
          <Button className={buttonPadding}>
            Click me, I will not close the modal!
          </Button>
        </div>
      </Modal>
    </>
  );
}

function DefaultSelect() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('cat');
  const [valueB, setValueB] = useState('smallCat');

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open Modal</Button>
      <Modal
        open={open}
        setOpen={setOpen}
        size={select('size', Object.values(ModalSize), ModalSize.Default)}
        darkMode={boolean('darkMode', false)}
      >
        <div>Modal Content goes here.</div>

        <div>
          <Select
            label="label"
            size="small"
            placeholder="lala"
            name="pets"
            value={value}
            onChange={setValue}
            usePortal={true}
          >
            <OptionGroup label="Common">
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
            </OptionGroup>
          </Select>
        </div>

        <div>
          <Select
            label="label2"
            size="small"
            placeholder="second one"
            name="cats"
            value={valueB}
            onChange={setValueB}
            usePortal={true}
          >
            <OptionGroup label="Common">
              <Option value="smallCat">smallCat</Option>
              <Option value="largeCat">largeCat</Option>
              <Option value="mediumCat">mediumCat</Option>
            </OptionGroup>
          </Select>
        </div>
      </Modal>
    </>
  );
}

storiesOf('Packages/Modal', module)
  .add('Default', () => <Default />)
  .add('DefaultSelect', () => <DefaultSelect />)
  .add('Scroll', () => <Scroll />)
  .add('Interactive', () => <Interactive />);
