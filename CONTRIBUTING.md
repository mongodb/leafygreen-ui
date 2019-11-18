# Contributing

## Can I Contribute?

We appreciate contributions of all kinds -- whether that is a bug fix, or a new component.

Before making a PR with a brand new component, hook or feature, it may be helpful to consider whether it solves the following:

- Can the feature be used across multiple MongoDB Products?
- Is it abstracting logic that many developers or components could utilize?
- Have you considered how to make this as generalizable as possible?

## Roadmap

If you're interested in contributing, and want to know what projects we have on deck, check out our roadmap [here](https://wiki.corp.mongodb.com/display/DESIGN/Design+Systems).

## Getting Started

### Typescript

LeafyGreen uses Typescript, to help make consumption of this library as intuitive and error-free as possible. If you're new to Typescript, these resources may be able to help you get started:

1. [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)
2. [Typescript Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)

### Emotion

For styling, we use the CSS-in-JS library, Emotion. To get started with Emotion check out their documentation [here](https://emotion.sh/docs/introduction).

We've created a wrapper around the Emotion library, which can be brought into new components as such:

`import {css, cx} from @leafygreen-ui/emotion`

### React Design Patterns

As far as design patterns leveraged by our components we tend to favor:

- Functional components over class-based components
- Creating abstractable hooks where possible, that can be used across multiple components

## Code Style

### Prettier

We use an automatic code formatter called [Prettier](https://prettier.io/). Run `yarn prettier` after making any changes to the code.

## Branch Organization

### Feature Branches

Name feature branches according to the following schema:
[Jira Ticket ID]-[Descriptive name for the content of the branch]

**Example:** `PD-123-Button-newProp`

## Semantic Versioning

We strictly follow [semantic versioning](https://semver.org/) to ensure that consumers of the library don’t hit unexpected snags when updating their app to the latest version. If you don’t already understand “semver”, please read the link above before making a pull request.

## Pull Requests

### Title

Start the title with the ID of the Jira ticket followed by a colon (e.g. `PD-200:`). Following that, be sure to choose a title that accurately encompasses the contents of the pull request. Usually, this can simply be the name of the ticket the PR is in reference to.

**Example:** `PD-123: Add ‘newProp’ to the Button component`

### Labels

Pull requests should be labeled with the components modified, and whether it contains a “Major Version” change, “Minor Version” change, or a “Patch”.

Major versions will be given the most scrutiny as they will potentially break a consumer’s app, followed by minor, then patch versions.

### Content

1. At the very top, link directly to the relevant Jira ticket.
2. List the changes
   - List changes made to each component.
   - Include details about any newly-established patterns, or architectural decisions made (if relevant).
   - If the reason behind the changes isn’t clear, please add detail as to why it’s necessary
3. Add relevant screenshots / gifs
   - Take screenshots of the component if a new component is added or a component style is updated.
   - Record a gif of the component if motion is a major component of it.

### Merging

Pull requests require at least one approval after review. Once you’ve received approval, you can merge! Please use GitHub’s “Squash and Merge” option when doing so, that way we maintain a clean commit history.
