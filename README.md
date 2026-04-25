<p align="center">
  <img src="assets/readme-banner.svg" alt="Agent Task Scope banner" width="100%">
</p>

<h1 align="center">Agent Task Scope</h1>

<p align="center">Check task briefs for clear scope, acceptance criteria, constraints, files, and verification.</p>

<p align="center"><a href="README.zh-CN.md">中文</a> · <a href="#quick-start">Quick Start</a> · <a href="#checks">Checks</a></p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/node-%3E%3D18-2563EB">
  <img alt="dependencies" src="https://img.shields.io/badge/dependencies-0-111827">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-16A34A">
</p>

<p align="center">
  <img src="assets/cli-preview.svg" alt="Agent Task Scope CLI preview" width="88%">
</p>

## Why This Exists

AI agent workflows keep growing, but many repos still lack tiny local checks that are easy to run in CI. This tool stays zero-dependency, mirror-friendly, and easy to fork.

## Quick Start

```bash
npx github:aolingge/agent-task-scope --path task.md
```

Generate Markdown:

```bash
npx github:aolingge/agent-task-scope --path task.md --markdown > report.md
```

Generate SARIF:

```bash
npx github:aolingge/agent-task-scope --path task.md --sarif > results.sarif
```

## Checks

| Check | What it looks for |
| --- | --- |
| scope | Defines scope. |
| acceptance | Defines acceptance criteria. |
| constraints | Defines constraints. |
| verification | Defines verification. |


## Quality Gate

Use this project as a repeatable gate before an AI agent marks work as done:

- [Quality gate guide](docs/quality-gates.md)
- [Copy-ready GitHub Actions example](examples/github-action.yml)

## CI Usage

See [docs/github-actions.md](docs/github-actions.md).

## Mirrors

- GitHub: https://github.com/aolingge/agent-task-scope
- Gitee: https://gitee.com/aolingge/agent-task-scope

## Visual Identity

The banner and CLI preview are SVG assets committed in `assets/`, so the README renders cleanly on GitHub and Gitee without external image hosting.

## Contributing

Good first PRs: add checks, add fixtures, improve docs, or add GitHub Actions examples.

## License

MIT
