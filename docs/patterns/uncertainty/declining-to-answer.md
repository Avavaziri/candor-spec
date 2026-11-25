---
status: Editor's Draft
id: UNC-3
title: Declining to answer
---

# UNC-3 Declining to answer

<dl class="pattern-meta">
  <dt>Area</dt><dd>Uncertainty</dd>
  <dt>Applies when</dt><dd>The interface shows answers from an assistant. This applies to almost every AI interface.</dd>
  <dt>Related</dt><dd><a href="./hedged-wording">UNC-2</a>, <a href="./ask-or-proceed">UNC-4</a>, <a href="../citing/uncited-claims">CIT-4</a></dd>
</dl>

## Summary

When the assistant cannot give an honest answer, the interface says so in the first sentence.
It says what is missing, and it offers a next step.

## Problem

An assistant always produces text.
When it has no good answer, it can produce a plausible wrong answer instead.
The user cannot tell this answer from a real one.

A refusal can also fail the user.
A vague refusal, such as "I can't help with that", gives no reason and no way forward.
A long apology hides the refusal in the middle of the text.
The user then tries again and again, and loses time.

## When to use

- The assistant has no source that supports an answer.
- The sources that the assistant found conflict, and it cannot resolve the conflict.
- The question is outside the scope that the operator set.
- The user does not have permission to see the data that an answer needs.
- A policy stops the assistant from giving the answer.

## When not to use

- The evidence is weak but useful. Give the answer with [UNC-2 Hedged wording](./hedged-wording) instead.
- The question has several readings, and one of them has an answer. Ask the user with [UNC-4 Ask or proceed](./ask-or-proceed) instead.
- The answer is only partly missing. Answer the part that has evidence. Decline only the part that does not.

## Anatomy

1. **Decline statement.** The first sentence. It says that the assistant does not have an answer.
2. **Reason type.** One of a fixed set of reasons: not found, not allowed or out of scope.
3. **Gap description.** What information is missing, in words the user understands.
4. **Next step.** An action the user can take, such as a link, a contact or a better search.
5. **Partial answer.** An optional answer to the parts of the question that do have evidence.

## Requirements

::: req UNC-3.1
The interface MUST show the decline statement in the first sentence of the answer.
:::

::: req UNC-3.2
The interface MUST NOT show an invented answer in place of a decline.
:::

Note: An invented answer includes a made-up figure, name, date, source or quote.

::: req UNC-3.3
The interface MUST say which reason type applies: not found, not allowed or out of scope.
:::

::: req UNC-3.4
The interface MUST NOT reveal the content, title or existence of data that the user does not have permission to see.
:::

Note: Say "You do not have access to the data for this answer". Do not say "The Q3 layoffs plan is restricted". If even the existence of restricted data is sensitive, use the reason type "not found".

::: req UNC-3.5
The interface SHOULD describe what information is missing.
:::

::: req UNC-3.6
The interface MUST offer at least one next step, unless a policy forbids all next steps.
:::

::: req UNC-3.7
The interface SHOULD keep the decline statement and the reason to two sentences or fewer.
:::

::: req UNC-3.8
The interface SHOULD NOT apologise more than once in a decline.
:::

::: req UNC-3.9
The interface MAY give a partial answer after the decline statement, if the partial answer has evidence.
:::

::: req UNC-3.10
The interface MUST show a decline in the same place and format as a normal answer.
:::

Note: A decline that shows only as a toast or an error code is easy to miss and hard to read again.

## Wording

Start with the decline. Then the reason. Then the next step.

| Reason type | Example |
|---|---|
| Not found | "I don't know. I found no source for the 2027 budget. The finance team publishes it in March." |
| Not allowed | "I can't answer this. You do not have access to the data that it needs. Ask your manager for access." |
| Out of scope | "I can't answer this here. This assistant covers IT support only. For pay questions, use the HR portal." |

Do this:

