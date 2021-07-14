import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { withPerformance } from 'storybook-addon-performance';
import ComponentPreview from './decorators/ComponentPreview';
import ReactStrictMode from './decorators/ReactStrictMode';

// Add decorators globally to wrap our stories with
addDecorator(ReactStrictMode);
addDecorator(ComponentPreview);
addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(withPerformance);
