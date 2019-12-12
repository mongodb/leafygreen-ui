# Org Select

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/org-select.svg)

## Example

<!-- Will update when component is finalized -->

**Output HTML**

<!-- Will update when component is finalized -->

## Properties

| Prop       | Type                                             | Description                                                                       | Default                                          |
| ---------- | ------------------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------ |
| `onClick`  | `React.MouseEventHandler`                        | Callback executed when an Organization is selected                                |                                                  |
| `selected` | _Required_ `string`                              | Organization that is currently selected; will appear in Top Navigation by default |                                                  |
| `data`     | _Required_ [{name: `string`, product: `string`}] | Array of organizations that belong to a user                                      |                                                  |
| `variant`  | _Required_ `organization`                        | `project`                                                                         | Determines what select dropdown will be rendered |  |
