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
'@leafygreen-ui/code': major
'@leafygreen-ui/menu': major
'@leafygreen-ui/tabs': major
---

Updates `data-lgid` to use scope based test ids. These test ids are generated uisng the helper function `getLgIds`. For more information [check out the section in the styleguide about getLgIds](https://github.com/mongodb/leafygreen-ui/blob/d55ae3319908bf68460d15520c499f0092355ca6/STYLEGUIDE.md#getlgids).

Removes public exports for:
- `LGIDs`
- `LGIDS_CHECKBOX`
- `LGIDS_FORM_FIELD`
- `LGIDS_SELECT`
- `LGIDS_TYPOGRAPHY`