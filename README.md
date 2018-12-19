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

1. To actively develop components within an application, there is a script that will link all installed leafygreen-ui components on your application to your local repository. This will allow you make changes to a local repository for UI-Kit and see those changes immediately within your running application. To do this, clone this repository and navigate to the root folder, then run

`bash scripts/link.sh ${PATH_TO_APPLICATION}`

2.  The script does several things in order:

- This builds the components so they are ready to be linked
- It scans your application for any installed leafygreen-ui components in your node_modules/@leafygreen-ui folder.
- If it finds any, it will link the node_modules/@leafygreen-ui component to your local repository.

3.  After the script completes, you can make changes directly to the component in your local leafygreen-ui repository and run `npm run build` in the root of the leafygreen-ui repository and the changes will be visible on your running application.

- Note: after any changes you make to your local repository, you must run `npm run build` in the root of your leafygreen-ui repository for the changes to be pushed through to your application.

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
