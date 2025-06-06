---
'@lg-charts/core': patch
---

Updates axis `formatter` prop signature to match echarts.
```ts
{
  formatter?: (value: number, index?: number) => string | string;
}
```
