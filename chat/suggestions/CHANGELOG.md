# @lg-chat/suggestions

## 0.2.1

### Patch Changes

- 707923d: Hide "Apply configuration to your cluster?" title when component state is unset

## 0.2.0

### Minor Changes

- f75e629: [LG-5432](https://jira.mongodb.org/browse/LG-5432): add `'apply'` state value to conditionally render apply button. `'unset'` state will now no longer render the apply button. Also enables HTMLDivElement props to spread to the root container node and removes the fixed width. Styles can be further customized using `className` prop.
