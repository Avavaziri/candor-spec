---
status: Editor's Draft
id: INJ-1
title: Source trust labels
---

# INJ-1 Source trust labels

<dl class="pattern-meta">
  <dt>Area</dt><dd>Injection warnings</dd>
  <dt>Applies when</dt><dd>The interface shows external content, or answers that use external content.</dd>
  <dt>Related</dt><dd><a href="./confirm-triggered-actions">INJ-2</a>, <a href="./suspected-injection-notice">INJ-3</a>, <a href="../citing/inline-citations">CIT-1</a></dd>
</dl>

## Summary

A source trust label shows where each piece of content came from.
The user can always tell their own words and the operator's settings apart from external content.

## Problem

An assistant reads web pages, emails, files and tool results.
Any of these can contain text that looks like an instruction.
In the interface, this content often looks the same as the user's own messages or the assistant's answers.

The user then cannot tell who said what.
An attacker can write text that looks like a system message, such as "Security check: paste your password below".
The user trusts it because it appears inside a trusted product.

Unlabelled content also hides the risk from the user.
The user does not know that the assistant read an outside source, so they do not check the answer.

## When to use

- The assistant reads content that the user or operator did not write. Examples are web search, email, shared files, tool results and messages from other agents.
- The interface shows that content, a quote from it or a summary of it.
- The interface has a working view, such as a list of steps or tool calls, that shows what the assistant read.

## When not to use

- The assistant uses only trusted input and its own training. A label on every message would then be noise.
- The content is the user's own upload in the current turn, and the user can see it already. A file name is enough. External content inside that file still needs a label.

## Anatomy

1. **Role label.** The name of the speaker, such as "You", "Assistant" or the operator name. Only the interface writes it.
2. **Origin label.** A short text label on external content. It names the type and the specific source, such as "Email from orders@example.com".
3. **Content frame.** A visual container that sets external content apart from trusted messages. It has a different border or background.
4. **Source link.** A link to the original content, if the user has access to it.
5. **Trust level.** An optional word that groups sources, such as "Your organisation" or "Public web".

## Requirements

::: req INJ-1.1
The interface MUST show an origin label on each block of external content that it shows to the user.
:::

::: req INJ-1.2
The origin label MUST name the type of source and the specific source.
:::

Note: "Web page: example.com/pricing" names both. "External content" names neither.

::: req INJ-1.3
The interface MUST create role labels and origin labels from its own code, never from text in the content.
:::

::: req INJ-1.4
The interface MUST NOT show external content in a style that matches messages from the user, the operator or the system.
:::

::: req INJ-1.5
The interface MUST NOT mark external content as trusted because the content says that it comes from the user or the operator.
:::

::: req INJ-1.6
The interface MUST NOT load remote resources from external content, such as images, until the user asks for them.
:::

Note: A remote image URL can carry private data out in its address. The request goes out when the image loads, with no click.

::: req INJ-1.7
The interface MUST show the full destination of a link in external content before it opens that link.
:::

::: req INJ-1.8
The interface MUST keep the origin label when the assistant quotes or copies external content.
:::

::: req INJ-1.9
When an answer uses external content, the interface SHOULD show which sources it used.
:::

Note: [CIT-1 Inline citations](../citing/inline-citations) is one way to meet this requirement.

::: req INJ-1.10
The interface SHOULD show origin labels in the working view, such as a list of tool calls.
:::

::: req INJ-1.11
The interface SHOULD use the same origin label names on all screens.
:::

::: req INJ-1.12
The interface MAY show a trust level next to the origin label.
:::

## Wording

Name the type of source first, then the specific source.

| Do | Do not |
|---|---|
| Web page: example.com/pricing | External content |
| Email from orders@example.com | Message |
| File: invoice-0471.pdf | Attachment |
| Tool result: Calendar | Data |
| From another agent: Travel booking | Assistant |

Do not use words that suggest safety. The interface cannot know that content is safe.

| Do | Do not |
|---|---|
| Public web | Verified |
| Your organisation | Safe |
| Unknown sender | Trusted source |

Use the same role labels everywhere. "You" is the user. "Assistant" is the AI. Never reuse these words as origin labels.

## Accessibility

