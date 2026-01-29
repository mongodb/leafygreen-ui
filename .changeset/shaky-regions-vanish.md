---
'@lg-charts/legend': patch
---

Add a "default" export at the top level of package.json to improve compatibility with Jest module resolution in consumer projects, since Jest does not handle nested "exports" mappings well.
