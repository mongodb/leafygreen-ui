# leafyGreen UI Kit

A set of CSS styles and React components built with design in mind.

## Developer Setup

1. Node >= 6.11.5 required.

    via [homebrew](https://brew.sh/) with `brew install node`

    via [nodejs installer](https://nodejs.org/en/)

1. npm >= 5.1 installed.

1. Install dependencies and link packages.

    `npm install && npm run bootstrap`


## Development

1. Start up storybook to see all UI components that exist.

    `npm run storybook`

## Testing

- Run all tests. This includes linting and running tests.

  - `npm run test`


## Publishing

1. Build the compiled version of every UI package. This creates the dist/ folder with the transpiled code ready for distribution.

    `npm run build`

2. TODO: Create changelog and update version.
NOTE(hswolff): Not fully implemented yet. Just does an NPM publish for now, no auto changelog creation.

    `npm run release`


## Cleaning

To clean generated assets run.

    `npm run clean`
