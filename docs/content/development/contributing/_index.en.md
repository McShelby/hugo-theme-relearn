---
categories:
- explanation
description: What to know if you want to contribute
title: Contributing
weight: 1
---

## Code Quality

A new release can happen at any time from the `main` branch of the [GitHub project](https://github.com/McShelby/hugo-theme-relearn) without further acknowledgment. This makes it necessary that, every pushed set of changesets into the `main` branch **must** be self-contained and correct, resulting in a releasable version.

Stay simple for the user by focusing on the mantra "convention over configuration".

At installation the site should work reasonable without (m)any configuration.

Stay close to the Hugo way.

Don't use npm or any preprocessing, our contributors may not be front-end developers.

Document new features in the docs. This also contains entries to the [What's new](introduction/releasenotes) page.

Don't break existing features if you don't have to.

Remove reported issue from the browser's console.

Check for unnecessary whitespace and correct indention of your resulting HTML.

## Conventional Commits

Write commit messages in the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format: a type, the affected part of the theme as scope in parentheses and a short description, followed by the number of the related issue.

````text
feat(table): make columns sortable #1339
````

The scope is never left out. Release commits are the only exception; the release workflow writes them as `Release <version>`.

The type tells what kind of change it is.

| Type     | Usage                                                  |
|----------|--------------------------------------------------------|
| feat     | a new feature or a change of an existing one           |
| fix      | a bug fix that keeps the intended behavior             |
| docs     | a change to the documentation only                     |
| refactor | a change of the code that neither fixes nor adds       |
| perf     | a change that improves the build or page performance   |
| build    | a change of the build or the release process           |
| ci       | a change of the workflows                              |
| chore    | anything else, like updating third-party files         |

Following is an incomplete list of some of the used scopes. Be creative.

| Common     | Feature    | Structure       | Shortcodes  |
|------------|------------|-----------------|-------------|
| browser    | a11y       | favicon         | attachments |
| shortcodes | archetypes | search          | badge       |
| theme      | alias      | menu            | button      |
|            | generator  | history         | callout     |
|            | i18n       | scrollbar       | children    |
|            | mobile     | nav             | details     |
|            | print      | toc             | icon        |
|            | rss        | clipboard       | include     |
|            | variant    | syntaxhighlight | math        |
|            |            | boxes           | mermaid     |
|            |            | table           | openapi     |
|            |            |                 | piratify    |
|            |            |                 | siteparam   |
|            |            |                 | tabs        |

Issue titles are not written in the conventional commit format. They start with the affected part, like `table: make columns sortable` or `docs: write commit messages with type and scope`.
