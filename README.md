# Candor: check your AI app

Candor checks the AI features of a web app, often one built fast with AI coding tools.
Drop in your project and Candor lists the problems it finds, with the file, the line, why it matters and how to fix it.
It looks for four kinds of problem:

1. **Hidden instructions.** Tools that run without asking, and AI output inserted as raw HTML.
2. **Data leaks.** API keys in browser code, and messages sent to a model provider with no notice.
3. **Missing sources.** Answers built from documents that show no sources.
4. **False confidence.** Prompts that never let the model say "I don't know".

Every finding links to a rule in the Candor rulebook: 16 patterns with testable MUST / SHOULD / MAY requirements.

**Status: version 0.1, early draft.** Rules and results can change.

## Check your app

- In the browser: <https://avavaziri.github.io/candor-spec/check>. Your code is not uploaded.
- In a terminal: `node checker/bin/candor-check.js path/to/your-app`. See [checker/README.md](checker/README.md).

## Read the rulebook

- Online (after the first publish): <https://avavaziri.github.io/candor-spec/>
- In this repository: start at [docs/spec/introduction.md](docs/spec/introduction.md), then [docs/patterns/](docs/patterns/).

## Run the site on your computer

You need [Node.js](https://nodejs.org/) 20 or later and Git.

1. Clone the repository:

   ```sh
   git clone https://github.com/Avavaziri/candor-spec.git
   cd candor-spec
   ```

2. Install the dependencies (about 100 MB):

   ```sh
   npm ci
   ```

3. Start the preview server:

   ```sh
   npm run dev
   ```

4. Open <http://localhost:5173/candor-spec/> in a browser. The page reloads when you save a file.

Other commands:

| Command | What it does |
|---|---|
| `npm run check` | Checks that every pattern follows the template. CI runs it too. |
| `npm test` | Runs the Candor check tests. |
| `npm run checklist` | Rebuilds `docs/checklist.md` from the pattern pages. |
| `npm run build` | Runs the check, then builds the static site into `docs/.vitepress/dist`. |
| `npm run preview` | Serves the built site, to test it before you publish. |

## Repository layout

| Path | Contents |
|---|---|
| `docs/spec/` | Introduction, conformance rules, terminology and the pattern template. |
| `docs/patterns/<area>/` | One Markdown file for each pattern. |
| `docs/public/demos/` | Self-contained HTML demos. They use plain HTML, CSS and JavaScript. |
| `docs/checklist.md` | The full conformance checklist. A script generates it. Do not edit it by hand. |
| `docs/.vitepress/` | Site configuration and theme. |
| `scripts/spec.mjs` | The template check and the checklist generator. |
| `checker/` | Candor check: the scan rules, the command line tool and its tests. |

## Publish to GitHub Pages

The workflow in `.github/workflows/pages.yml` builds and publishes the site on every push to `main`.
You must turn on GitHub Pages once, in the web interface:

1. Push the repository to GitHub.
2. On GitHub, open the repository. Go to **Settings**, then **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push a commit to `main`, or run the workflow by hand from the **Actions** tab.
5. When the workflow finishes, the site is at `https://<owner>.github.io/candor-spec/`.

If you fork the repository under another name, change `base` in `docs/.vitepress/config.mts` to `/<your-repo-name>/`.
GitHub Pages is free for public repositories.

## Contribute

Read [CONTRIBUTING.md](CONTRIBUTING.md).
Decisions follow [GOVERNANCE.md](GOVERNANCE.md).
Everyone follows the [Code of Conduct](CODE_OF_CONDUCT.md).

## Licence

- Specification text: [Creative Commons Attribution 4.0 International](LICENSE) (CC BY 4.0).
- Demo code, scripts and site code: [MIT](LICENSE-CODE).

You can reuse the text if you give credit, for example: "Based on Candor 0.1, https://github.com/Avavaziri/candor-spec, CC BY 4.0."
