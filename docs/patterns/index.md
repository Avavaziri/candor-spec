---
status: Editor's Draft
---

# Patterns

Candor 0.1 has 16 patterns in four areas.
Each pattern uses the same [template](../spec/template).
A pattern marked "Demo" has a working HTML example.

## Uncertainty

| ID | Pattern | Use it to |
|---|---|---|
| [UNC-1](./uncertainty/confidence-signal) | Confidence signal | Show how well the evidence supports an answer. Demo. |
| [UNC-2](./uncertainty/hedged-wording) | Hedged wording | Match the words of an answer to the strength of its evidence. |
| [UNC-3](./uncertainty/declining-to-answer) | Declining to answer | Say "I don't know" clearly, and offer a way forward. |
| [UNC-4](./uncertainty/ask-or-proceed) | Ask or proceed | Decide when to ask a question and when to make a stated guess. |

## Injection warnings

| ID | Pattern | Use it to |
|---|---|---|
| [INJ-1](./injection/source-trust-labels) | Source trust labels | Show which content came from outside the conversation. |
| [INJ-2](./injection/confirm-triggered-actions) | Confirm triggered actions | Stop external content from acting for the user. Demo. |
| [INJ-3](./injection/suspected-injection-notice) | Suspected injection notice | Tell the user when content tried to give the assistant orders. |
| [INJ-4](./injection/action-log) | Action log | Show every action the assistant took, and why. |

## Privacy boundaries

| ID | Pattern | Use it to |
|---|---|---|
| [PRV-1](./privacy/context-indicator) | Context indicator | Show what the assistant can see right now. Demo. |
| [PRV-2](./privacy/egress-notice) | Egress notice | Show what data leaves the device or tenant, and where it goes. |
| [PRV-3](./privacy/consent-and-retention) | Consent and retention | Ask before data is kept or reused, and show how long it stays. |
| [PRV-4](./privacy/redaction-preview) | Redaction preview | Let the user see and remove sensitive data before it is sent. |

## Verifiable citing

| ID | Pattern | Use it to |
|---|---|---|
| [CIT-1](./citing/inline-citations) | Inline citations | Link each claim to its source in the text. Demo. |
| [CIT-2](./citing/source-preview) | Source preview | Let the user inspect a source without losing their place. |
| [CIT-3](./citing/quote-to-source) | Quote-to-source link | Take the user to the exact passage that supports a claim. |
| [CIT-4](./citing/uncited-claims) | Uncited claims | Mark claims that no source supports. |
