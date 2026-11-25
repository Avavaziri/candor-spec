---
status: Editor's Draft
id: PRV-4
title: Redaction preview
---

# PRV-4 Redaction preview

<dl class="pattern-meta">
  <dt>Area</dt><dd>Privacy boundaries</dd>
  <dt>Applies when</dt><dd>The interface detects sensitive data before the data leaves a boundary.</dd>
  <dt>Related</dt><dd><a href="./egress-notice">PRV-2</a>, <a href="./context-indicator">PRV-1</a></dd>
</dl>

## Summary

A redaction preview shows the sensitive data that the interface found before it sends a request.
The user sees what the recipient will receive, and can change each redaction.

## Problem

Users paste data into an assistant without a check.
A support log can contain customer emails. A config file can contain an API key. A screenshot can contain a card number.
Once the data leaves the device or tenant, the user cannot take it back.

Automatic redaction alone does not solve this.
It can miss data, so users trust it too much.
It can also remove data that the user needs, so the answer is wrong and the user does not know why.

## When to use

- The interface can detect likely sensitive data, such as personal data, secrets, card numbers or health data.
- The data is about to leave a boundary, such as the device or the operator's tenant. See [PRV-2](./egress-notice).
- The user can still change the request before it leaves.

## When not to use

- The interface has no detection. Do not show an empty preview, because it suggests a check that did not happen.
- The data stays inside the boundary. Redaction only adds friction there.
- The operator blocks the data type completely. Show a block message that says why, not a preview.

## Anatomy

1. **Highlight.** A visible mark on each detected item in the user's input.
2. **Item label.** The type of each item, such as "Email address" or "API key".
3. **Proposed redaction.** The text that replaces the item, such as `[EMAIL 1]`.
4. **Item control.** A control on each item to keep the redaction or undo it.
5. **Add redaction control.** A way for the user to select more text and redact it.
6. **Recipient view.** A view of the exact text that the recipient will receive.
7. **Coverage note.** A short statement that detection can miss data.
8. **Sent state.** A mark on the sent message that shows which items were redacted.

## Requirements

::: req PRV-4.1
The interface MUST show the redaction preview before the data leaves the boundary.
:::

::: req PRV-4.2
The preview MUST highlight each detected item and show its type in text.
:::

::: req PRV-4.3
The preview MUST show the proposed replacement for each detected item.
:::

::: req PRV-4.4
The interface MUST let the user undo each redaction one at a time.
:::

::: req PRV-4.5
The interface SHOULD let the user add a redaction to any text in the input.
:::

::: req PRV-4.6
The interface MUST let the user see the exact text that the recipient will receive.
:::

::: req PRV-4.7
The interface MUST redact detected secrets, such as passwords and API keys, by default.
:::

::: req PRV-4.8
The interface MUST NOT state or suggest that detection found all sensitive data.
:::

::: req PRV-4.9
After the send, the interface MUST show on the sent message which items it redacted.
:::

::: req PRV-4.10
The interface SHOULD use a replacement that keeps the meaning, such as a numbered type label.
:::

Note: `[EMAIL 1]` and `[EMAIL 2]` let the assistant tell two people apart. A row of asterisks does not.

::: req PRV-4.11
The interface MUST NOT send the original value of a redacted item to the recipient in any form, including logs or metadata.
:::

::: req PRV-4.12
The interface MAY restore redacted values in the answer on the user's device, if the values never left the boundary.
:::

## Wording

Say what was found and what will happen. Do not promise safety.

| Do | Do not |
|---|---|
| We found 3 items that may be sensitive. | Your data is protected. |
| API key: will be removed | Secret detected!! |
| Detection can miss some data. Check before you send. | All personal data removed. |

Label items by type:

- "Email address", "Phone number", "Card number", "API key", "Name (possible)".

Name the controls by their result:

- "Keep removed", "Send as written", "Remove this text too", "Show what will be sent".

## Accessibility

