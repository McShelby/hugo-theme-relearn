+++
categories = ['explanation', 'howto']
description = 'What the theme does to be usable by everyone'
options = ['link.underline']
title = 'Accessibility'
weight = 1
+++
{{% replaceRE "https://mcshelby.github.io/hugo-theme-relearn/" "" %}}
{{< include "ACCESSIBILITY.md" "true" >}}
{{% /replaceRE %}}

## Underlined Links

{{% badge style="option" %}}Option{{% /badge %}} By default, links in your content are told apart from the text around them only by their color. Readers who can not distinguish these colors don't see that there is a link.

Set `link.underline=true` to also underline them. This affects the links in your content, not the menu or the topbar, and not what looks like a control of its own, like buttons or cards.

{{< multiconfig file=hugo section=params >}}
link.underline = true
{{< /multiconfig >}}

The theme marks the page with the class `link-underline` on the `body` element, in case your own styles want to react on it.
