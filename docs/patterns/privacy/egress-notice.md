---
status: Editor's Draft
id: PRV-2
title: Egress notice
---

# PRV-2 Egress notice

<dl class="pattern-meta">
  <dt>Area</dt><dd>Privacy boundaries</dd>
  <dt>Applies when</dt><dd>Data that the user provides or that the assistant reads can leave the device or the operator's tenant.</dd>
  <dt>Related</dt><dd><a href="./context-indicator">PRV-1</a>, <a href="./redaction-preview">PRV-4</a>, <a href="../injection/confirm-triggered-actions">INJ-2</a></dd>
</dl>

## Summary

An egress notice tells the user what data leaves the device or tenant, who receives it and where it is stored.
It shows at the point of action, before the data leaves.

## Problem

Users cannot see where an AI feature runs.
The same interface can run a model on the device, in the operator's cloud tenant or at a third-party provider.
The user often cannot tell which one handles a given request.

This matters for many decisions.
An employee can paste customer data into a feature that sends it to a provider outside the company.
A user can share health data and not know which country stores it.
A privacy policy can describe all of this, but users do not read it at the moment they act.

## When to use

- Data can leave the device, the operator's tenant or a stated region.
- The interface uses more than one processing location. For example, some requests run on the device and others in the cloud.
- The assistant can call a third-party tool or service that receives user data.

## When not to use

- All processing stays on the device and nothing is stored or sent. A fixed statement of that fact is enough, such as "Runs on this device. Nothing is sent."
- Do not use the egress notice to list what the assistant can read. Use [PRV-1 Context indicator](./context-indicator) for that.

## Anatomy

1. **Location badge.** A short label near the input or action, such as "On this device", "Acme cloud (EU)" or "Sent to a third party".
2. **Destination detail.** A panel that opens from the badge. It names each recipient, its role and its storage region.
3. **Data summary.** A list of the data types that will leave, such as "Your message", "2 attached files" or "Calendar entries".
4. **New destination notice.** A notice that blocks the first send to a destination that the user has not seen before.
5. **Policy link.** A link to the full privacy information.

## Requirements

::: req PRV-2.1
The interface MUST show where each request is processed before the user sends it.
:::

::: req PRV-2.2
The interface MUST show a different label for on-device processing, the operator's own cloud and third-party processing.
:::

::: req PRV-2.3
The destination detail MUST name each organisation that receives the data.
:::

Note: "A trusted partner" is not a name. "Example Models Ltd, model provider" is a name and a role.

::: req PRV-2.4
The destination detail MUST state the storage region of each recipient, or say that the region is unknown.
:::

::: req PRV-2.5
The interface MUST show the egress notice at the point of action, not only in a policy or settings page.
:::

::: req PRV-2.6
The interface MUST NOT send data to a new destination before it shows the new destination notice.
:::

::: req PRV-2.7
The interface MUST show the new destination notice again when a destination or its region changes.
:::

::: req PRV-2.8
The interface SHOULD show a data summary of what will leave in each request.
:::

::: req PRV-2.9
When an assistant action sends data to a third-party tool, the interface MUST name that tool before it sends the data.
:::

Note: An action that external content triggers also needs [INJ-2](../injection/confirm-triggered-actions).

::: req PRV-2.10
The interface SHOULD let the user cancel a send from the new destination notice without loss of their message.
:::

::: req PRV-2.11
The interface MAY show the location badge only on hover or focus if it also shows in the detail panel and before each new destination.
:::

## Wording

Name the place, not the technology.

| Do | Do not |
|---|---|
| On this device | Local inference |
| Acme cloud, stored in the EU | Hybrid processing |
| Sent to Example Models Ltd (US) | Powered by our AI partners |

Write the new destination notice as a fact and a choice:

- "This request goes to Example Models Ltd in the United States. They keep it for 30 days. Send or cancel?"

Write the data summary as a short list:

- "Will send: your message, budget.xlsx, 3 calendar entries."

## Accessibility

