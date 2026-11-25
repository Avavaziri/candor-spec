# Candor check

Candor check scans the code of an AI web app. It finds common problems that break the [Candor](https://avavaziri.github.io/candor-spec/) patterns, and it says how to fix each one.

It is meant for apps built quickly, often with AI coding tools: Lovable, Bolt, v0, Cursor, Claude Code and similar.

## Use it in the browser

Open <https://avavaziri.github.io/candor-spec/check> and drop in your project folder.
The scan runs in your browser. Your code is not uploaded.

## Use it in a terminal

You need Node.js 18 or later.

```sh
git clone https://github.com/Avavaziri/candor-spec.git
node candor-spec/checker/bin/candor-check.js path/to/your-app
```

| Option | What it does |
|---|---|
| `--prompt` | Prints a fix list to paste into an AI coding tool |
| `--md` | Prints a Markdown report |
| `--json` | Prints the full report as JSON, for CI |
| `--fail-on fail\|warn\|never` | Sets when the exit code is 1. The default is `fail`. |

## What it checks

| Rule | Level | Candor requirement |
|---|---|---|
| AI output is inserted as raw HTML | Must fix | INJ-1.6, INJ-1.7 |
| Markdown renderer lets raw HTML through | Must fix | INJ-1.6 |
| Images and links in AI answers load or open with no check | Worth a look | INJ-1.6, INJ-1.7 |
| Model API key is in the code or sent to the browser | Must fix | OWASP LLM02, PRV-2.1 |
| The browser sends messages straight to a model provider | Worth a look | PRV-2.1, PRV-2.3 |
| The assistant can take actions with no confirmation step | Must fix | INJ-2.1, INJ-2.2 |
| Tool calls are not shown to the user | Worth a look | INJ-4.1, INJ-4.2 |
| Answers use retrieved content but show no sources | Worth a look | CIT-1.7, INJ-1.9 |
| The system prompt never mentions not knowing | Worth a look | UNC-3.1, UNC-3.2 |
| New AI messages are not announced to screen readers | Worth a look | WCAG 2.2 SC 4.1.3 |
| Conversations are saved with no way to delete them | Worth a look | PRV-3.6, PRV-3.7 |

The report also lists checks that only a person can do in the running app.

## Limits

- The rules match code patterns. They can miss problems, and they can flag code that is safe.
- A clean scan does not mean the app conforms to Candor.
- Version 1 reads source code only. It does not open the running site.

## Add or change a rule

Rules live in `src/rules.js`. Each rule has a title, a reason, a fix and links to Candor requirements.
Add a test in `test/scan.test.js` for every rule change, then run `npm test` from the repository root.

## Licence

MIT.
