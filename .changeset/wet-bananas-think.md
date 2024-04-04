---
'@leafygreen-ui/search-input': major
---

[LG-4152](https://jira.mongodb.org/browse/LG-4152)

#### `aria-label` prop change
`aria-label` prop can only set the `aria-label` attribute on the searchbox element if `aria-labelledby` prop is undefined
| 👎 Does not use `aria-label` prop | 👍 Does use `aria-label` prop |
| - | - |
| `<SearchInput aria-label="Label" aria-labelledby="custom-label-id" />` | `<SearchInput aria-label="Label" />` |

#### Styling changes
The following styling changes are made:
- added `xsmall` variant
- updated spacing for `default`, `small`, and `large` size variants
- updated dark mode placeholder text color

#### `onKeyDown` bug fix
Previously, if searchbox element had focus and was disabled, user could press keys which would trigger opening the menu element.

Now, if searchbox element has focus and is disabled, user can press keys, and they will not trigger any `onKeyDown` logic.
