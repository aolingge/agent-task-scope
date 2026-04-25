import fs from 'node:fs'

const secretPattern = /(github_pat_|ghp_|sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16})/g
const checks = [
  {
    "id": "scope",
    "pattern": "scope|范围|边界",
    "message": "Defines scope."
  },
  {
    "id": "acceptance",
    "pattern": "acceptance|criteria|done when|验收|完成标准",
    "message": "Defines acceptance criteria."
  },
  {
    "id": "constraints",
    "pattern": "constraint|do not|must|不要|必须|约束",
    "message": "Defines constraints."
  },
  {
    "id": "verification",
    "pattern": "verify|test|build|lint|验证|测试",
    "message": "Defines verification."
  }
]

function testPattern(text, pattern) {
  if (pattern === 'REDACTION_SPECIAL') return !secretPattern.test(text)
  return new RegExp(pattern, 'i').test(text)
}

export function redactText(text) {
  return text.replace(secretPattern, '[REDACTED_SECRET]')
}

export function checkText(text, file = '<inline>') {
  const results = checks.map((check) => {
    const ok = testPattern(text, check.pattern)
    return { status: ok ? 'PASS' : 'FAIL', check: check.id, message: ok ? check.message : `Missing signal: ${check.message}` }
  })
  const score = Math.round((results.filter((item) => item.status === 'PASS').length / results.length) * 100)
  return { file, score, results, redacted: redactText(text) }
}

export function checkFile(file) {
  return checkText(fs.readFileSync(file, 'utf8'), file)
}

export function formatText(report, title = "Agent Task Scope") {
  const lines = [`${title} score: ${report.score}/100`, `File: ${report.file}`, '']
  for (const result of report.results) lines.push(`${result.status.padEnd(5)} ${result.check.padEnd(18)} ${result.message}`)
  return lines.join('\n')
}

export function formatMarkdown(report, title = "Agent Task Scope") {
  const rows = report.results.map((result) => `| ${result.status} | ${result.check} | ${result.message} |`).join('\n')
  return `# ${title} Report

Score: **${report.score}/100**

File: \`${report.file}\`

| Status | Check | Message |
| --- | --- | --- |
${rows}
`
}

export function formatAnnotations(report) {
  return report.results.filter((result) => result.status !== 'PASS').map((result) => `::warning file=${report.file},title=${result.check}::${result.message}`).join('\n')
}

export function formatSarif(report, toolName = "agent-task-scope") {
  return {
    version: '2.1.0',
    $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
    runs: [{
      tool: { driver: { name: toolName, informationUri: `https://github.com/aolingge/${toolName}`, rules: report.results.map((result) => ({ id: result.check, name: result.check, shortDescription: { text: result.message } })) } },
      results: report.results.filter((result) => result.status !== 'PASS').map((result) => ({ ruleId: result.check, level: 'warning', message: { text: result.message }, locations: [{ physicalLocation: { artifactLocation: { uri: report.file.replaceAll('\\', '/') }, region: { startLine: 1 } } }] })),
    }],
  }
}
