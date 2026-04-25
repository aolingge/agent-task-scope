# GitHub Actions

```yaml
name: agent-task-scope

on:
  pull_request:
  push:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npx github:aolingge/agent-task-scope --path fixtures/good.txt --min-score 80 --annotations
```
