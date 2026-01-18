+++
categories = ['howto', 'reference']
description = 'Render code with a syntax highlighter'
frontmatter = ['highlightWrap']
options = ['disableHoverBlockCopyToClipBoard', 'disableInlineCopyToClipBoard', 'highlightWrap']
title = 'Highlight'
+++

The `highlight` shortcode renders your code with a syntax highlighter.

{{% multishortcode name="highlight" print="false" %}}
lineNos: "true"
type: "py"
wrap: "true"
title: "python"
content: |
  print("Hello World!")
{{% /multishortcode %}}

## Usage

{{% multishortcode name="highlight" execute="false" %}}
lineNos: "true"
type: "py"
wrap: "true"
title: "python"
content: |
  print("Hello World!")
{{% /multishortcode %}}

This shortcode is fully compatible with Hugo's [`highlight` shortcode](https://gohugo.io/content-management/syntax-highlighting/#highlight-shortcode) but **offers some extensions**.

It is called interchangeably in the same way as Hugo's own shortcode by providing positional parameters or simply by using Markdown codefences.

You are free to also call this shortcode from your own partials. In this case it resembles Hugo's [`highlight` function](https://gohugo.io/functions/highlight/) syntax if you call it using compatibility syntax.

Markdown codefence syntax is widely available in other Markdown parsers like GitHub and therefore is the recommended syntax for generating portable Markdown.

The [`tab` shortcode](shortcodes/tab) is also capable of displaying code but with limited options.

### Parameters

| Name                  | Position | Default          | Notes       |
|-----------------------|--------- | -----------------|-------------|
| **type**              | 1        | _&lt;empty&gt;_  | The language of the code to highlight. Choose from one of the [supported languages](https://gohugo.io/content-management/syntax-highlighting/#list-of-chroma-highlighting-languages). Case-insensitive. |
| **title**             |          | _&lt;empty&gt;_  | **Extension**. Arbitrary title for code. This displays the code like a [single tab](shortcodes/tab) if `hl_inline=false` (which is Hugo's default). |
| **wrap**              |          | see notes        | **Extension**. When `true` the content may wrap on long lines otherwise it will be scrollable.<br><br>The default value can be set in your `hugo.toml` and overwritten via front matter. [See below](#setting-wrap-of-long-lines). |
| **options**           | 2        | _&lt;empty&gt;_  | An optional, comma-separated list of zero or more [Hugo supported options](https://gohugo.io/functions/highlight/#options) as well as extension parameter from this table. |
| _**&lt;option&gt;**_  |          | _&lt;empty&gt;_  | Any of [Hugo's supported options](https://gohugo.io/functions/highlight/#options). |
| _**&lt;content&gt;**_ |          | _&lt;empty&gt;_  | Your code to highlight. |

## Settings

### Setting Default Values for Hugo's Options

Default values for [Hugo's supported options](https://gohugo.io/functions/highlight/#options) can be set via [goldmark settings](https://gohugo.io/getting-started/configuration-markup/#highlight).

If used together with wrapping of long lines, use this recommended settings. Otherwise, line numbers will shift if code wraps.

{{< multiconfig file=hugo >}}
[markup]
  [markup.highlight]
    lineNumbersInTable = false
{{< /multiconfig >}}

### Setting Wrap of Long Lines

{{% badge style="option" %}}Option{{% /badge %}} {{% badge style="frontmatter" %}}Front Matter{{% /badge %}} By default, code will be wrapped if the line is not long enough.

You can disable wrapping by setting `highlightWrap=false` or by setting the [`wrap` parameter](#parameters) individually for each code block.

{{< multiconfig section=params >}}
highlightWrap=false
{{< /multiconfig >}}

### Copy to Clipboard for Inline Code

{{% badge style="option" %}}Option{{% /badge %}} By default inline code has a button to copy the code to the clipboard.

If you want to disable this feature, set `disableInlineCopyToClipBoard=true`.

{{< multiconfig file=hugo section=params >}}
disableInlineCopyToClipBoard = true
{{< /multiconfig >}}

### Copy to Clipboard for Block Code

{{% badge style="option" %}}Option{{% /badge %}} By default block code has a button to copy the code to the clipboard that is only visible on hover.

Set `disableHoverBlockCopyToClipBoard=true` to disable the hover effect and always show the button.

{{< multiconfig file=hugo section=params >}}
disableHoverBlockCopyToClipBoard = true
{{< /multiconfig >}}

### Setting a Specific Color Scheme

You can configure the color style used for code blocks in your [color variants stylesheet](configuration/branding/modules#change-syntax-highlighting) file using the `--CODE-theme` variable. This requires further configuration as described in the above link.

## Examples

### Line Numbers with Starting Offset

As mentioned above, line numbers in a `table` layout will shift if code is wrapping, so better use `inline`. To make things easier for you, set `lineNumbersInTable = false` in your `hugo.toml` and add `lineNos = true` when calling the shortcode instead of the specific values `table` or `inline`.

{{% multishortcode name="highlight" %}}
lineNos: "true"
lineNoStart: "666"
type: "py"
content: |
  # the hardest part is to start writing code; here's a kickstart; just copy and paste this; it's free; the next lines will cost you serious credits
  print("Hello")
  print(" ")
  print("World")
  print("!")
{{% /multishortcode %}}

### With Title

{{% multishortcode name="highlight" %}}
type: "py"
title: "python"
content: |
  # a bit shorter
  print("Hello World!")
{{% /multishortcode %}}

### With Wrap

{{% multishortcode name="highlight" %}}
type: "py"
wrap: "true"
hl_lines: "2"
content: |
  # Quicksort Python One-liner
  lambda L: [] if L==[] else qsort([x for x in L[1:] if x< L[0]]) + L[0:1] + qsort([x for x in L[1:] if x>=L[0]])
  # Some more stuff
{{% /multishortcode %}}

### Without Wrap

{{% multishortcode name="highlight" %}}
type: "py"
wrap: "false"
hl_lines: "2"
content: |
  # Quicksort Python One-liner
  lambda L: [] if L==[] else qsort([x for x in L[1:] if x< L[0]]) + L[0:1] + qsort([x for x in L[1:] if x>=L[0]])
  # Some more stuff
{{% /multishortcode %}}