- "I don't know." Use these words when the reason is "not found".
- "I found no source for this." Say what you searched, if it helps the user.
- "Try the HR portal." Give a real link or a real contact.

Do not do this:

- "Great question! Unfortunately, as an AI, I'm so sorry, but I'm unable to…". The refusal is in the fourth clause.
- "I can't help with that." No reason and no next step.
- A plausible figure with no source, to avoid a decline.

## Accessibility

- **1.3.1 Info and Relationships (A).** A decline is a normal answer in the thread. Use the same markup as other answers, so assistive technology finds it in the same place. See [UNC-3.10](#unc-3.10).
- **4.1.3 Status Messages (AA).** If the interface announces new answers with a live region, it announces a decline in the same way. It does not use an assertive alert for a decline.
- **1.4.1 Use of Color (A).** A decline can have a visual style, such as an icon. The words "I don't know" or "I can't answer this" still carry the meaning.
- **2.5.8 Target Size (Minimum) (AA).** Next-step links and buttons are at least 24 by 24 CSS pixels, or they have enough space around them.

## Security and privacy considerations

- The "not allowed" reason can leak data. A specific reason tells the user that restricted data exists. Use one fixed message for all access refusals. See [UNC-3.4](#unc-3.4).
- Attackers probe refusals to learn the rules. Do not quote the system prompt or the policy text in a decline. The OWASP risk LLM07:2025 System Prompt Leakage describes this threat.
- External content can tell the assistant to refuse, so that the user does not get a real answer. Treat a refusal that a source asked for as a [suspected injection](../injection/suspected-injection-notice).
- A decline can still log the question. Tell the user where questions are kept. See [PRV-3](../privacy/consent-and-retention).

## Anti-patterns

- **Confident invention.** A plausible answer with no evidence, in place of "I don't know".
- **Buried refusal.** The decline comes after a paragraph of praise and apology.
- **Dead end.** "I can't help with that." No reason and no next step.
- **Apology loop.** The assistant apologises in each turn, and the user tries again and again with no progress.
- **Leaky refusal.** "I can't share the merger file with you." The refusal reveals that the file exists.
- **Error-code decline.** "Error 403" in a toast, in place of a sentence in the thread.

## Demo

No demo yet. A demo is planned for version 0.2.

## Conformance checklist

- [UNC-3.1](#unc-3.1) The first sentence of each decline says that there is no answer.
- [UNC-3.2](#unc-3.2) Test questions with no source get a decline, not an invented answer.
- [UNC-3.3](#unc-3.3) Each decline names one reason type: not found, not allowed or out of scope.
- [UNC-3.4](#unc-3.4) An access refusal does not reveal the content, title or existence of restricted data.
- [UNC-3.6](#unc-3.6) Each decline gives at least one next step, or a policy forbids one.
- [UNC-3.10](#unc-3.10) Declines show in the thread, in the same format as other answers.

## Prior art

- Microsoft HAX Toolkit, guideline G10 "Scope services when in doubt" ([library](https://www.microsoft.com/en-us/haxtoolkit/library/)). A clear decline is one way to scope a service down.
- Google PAIR People + AI Guidebook, chapter "Errors + Graceful Failure" ([link](https://pair.withgoogle.com/chapter/errors-failing/)). This pattern applies graceful failure to the case of no answer.
- Apple Human Interface Guidelines, Machine learning, section "Limitations" ([link](https://developer.apple.com/design/human-interface-guidelines/machine-learning)). A decline tells the user about a limit at the moment it matters.
- NIST AI 600-1, Generative AI Profile, risk 2 "Confabulation" ([DOI](https://doi.org/10.6028/NIST.AI.600-1)). NIST describes it as "confidently stated but erroneous or false content". A decline is the alternative to it.
- OWASP Top 10 for LLM Applications 2025, LLM02:2025 Sensitive Information Disclosure ([link](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/)) and LLM07:2025 System Prompt Leakage ([link](https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/)). These risks inform the rules for access refusals.
