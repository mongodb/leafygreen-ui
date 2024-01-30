---
'@lg-tools/storybook-decorators': patch
'@leafygreen-ui/search-input': patch
'@leafygreen-ui/date-picker': patch
'@leafygreen-ui/testing-lib': patch
'@leafygreen-ui/date-utils': patch
'@leafygreen-ui/pagination': patch
'@lg-tools/storybook': patch
'@leafygreen-ui/hooks': patch
'@leafygreen-ui/table': patch
'@leafygreen-ui/toast': patch
'@lg-tools/slackbot': patch
'@lg-tools/validate': patch
'@leafygreen-ui/lib': patch
'@lg-tools/create': patch
'@lg-tools/build': patch
---

Fixes `lodash` imports to use default exports of specific functions to reduce component's bundle size.
