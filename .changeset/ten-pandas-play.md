---
'@leafygreen-ui/combobox': minor
---

Combobox `onChange` callback now receives a 2nd argument. Use this argument to determine what value was inserted or deleted from a multiselect value.
[JIRA Ticket](https://jira.mongodb.org/browse/LG-3959)

Example:
```tsx
<Combobox 
  multiselect
  value={['apple', 'banana']}
  onChange={(val, diff) => {
    console.log(value) // ['apple']
    console.log(diff); // { diffType: 'delete', value: 'banana' }
  }} 
/>
```

```ts
interface DiffObject {
  diffType: 'insert' | 'delete';
  value: string | Array<string>;
}
```