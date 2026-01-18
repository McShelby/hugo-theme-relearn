+++
categories = ['howto', 'reference']
description = 'Get value of site params'
title = 'SiteParam'
+++

The `siteparam` shortcode prints values of site-wide params contained in your `hugo.toml`.

## Usage

To print params from a page's front matter and falling back to the site options, use Hugo's built-in [`param` shortcode](https://gohugo.io/shortcodes/param/).

{{% multishortcode name="siteparam" execute="false" %}}
name = "editURL"
{{% /multishortcode %}}

### Parameters

| Name                 | Position | Default          | Notes       |
|----------------------|----------|------------------|-------------|
| **name**             | 1        | _&lt;empty&gt;_  | The name of the site param to be displayed. |

## Examples

### `editURL`

{{% multishortcode name="siteparam" format="`editURL` value: %s" %}}
name = "editURL"
{{% /multishortcode %}}

### Nested Parameter with Markdown and HTML Formatting

To use formatted parameter, add this in your `hugo.toml`:

{{< multiconfig file=hugo >}}
[markup.goldmark.renderer]
  unsafe = true
{{< /multiconfig >}}

Now values containing Markdown will be formatted correctly.

{{< multiconfig file=hugo section=params >}}
[siteparam.test]
  text = 'A **nested** parameter <b>with</b> formatting'
{{< /multiconfig >}}

{{% multishortcode name="siteparam" format="Formatted parameter: %s" %}}
name = "siteparam.test.text"
{{% /multishortcode %}}
