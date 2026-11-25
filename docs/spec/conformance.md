---
status: Editor's Draft
---

# Conformance

## Normative language

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [[RFC2119](https://www.rfc-editor.org/rfc/rfc2119)] [[RFC8174](https://www.rfc-editor.org/rfc/rfc8174)] when, and only when, they appear in all capitals, as shown here.

In short:

| Keyword | What it means for an implementer |
|---|---|
| MUST, MUST NOT | Do this, or do not claim conformance. |
| SHOULD, SHOULD NOT | Do this, unless you have a good reason. Write the reason down. |
| MAY | You can do this. It is your choice. |

Sections called **Requirements** and **Conformance checklist** are normative.
All other sections are informative. Examples, demos, notes and anti-patterns are informative.

## What conforms

The conformance target is an **interface**.
The [terminology page](./terminology#interface) defines that term.
A model, an API or a company cannot conform. A specific interface can.

## When a pattern applies

A pattern applies to an interface when the interface has the feature that the pattern describes.
For example, [CIT-1](../patterns/citing/inline-citations) applies only if the interface shows sources.
Each pattern says when it applies in its **When to use** section.

Some patterns apply to almost every AI interface. These are:

- [UNC-3 Declining to answer](../patterns/uncertainty/declining-to-answer)
- [INJ-2 Confirm triggered actions](../patterns/injection/confirm-triggered-actions), for any interface that lets the assistant act
- [PRV-1 Context indicator](../patterns/privacy/context-indicator)
- [PRV-2 Egress notice](../patterns/privacy/egress-notice)

## Levels of conformance

An interface conforms to a **pattern** when it meets every MUST and MUST NOT requirement in that pattern.

An interface conforms to an **area** when it conforms to every pattern in that area that applies to it.

An interface conforms to **Candor 0.1** when it conforms to all four areas.

There is no partial conformance to a pattern.
If an interface misses one MUST, it does not conform to that pattern.

## Conformance claims

Candor has no certification body. Conformance is a self-assessment.
A conformance claim MUST state:

1. the Candor version, for example "Candor 0.1 Editor's Draft";
2. the date of the claim;
3. the interface and the screens or flows that the claim covers;
4. each pattern or area that the interface conforms to;
5. each pattern that does not apply, with the reason;
6. each SHOULD that the interface does not follow, with the reason.

A claim SHOULD link to the evidence, for example a filled [conformance checklist](../checklist).

Example claim:

> Acme Assist web app, chat and agent flows. Conforms to Candor 0.1 Editor's Draft, areas Uncertainty and Verifiable citing, and patterns INJ-1 and INJ-2. INJ-3 and INJ-4 are not met. Privacy area not assessed. Claim date 2026-11-25. Checklist: link.

## Accessibility baseline

Every pattern has an **Accessibility** section.
Those sections add to WCAG 2.2 Level AA. They do not replace it.
An interface that claims Candor conformance SHOULD also meet WCAG 2.2 Level AA for the screens in the claim.
