---
'@leafygreen-ui/confirmation-modal': major
'@leafygreen-ui/gallery-indicator': major
'@leafygreen-ui/password-input': major
'@leafygreen-ui/split-button': major
'@leafygreen-ui/form-footer': major
'@leafygreen-ui/form-field': major
'@leafygreen-ui/text-input': major
'@leafygreen-ui/typography': major
'@leafygreen-ui/text-area': major
'@leafygreen-ui/checkbox': major
'@leafygreen-ui/select': major
'@leafygreen-ui/toggle': major
'@leafygreen-ui/table': major
'@leafygreen-ui/menu': major
'@leafygreen-ui/tabs': major
---

Updates `data-lgid` and `data-testid` to use scope based test IDs. These test IDs are generated using the helper utility `getLgIds`. For more information [check out the section in the styleguide about getLgIds](https://github.com/mongodb/leafygreen-ui/blob/main/STYLEGUIDE.md#getlgids).

Removes public exports for:
- `LGIDs`
- `LGIDS_CHECKBOX`
- `LGIDS_FORM_FIELD`
- `LGIDS_SELECT`
- `LGIDS_TYPOGRAPHY`