# v10 to v11

v11 introduces a large set of new features including virtualized scrolling and sticky header rows. For a functional overview, refer to the [project brief](https://docs.google.com/document/u/1/d/1AaZfYAGi9MCxU-cutWovDwTl_4jViUP34QwMFiWMSxU/edit).

## Overview

The largest change is that the usage API has changed to a set of UI components that wrap HTML Table elements (e.g. `<thead>` equates to the `<TableHead>` component). This should improve the DX of creating basic tables.

For more complex functionalities, v11 exports the `useLeafygreenTable` hook which leverages the [react-table](https://tanstack.com/table/v8) and [react-virtual]() libraries. As of v11.0.0, the hook supports:

- virtualized scrolling
- nested rows
- expanded content
- sortable rows
- selectable rows

Other functionalities offered by [react-table](https://tanstack.com/table/v8) could also leveraged by users of v11 (e.g. editable cells), but it is discouraged as there are no standardized designs for functionalities not mentioned in the [project brief](https://docs.google.com/document/u/1/d/1AaZfYAGi9MCxU-cutWovDwTl_4jViUP34QwMFiWMSxU/edit).

### Other changes

- **Zebra striping behavior is no longer applied by default for data sets over 10 rows.** Use the `shouldAlternateRowColor` prop on the `Table` component to achieve the same effect. Note that we discourage the usage of zebra stripes in conjunction with nested rows or expandable content.

- **Disabled cells are no longer supported.** We found in our design audit that this prop was not being used. We recommend applying styles that match our disabled rows if you would like to disable specific cells.

- **Multi-row headers are no longer supported.** We found in our design audit that this prop was not being used. Reach out to the Design Systems team if this prop is crucial to your team's needs.
