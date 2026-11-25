---
status: Editor's Draft
---

# Introduction

## Abstract

Candor is an open specification of interaction patterns for AI interfaces.
It covers four areas where users need the truth about the system in front of them:

1. **Uncertainty.** The interface says how sure it is, and says when it does not know.
2. **Injection warnings.** The interface shows which content came from outside, and it stops that content from acting for the user.
3. **Privacy boundaries.** The interface shows what the AI can see, what leaves the device or tenant, and how long data stays.
4. **Verifiable citing.** The interface links each claim to its source, so the user can check it.

Each pattern states requirements in testable, normative language.
Each pattern also gives accessibility rules, anti-patterns and a conformance checklist.

## Status of this document

This is an **Editor's Draft** of Candor version 0.1.
It is not stable. Any part can change without notice.
Do not claim conformance to an Editor's Draft in a contract or a procurement.

The maturity levels are:

| Level | Meaning |
|---|---|
| Editor's Draft | Work in progress. The editor publishes it to get feedback. |
| Candidate | Feature-complete for a version. Implementers test it. Only fixes go in. |
| Stable | Released and versioned. Changes need a new version number. |

Send feedback as a [GitHub issue](https://github.com/Avavaziri/candor-spec/issues).
The [governance document](https://github.com/Avavaziri/candor-spec/blob/main/GOVERNANCE.md) says how decisions are made.

## Scope

Candor applies to any user interface where a person reads output from an AI system, or lets an AI system act for them.
Examples are chat assistants, copilots inside other products, search answers and agents that use tools.

Candor covers what the interface shows and how it behaves.
It does not cover:

- how to train or evaluate a model;
- how to detect prompt injection or measure confidence (Candor only says how to show the result);
- legal compliance. Some patterns help with legal duties, but conformance to Candor is not legal advice.

## Audience

- **Designers** use the anatomy, wording and anti-pattern sections.
- **Engineers** use the requirements and the demos.
- **Accessibility and security reviewers** use the conformance checklist.
- **Product owners** use the conformance claim to state what their product does.

## Principles

Four principles shape every pattern.

1. **Show the boundary.** The user can always see what is AI output, what is external content and what is their own data.
2. **Say what you do not know.** A visible doubt is better than a confident error.
3. **The user decides.** External content can inform the AI. It cannot give orders.
4. **Make claims checkable.** A claim links to its evidence, or the interface marks it as unsupported.

## How to read a pattern

Every pattern uses the same [template](./template).
Read the **Summary** and **Problem** first.
Then read the **Requirements**. Each requirement has an ID, such as `UNC-1.2`.
Use that ID when you report an issue or make a conformance claim.

The words MUST, SHOULD and MAY have special meanings.
The [conformance section](./conformance#normative-language) defines them.

## Relationship to other work

Candor builds on published guidance.
It does not replace it.
The [references page](../references) lists every source with a link.
Each pattern names the sources that it builds on in its **Prior art** section.
