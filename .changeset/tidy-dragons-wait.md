---
'@lg-tools/link': minor
'@lg-tools/cli': minor
---

developer experience slightly improves by adding more detailed logging to spawn processes in the link script. Previously, running link script would lead to a group of processes being spawned in parallel all piping their stdout and stderr to the console in verbose mode which made it difficult to distinguish what each line of output was from which process. The command and working directory are also now logged for each process along with their exit code.
