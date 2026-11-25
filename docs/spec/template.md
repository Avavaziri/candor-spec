---
status: Editor's Draft
---

# Pattern template

Every pattern page uses this template.
Keep the sections in this order. Keep the headings exactly as shown.
The `npm run check` script fails if a section is missing.

## Front matter and title

```md
---
status: Editor's Draft
id: UNC-1
title: Confidence signal
---

# UNC-1 Confidence signal
```

The ID has an area prefix and a number.
The prefixes are `UNC` (uncertainty), `INJ` (injection warnings), `PRV` (privacy boundaries) and `CIT` (verifiable citing).
Never reuse a retired ID.

## Sections

| Section | Normative | What it contains |
|---|---|---|
| Summary | No | One or two sentences. What the pattern does for the user. |
| Problem | No | The user problem. Who is hurt, and how. |
| When to use | No | The situations where the pattern applies. |
| When not to use | No | Situations where the pattern does harm or does not fit. |
| Anatomy | No | The named parts of the pattern. Later sections use these names. |
| Requirements | **Yes** | Numbered requirements with MUST, SHOULD or MAY. |
| Wording | No | Example text for labels and messages. |
| Accessibility | No | How the pattern meets WCAG 2.2 AA. Names the success criteria. |
| Security and privacy considerations | No | How an attacker could abuse the pattern, and what data it exposes. |
| Anti-patterns | No | Common designs that fail, and why. |
| Demo | No | A working HTML demo, or a note that says when one will exist. |
| Conformance checklist | **Yes** | Yes-or-no checks. Each check links to a requirement. |
| Prior art | No | The published sources that the pattern builds on. |

Accessibility requirements that are specific to the pattern go in **Requirements**, not in **Accessibility**.
The **Accessibility** section explains them and maps them to WCAG.

## How to write a requirement

Use one requirement block for each rule:

```md
::: req UNC-1.2
The interface MUST show the confidence signal next to the answer or claim that it describes.
:::
```

Follow these rules:

1. Write one rule in each requirement.
2. Make "the interface" the subject when you can.
3. Use active voice.
4. Write no more than 25 words in a sentence.
5. Use each BCP 14 keyword only in capitals, and only with its BCP 14 meaning.
6. Write a requirement that a reviewer can test. "MUST be clear" is not testable. "MUST include a text label" is testable.
7. Put a note after the requirement if a reader needs the reason. Start it with "Note:".

## How to write a checklist item

Write one yes-or-no check for each MUST requirement.
You can add checks for SHOULD requirements.
Start each check with a link to its requirement:

```md
- [UNC-1.2](#unc-1.2) The signal is next to the answer or claim that it describes.
```

The [full checklist](../checklist) collects these items from every pattern. A script builds it.

## Wording style

Write in plain English. Use short sentences.
Use the rules of ASD-STE100 Simplified Technical English for requirements and checklists:
one instruction in each sentence, active voice and approved words.
