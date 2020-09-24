import facepaint from 'facepaint';

export const breakpoints = {
  small: 768,
  medium: 1024,
  large: 1200,
} as const;

export const mq = facepaint([
  `@media only screen and (max-width: ${breakpoints.small}px)`,
  `@media only screen and (min-width: ${
    breakpoints.small + 1
  }px) and (max-width: ${breakpoints.medium}px)`,
  `@media only screen and (min-width: ${breakpoints.medium + 1}px)`,
]);
