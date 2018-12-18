# leafyGreen UI Kit

A set of CSS styles and React components built with design in mind.

## Developer Setup

1. Node >= 6.11.5 required.

   via [homebrew](https://brew.sh/) with `brew install node`

   via [nodejs installer](https://nodejs.org/en/)

1. npm >= 6 installed.

1. Install dependencies and link packages.

   `npm install && npm run bootstrap`

## Development

1. Start up storybook to see all UI components that exist.

   `npm start`

2. To actively develop components, there is a script that will link all installed leafygreen-ui components on your application to your local repository. To do so, clone this repository and navigate to the root folder, then run

`bash scripts/link.sh ${PATH_TO_APPLICATION}`

3. This will build the components so they are ready for any changes then scan your application for any installed leafygreen-ui components in your node_modules/@leafygreen-ui folder. If it finds any, it will link the node_modules/@leafygreen-ui component to your local repository. It is important to note that after ay changes you make to your local repository, you must run `npm run build` in the root of your leafygreen-ui repository for the changes to be pushed through to your application.

## Testing

- Run all tests. This includes linting and running tests.

  - `npm run test`

## Publishing

1.  Build the compiled version of every UI package. This creates the dist/ folder with the transpiled code ready for distribution.

    `npm run build`

2.  TODO: Create changelog and update version.
    NOTE(hswolff): Not fully implemented yet. Just does an NPM publish for now, no auto changelog creation.

        `npm run release`

## Cleaning

To clean generated assets run.

    `npm run clean`
