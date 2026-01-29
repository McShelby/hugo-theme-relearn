+++
categories = ['howto', 'reference']
description = 'Expandable/collapsible sections of text'
title = 'Expand'
+++

The `expand` shortcode displays an expandable/collapsible section of text.

{{% multishortcode name="expand" print="false" %}}
title: "Expand me..."
content: |
  Thank you!
{{% /multishortcode %}}

## Usage

{{% multishortcode name="expand" execute="false" %}}
title: "Expand me..."
content: |
  Thank you!
{{% /multishortcode %}}

[Markdown callout syntax](https://gohugo.io/render-hooks/blockquotes/#extended-syntax) is available in other Markdown parsers like [Obsidian](https://help.obsidian.md/Editing+and+formatting/Callouts#Change+the+title) and therefore is the recommended syntax for generating portable Markdown.

The [`notice` shortcode](shortcodes/notice) is also capable of displaying expandable/collapsible sections of text but with additional parameters for color and additional icons.

The theme supports Hugo's built-in [`details` shortcode](https://gohugo.io/content-management/shortcodes/#details) by mapping the parameter to the theme's `expand` shortcode.

### Parameters

| Name                  | Position | Default          | Notes       |
|-----------------------|----------|------------------|-------------|
| **title**             | 1        | `"Details"` | Arbitrary text to appear next to the expand/collapse icon. |
| **expanded**          | 2        | `false`          | How the content is displayed.<br><br>- `true`: the content is initially shown<br>- `false`: the content is initially hidden |
| _**&lt;content&gt;**_ |          | _&lt;empty&gt;_  | Arbitrary text to be displayed on expand. |

## Examples

### All Defaults

{{% multishortcode name="expand" %}}
content: |
  Yes, you did it!
{{% /multishortcode %}}

### Initially Expanded

{{% multishortcode name="expand" %}}
title: "Expand me..."
expanded: "true"
content: |
  No need to press you!
{{% /multishortcode %}}

### Arbitrary Text

{{% multishortcode name="expand" %}}
title: "Show me almost **endless** possibilities"
content: |
  You can add standard markdown syntax:

  - multiple paragraphs
  - bullet point lists
  - _emphasized_, **bold** and even **_bold emphasized_** text
  - [links](https://example.com)
  - etc.

  ```plaintext
  ...and even source code
  ```

  > the possibilities are endless (almost - including other shortcodes may or may not work)

  That's some text with a footnote[^1]

  [^1]: And that's the footnote.

  That's some more text with a footnote.[^someid]

  [^someid]:
      Anything of interest goes here.

      Blue light glows blue.
{{% /multishortcode %}}

### Using Hugo's `details` Shortcode

{{% multishortcode name="details" %}}
content: "...is what it's all about!"
{{% /multishortcode %}}
