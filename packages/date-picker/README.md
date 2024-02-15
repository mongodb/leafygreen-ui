# Date Picker

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/date-picker.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/date-picker/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/date-picker
```

### NPM

```shell
npm install @leafygreen-ui/date-picker
```

## Example

```js
import { DatePicker } from '@leafygreen-ui/date-picker';

const [date, setDate] = useState<Date>();

<DatePicker
  label="Pick a date"
  value={date}
  max={new Date("2026-12-26")}
  onDateChange={setDate}
  locale="iso8601"
  timeZone="utc"
/>;
```

## Properties

| Prop               | Type                                                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Default   |
| ------------------ | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `label`            | `ReactNode`                                         | Label shown above the date picker.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |           |
| `description`      | `ReactNode`                                         | A description for the date picker. It's recommended to set a meaningful time zone representation as the description. (e.g. "Coordinated Universal Time")                                                                                                                                                                                                                                                                                                                                                                    |           |
| `locale`           | `'iso8601'`\| `'string'`                            | Sets the _presentation format_ for the displayed date, and localizes month & weekday labels. Defaults to the user’s browser preference (if available), otherwise ISO-8601.                                                                                                                                                                                                                                                                                                                                                  | `iso8601` |
| `timeZone`         | `string`                                            | A valid IANA timezone string, or UTC offset, used to calculate initial values. Defaults to the user’s browser settings.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `min`              | `Date`                                              | The earliest date accepted, in UTC                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |           |
| `max`              | `Date`                                              | The latest date accepted, in UTC                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |           |
| `value`            | `'Date'` \| `'InvalidDate'` \| `'null'`             | The selected date. Note that this Date object will be read as UTC time. Providing `Date.now()` could result in the incorrect date being displayed, depending on the system time zone. <br><br> To set `value` to today, regardless of timeZone, use `setToUTCMidnight(new Date(Date.now()))`. <br><br> e.g. `2023-12-31` at 20:00 in Los Angeles, will be `2024-01-01` at 04:00 in UTC. To set the correct day (`2023-12-31`) as the DatePicker value we must first convert our local timestamp to `2023-12-31` at midnight |           |
| `onDateChange`     | `(value?: Date \| InvalidDate \| null) => void`     | Callback fired when the user makes a value change. Fired on click of a new date in the menu, or on keydown if the input contains a valid date. <br><br> _Not_ fired when a date segment changes, but does not create a full date <br><br> Callback date argument will be a Date object in UTC time, or `null`                                                                                                                                                                                                               |           |
| `initialValue`     | `'Date'` \| `'InvalidDate'` \| `'null'`             | The initial selected date. Ignored if `value` is provided <br><br> Note that this Date object will be read as UTC time. See `value` prop documentation for more details                                                                                                                                                                                                                                                                                                                                                     |           |
| `handleValidation` | `(value?: Date \| InvalidDate \| null) => void`     | A callback fired when validation should run, based on [form validation guidelines](https://www.mongodb.design/foundation/forms/#form-validation-error-handling). Use this callback to compute the correct `state` and `errorMessage` value.<br> <br> Callback date argument will be a Date object in UTC time, or `null`                                                                                                                                                                                                    |           |
| `onChange`         | `(event: ChangeEvent<HTMLInputElement>) => void`    | Callback fired when any segment changes, (but not necessarily a full value)                                                                                                                                                                                                                                                                                                                                                                                                                                                 |           |
| `baseFontSize`     | `'13'` \| `'16'`                                    | The base font size of the input. Inherits from the nearest LeafyGreenProvider                                                                                                                                                                                                                                                                                                                                                                                                                                               |           |
| `disabled`         | `boolean`                                           | Whether the input is disabled. _Note_: will not set the `disabled` attribute on an input and the calendar menu will not open if disabled is set to true.                                                                                                                                                                                                                                                                                                                                                                    | `false`   |
| `size`             | `'small'` \| `'xsmall'` \| `'default'` \| `'large'` | Whether the input is disabled. Note: will not set the `disabled` attribute on an input and the calendar menu will not open if disabled is set to true.                                                                                                                                                                                                                                                                                                                                                                      | `default` |
| `state`            | `'none'` \| `'error'`                               | Whether to show an error message                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `none`    |
| `errorMessage`     | `string`                                            | A message to show in red underneath the input when state is `Error`                                                                                                                                                                                                                                                                                                                                                                                                                                                         |           |
| `initialOpen`      | `boolean`                                           | Whether the calendar menu is initially open. _Note_: The calendar menu will not open if disabled is set to `true`.                                                                                                                                                                                                                                                                                                                                                                                                          | `false`   |
| `autoComplete`     | `'off'` \| `'on'` \| `'bday'`                       | Whether the input should autofill                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `off`     |
| `darkMode`         | `boolean`                                           | Render the component in dark mode.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `false`   |

## Popover Props

Date Picker extends [Popover props](https://www.mongodb.design/component/popover/documentation/) but omits the following props: `usePortal`, `refEl`, `children`, `className`, `onClick`, and `active`.

## 🔎 Glossary

### Date format

The pattern in which a string stores date (& time) information. E.g. `“YYYY-DD-MM”`, `“MM/DD/YYYY”`, `“YYYY-MM-DDTHH:mm:ss.sssZ”`

### Wire format (or Data format)

The format of the date string passed into the component. This will typically be [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html), but could be any format accepted by the [Date constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date).

### Presentation format

The format in which the date is presented to the user. By default, the HTML date input element presents this in the format of the user’s Locale (as defined in browser or OS settings).

### Locale

Language, script, & region information. Can also include [other data](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale).

### Time Zone

A string representing a user’s local time zone (e.g. “America/New_York”) or UTC offset. Valid time zones are defined by IANA, and [listed on Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List). A UTC offset can be [provided in a DateTime string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format).

### UTC offset

The offset of a time zone vs UTC. E.g. The UTC offset for `“America/New_York”` is -5:00, (or -4:00 depending on daylight savings).

### Wire time zone (or Data time zone)

The time zone information contained in the date string/object passed into the component.

### Presentation time zone

The time zone relative to which we present date information to the user. Can result in a different day than the wire time zone. E.g. `“2023-08-08T00:00:00Z”` (Aug. 8/2023 at midnight UTC) => `“2023-08-07T20:00:00-04:00”` (Aug. 7 at 8pm EDT)

## Special Case

### Aria Labels

Either `label` or `aria-labelledby` or `aria-label` must be provided, or there will be a console error. This is to ensure that screenreaders have a description for what the DatePicker does.