- **1.4.1 Use of Color (A).** A highlight colour alone does not mark an item. Add the item label in text, or an underline with a text label.
- **1.4.11 Non-text Contrast (AA).** The highlight border meets 3:1 against the input background.
- **1.3.1 Info and Relationships (A).** Give screen reader users a list of detected items with type and state, not only highlights inside the text.
- **2.1.1 Keyboard (A).** Each item control and the add redaction control work with the keyboard. Text selection for a new redaction also works with the keyboard.
- **2.4.3 Focus Order (A).** Focus moves through detected items in reading order, then to the send controls.
- **3.3.4 Error Prevention (Legal, Financial, Data) (AA).** The preview is a check step before data is sent.
- **4.1.2 Name, Role, Value (A).** Each item control has a name that includes the item type and state, such as "Email address 1, removed. Undo".
- **4.1.3 Status Messages (AA).** Announce the number of detected items in a polite live region when the preview opens.

## Security and privacy considerations

- The detection step itself handles sensitive data. Run it inside the boundary, such as on the device or in the operator's tenant.
- Do not log the original values of detected items. A log of secrets is a new leak.
- Attackers can hide data from detection with spacing, encoding or images. The coverage note tells the user that detection is not complete.
- Redaction can change the meaning of a request. The assistant can then give a wrong answer. Consider a note on the answer when redaction removed many items.
- A preview that shows too often trains users to click through it. Tune detection so most previews show a real item.

## Anti-patterns

- **Silent redaction.** The interface removes data and does not say so. The user does not know why the answer is wrong.
- **All-or-nothing.** The user can only accept every redaction or none.
- **Safety promise.** "Your personal data has been removed" implies complete detection.
- **Asterisk soup.** Every item becomes `****`. The assistant cannot tell items apart, and the answer gets worse.
- **Highlight only.** A yellow background with no label and no list. Screen reader users get nothing.
- **Preview after send.** The interface shows what it redacted only after the data has left.

## Demo

No demo yet. A demo is planned for version 0.2.

## Conformance checklist

- [PRV-4.1](#prv-4.1) The preview shows before any data leaves the boundary.
- [PRV-4.2](#prv-4.2) Each detected item is highlighted and has a text type label.
- [PRV-4.3](#prv-4.3) Each detected item shows its proposed replacement.
- [PRV-4.4](#prv-4.4) The user can undo one redaction without a change to the others.
- [PRV-4.6](#prv-4.6) The user can see the exact text the recipient will receive.
- [PRV-4.7](#prv-4.7) A test API key in the input is redacted by default.
- [PRV-4.8](#prv-4.8) No text in the preview says or suggests that detection is complete.
- [PRV-4.9](#prv-4.9) The sent message shows which items were redacted.
- [PRV-4.11](#prv-4.11) A test shows no redacted original value in the request, logs or metadata.

## Prior art

- OWASP Top 10 for LLM Applications 2025, LLM02:2025 "Sensitive Information Disclosure" ([link](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/)). Redaction is one control against this risk.
- NIST AI 600-1 Generative AI Profile, risk 4 "Data Privacy" ([link](https://doi.org/10.6028/NIST.AI.600-1)). Names data privacy as a generative AI risk.
- Microsoft HAX Toolkit, guideline G9 "Support efficient correction" ([link](https://www.microsoft.com/en-us/haxtoolkit/library/)). Per-item undo lets the user correct the detector.
- Microsoft HAX Toolkit, guideline G11 "Make clear why the system did what it did" ([link](https://www.microsoft.com/en-us/haxtoolkit/library/)). Item labels explain each redaction.
- Google PAIR People + AI Guidebook, chapter "Errors + Graceful Failure" ([link](https://pair.withgoogle.com/chapter/errors-failing/)). The coverage note plans for missed detections.
- GDPR, Regulation (EU) 2016/679, Article 5(1)(c) data minimisation ([link](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)). A related legal principle. Candor is not legal advice.
