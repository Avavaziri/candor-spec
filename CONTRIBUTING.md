# Contributing to Candor

Thank you for your help. Candor improves when people who build and use AI interfaces test it against real products.

## Ways to help

- **Report a problem.** A requirement is unclear, untestable, wrong or harmful. Open an issue with the "Erratum" form.
- **Share evidence.** You tested a pattern with users, or you shipped it. Tell us what happened.
- **Propose a pattern.** Open an issue with the "Pattern proposal" form first. Do not start with a pull request.
- **Improve the text.** Fix a typo, a broken link or an unclear sentence. Send a pull request.
- **Build a demo.** Many patterns have no demo yet. Each one has an issue.

## Kinds of change

| Kind | Examples | Process |
|---|---|---|
| Editorial | Typos, links, clearer wording with the same meaning | Pull request. The editor can merge at once. |
| Substantive | Add, remove or change a requirement. Change a BCP 14 keyword. | Issue first, then pull request. Lazy consensus for 7 days. |
| New pattern | A new pattern ID | Proposal issue, then pull request. Lazy consensus for 14 days. |

[GOVERNANCE.md](GOVERNANCE.md) defines lazy consensus.

## Write a pattern change

1. Read the [pattern template](docs/spec/template.md).
2. Keep each requirement to one rule.
3. Write requirements that a reviewer can test.
4. Use MUST, SHOULD and MAY only in the Requirements section.
5. Add a checklist item for every MUST requirement.
6. Never reuse or renumber an ID that a released version used. Mark a removed requirement "Withdrawn" instead.
7. Cite only sources that you have read. Give a link. Keep each quote under 15 words.

## Write in plain English

- Use short sentences. One idea in each sentence.
- Use active voice.
- Use everyday words. Write "use", not "utilise".
- Requirements and checklists follow ASD-STE100 Simplified Technical English rules where they help.

## Run the checks

```sh
npm ci
npm run check
npm run build
```

The check fails if a pattern page breaks the template.
CI runs the same commands on every pull request.

## Demos

- A demo is one HTML file in `docs/public/demos/`.
- Use the shared `demo.css` and `demo.js`. Put extra styles in the page.
- Use no frameworks, no build step and no external requests.
- Use made-up data. Use `example.com` and `example.net` for addresses. Say on the page that the data is made up.
- Test with the keyboard only. Test at 400 pixels wide. Test in light and dark themes.

## Licence of contributions

Contributions use the same licence as the rest of the repository ("inbound equals outbound"):

- text under CC BY 4.0;
- code under MIT.

By sending a pull request, you confirm that you have the right to give your contribution under these licences.

## Conduct

Everyone follows the [Code of Conduct](CODE_OF_CONDUCT.md).