- **1.4.1 Use of Color (A).** The location badge uses text. Do not show "on device" and "third party" only by colour or icon.
- **1.4.3 Contrast (Minimum) (AA).** The badge text meets 4.5:1. It is small text, and users must read it before they send.
- **1.4.13 Content on Hover or Focus (AA).** If the destination detail shows on hover, the user can dismiss it, move the pointer over it and keep it open.
- **2.1.1 Keyboard (A).** The badge, the detail panel and the send or cancel choice work with the keyboard.
- **2.4.11 Focus Not Obscured (Minimum) (AA).** The new destination notice does not cover the focused control. If the notice is a modal dialog, move focus into it.
- **3.3.4 Error Prevention (Legal, Financial, Data) (AA).** The new destination notice lets the user check and cancel before data is sent.
- **4.1.2 Name, Role, Value (A).** A modal notice uses the dialog role and has an accessible name. The WAI-ARIA dialog pattern fits.

## Security and privacy considerations

- External content can try to send data out. A web page can tell the assistant to post the conversation to a URL. Treat the URL as a new destination. See [INJ-2](../injection/confirm-triggered-actions).
- Do not let the assistant choose a destination silently. A destination comes from the operator's configuration or from the user.
- The data summary must not reveal data that the user cannot see. List the data types, not hidden content.
- Region labels can be wrong if a provider changes its setup. Review the destination list when contracts change.
- Candor is not legal advice. An egress notice can help with transparency duties, but it does not replace a lawful basis for transfer.

## Anti-patterns

- **Policy-only disclosure.** The only statement of where data goes is in a privacy policy.
- **"Powered by AI".** A badge that names a brand of model but not who receives the data or where.
- **Silent fallback.** A request runs on the device by default, but moves to the cloud when the device is busy. The badge does not change.
- **One notice for ever.** The user accepts a notice once, and later destinations never show a notice.
- **Tool calls with no destination.** The assistant calls a third-party plugin, and the user sees only the result.

## Demo

No demo yet. A demo is planned for version 0.2.

## Conformance checklist

- [PRV-2.1](#prv-2.1) The processing location shows before the user sends a request.
- [PRV-2.2](#prv-2.2) On-device, operator cloud and third-party processing have different text labels.
- [PRV-2.3](#prv-2.3) The destination detail names each receiving organisation and its role.
- [PRV-2.4](#prv-2.4) The destination detail states each recipient's storage region, or says it is unknown.
- [PRV-2.5](#prv-2.5) The notice shows at the point of action.
- [PRV-2.6](#prv-2.6) A test shows no data reaches a new destination before the notice shows.
- [PRV-2.7](#prv-2.7) A changed destination or region shows the notice again.
- [PRV-2.9](#prv-2.9) Each third-party tool is named before the assistant sends it data.

## Prior art

- OWASP Top 10 for LLM Applications 2025, LLM02:2025 "Sensitive Information Disclosure" ([link](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/)). Egress is where sensitive data can leak.
- NIST AI 600-1 Generative AI Profile, risk 4 "Data Privacy" ([link](https://doi.org/10.6028/NIST.AI.600-1)). Names data privacy as a generative AI risk.
- NIST AI RMF 1.0, trustworthy characteristic "Privacy-Enhanced" ([link](https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/)). The notice supports a privacy-enhanced system.
- Apple Human Interface Guidelines, "Generative AI", section "Privacy" ([link](https://developer.apple.com/design/human-interface-guidelines/generative-ai)). Platform guidance on privacy in generative features.
- Apple Human Interface Guidelines, "Machine learning", subsection "Private or public" ([link](https://developer.apple.com/design/human-interface-guidelines/machine-learning)). Treats privacy as a core design dimension of an ML feature.
- Simon Willison, "The lethal trifecta for AI agents" ([link](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)). External communication is one of the three risky capabilities.
- GDPR, Regulation (EU) 2016/679, Article 25 "Data protection by design and by default" ([link](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)). A related legal principle. Candor is not legal advice.
