import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import RadioGroup from '.';
import RadioButton from '../../RadioButton/src/index';

storiesOf('RadioGroup', module)
    .add('Default', () => (
        <section className="storybook-container">
            <RadioGroup>
                <RadioButton value="option-1">Option One</RadioButton>
                <RadioButton value="option-2">
                    {text('Label text', 'Option Two')}
                </RadioButton>
                <RadioButton value="option-3">Option Three</RadioButton>
                <RadioButton disabled={boolean('Disabled', true)} value="option-4">
                    Disabled Option
                </RadioButton>
            </RadioGroup>
        </section>
    ))
    .add('Light', () => (
        <section className="storybook-container">
            <RadioGroup variant="light" className={emotion.css`
                background-color: ${colors.gray[1]}
            `}>
                <RadioButton value="option-1">Option One</RadioButton>
                <RadioButton value="option-2">
                        {text('Label text', 'Option Two')}
                </RadioButton>
                <RadioButton value="option-3">Option Three</RadioButton>
                <RadioButton disabled={boolean('Disabled', true)} value="option-4">
                        Disabled Option
                </RadioButton>
            </RadioGroup>
        </section>
    ));