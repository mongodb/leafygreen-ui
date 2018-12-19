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

## Development within an Application

- To actively develop components within an application, running the following script will link all installed leafygreen-ui components on your application to your local repository. This will allow you make changes to a local repository for UI-Kit and see those changes immediately within your running application. To do this, clone this repository and navigate to the root folder, then run

`npm run link -- ${PATH_TO_APPLICATION}`

- The script does several things in order:

  1. This builds the components so they are ready to be linked
  2. It scans your application for any installed leafygreen-ui components in your node_modules/@leafygreen-ui folder.
  3. If it finds any, it will runn npm link to link the node_modules/@leafygreen-ui component to your local repository.

- After the script completes, you can make changes directly to the component in your local leafygreen-ui repository. Once you do this, run `npm run build` in the root of the leafygreen-ui repository and the changes will be visible on your running application.

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
