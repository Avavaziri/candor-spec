# Governance

This document says who decides what goes into Candor, and how.

## Roles

**Editor.** The editor keeps the specification consistent. The editor merges pull requests, calls consensus, cuts releases and enforces the Code of Conduct.
The current editor is [@Avavaziri](https://github.com/Avavaziri).

**Contributors.** Anyone who opens an issue, reviews a change or sends a pull request.

**Regular contributors.** A contributor with three or more merged substantive changes, or sustained review work, in the last 12 months. The editor keeps a list in this file.

## How decisions are made

Candor uses **lazy consensus**.

1. A person opens an issue or a pull request with the proposed change.
2. The editor labels it `editorial`, `substantive` or `new-pattern`.
3. Other people comment. Objections must give a reason and, if possible, an alternative.
4. If no one keeps a reasoned objection for the review period, the change has consensus. The editor merges it.

| Label | Review period |
|---|---|
| `editorial` | None. The editor can merge at once. |
| `substantive` | 7 days |
| `new-pattern` | 14 days |

If people still disagree after discussion, the editor decides and writes the reason in the issue.
Anyone can appeal a decision. Open a new issue with the label `appeal` within 14 days.
Until a steering group exists, the editor answers appeals in writing.

## Versions and maturity

- Version numbers use `major.minor`. Versions before 1.0 can break anything.
- Each version moves through **Editor's Draft**, **Candidate** and **Stable**. The [introduction](docs/spec/introduction.md#status-of-this-document) defines these levels.
- A move to Candidate needs a 14-day public review.
- A move to Stable needs evidence that at least two independent interfaces meet each MUST requirement.
- Requirement IDs are permanent. A removed requirement keeps its ID and is marked "Withdrawn".

## Steering group

When Candor has three or more regular contributors from at least two organisations, the editor will propose a steering group.
The proposal will be a pull request to this file.
It will say how members are chosen, how the group votes and how editors are appointed.

## Contact

<!-- TODO before first publish: the editor adds a contact address for conduct reports. -->
For Code of Conduct reports, contact the editor at: **address to be added before publication**.
For other matters, open an issue.

## Changes to this document

Changes to governance are `substantive` changes. They need 14 days of review.