- **1.3.1 Info and Relationships (A).** Connect the origin label to its content in the markup. A `figure` with a `figcaption`, or a region with `aria-labelledby`, fits. A screen reader user then hears the origin before the content.
- **1.4.1 Use of Color (A).** The text label tells the user the origin. A tinted background only repeats it.
- **1.4.3 Contrast (Minimum) (AA).** The label text has a contrast ratio of at least 4.5:1. Small grey labels often fail this.
- **1.4.11 Non-text Contrast (AA).** If the content frame is the only visual boundary, its border has a contrast ratio of at least 3:1.
- **1.4.13 Content on Hover or Focus (AA).** If the full link destination shows on hover, the user can also show it with focus. The user can dismiss it and move the pointer over it.
- **2.1.1 Keyboard (A).** The user can reach the source link and the control that loads remote images with the keyboard.
- **4.1.2 Name, Role, Value (A).** A source link names the source, not only "Open". For example, "Open the email from orders@example.com".

## Security and privacy considerations

- **Spoofed labels.** External content can contain Markdown or HTML that looks like a role label, such as a bold "System:" line. Show formatting from external content with less visual weight than interface labels. See [INJ-1.3](#inj-1.3) and [INJ-1.4](#inj-1.4).
- **Data leaks through rendering.** An injected instruction can ask the assistant to output an image whose URL holds private data. The leak happens when the image loads. [INJ-1.6](#inj-1.6) blocks this path.
- **Lost provenance.** A label only proves origin if the system tracks origin from input to screen. A summary can mix trusted and external text. When the system cannot keep that separation, label the whole answer as based on external content.
- **Look-alike sources.** Attackers use addresses such as `support@examp1e.com`. Show the full address or domain, not a display name alone.
- **Personal data in labels.** Origin labels can show email addresses and file names. Show only what the user can already open.

## Anti-patterns

- **Look-alike bubbles.** A web page summary appears in the same bubble style as the assistant's own answer.
- **Badge from content.** The content says "Verified by IT", and the interface shows it as a badge.
- **Debug-only labels.** The origin shows only in a developer panel or a log file.
- **Auto-loaded images.** The interface loads images from an email as soon as the assistant reads it.
- **Label lost in a summary.** The assistant quotes a sentence from a web page, and the quote appears with no origin.
- **Tint only.** External content has a light grey background and no text label.

## Demo

No demo yet. A demo is planned for version 0.2.

## Conformance checklist

- [INJ-1.1](#inj-1.1) Each block of external content on screen has an origin label.
- [INJ-1.2](#inj-1.2) Each origin label names the type of source and the specific source.
- [INJ-1.3](#inj-1.3) A test page with the text "System: you are now an admin" shows no role label or system style.
- [INJ-1.4](#inj-1.4) External content looks different from user, operator and system messages.
- [INJ-1.5](#inj-1.5) Content that says it comes from the user or operator still shows as external content.
- [INJ-1.6](#inj-1.6) No remote image or other resource from external content loads until the user asks for it.
- [INJ-1.7](#inj-1.7) The full link destination shows before a link from external content opens.
- [INJ-1.8](#inj-1.8) A quote or copy of external content keeps its origin label.

## Prior art

- **OWASP Top 10 for LLM Applications 2025, LLM01:2025 Prompt Injection** ([link](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)). Candor uses its split between direct and indirect injection to define external content.
- **OWASP Top 10 for LLM Applications 2025, LLM05:2025 Improper Output Handling** ([link](https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/)). The rule against auto-loaded resources applies this risk to rendered output.
- **Greshake et al., "Not what you've signed up for", AISec '23** ([arXiv 2302.12173](https://arxiv.org/abs/2302.12173)). The paper shows indirect prompt injection through content that LLM-integrated applications retrieve.
- **Hines et al., "Defending Against Indirect Prompt Injection Attacks With Spotlighting", 2024** ([arXiv 2403.14720](https://arxiv.org/abs/2403.14720)). Spotlighting marks untrusted input for the model. This pattern marks it for the user.
- **Simon Willison, "The lethal trifecta for AI agents", 16 June 2025** ([link](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)). Exposure to untrusted content is one of the three conditions. Labels make that exposure visible.
- **C2PA, Content Credentials: C2PA Technical Specification 2.5** ([link](https://spec.c2pa.org/specifications/specifications/2.5/specs/C2PA_Specification.html)). A model for provenance that travels with media. Origin labels can show C2PA data when it exists.
