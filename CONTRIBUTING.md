# Contributing

## Code Style
We use an automatic code formatter called [Prettier](https://prettier.io/). Run `npm run prettier` after making any changes to the code.


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
   a. List changes made to each component.
   b. Include details about any newly-established patterns, or architectural decisions made (if relevant).
   c. If the reason behind the changes isn’t clear, please add detail as to why it’s necessary
3. Add relevant screenshots / gifs
   a. Take screenshots of the component if a new component is added or a component style is updated.
   b. Record a gif of the component if motion is a major component of it.

### Merging
Pull requests require at least one approval after review. Once you’ve received approval, you can merge! Please use GitHub’s “Squash and Merge” option when doing so, that way we maintain a clean commit history.
