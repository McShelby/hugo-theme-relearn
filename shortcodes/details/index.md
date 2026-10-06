# Details

The `details` shortcode displays an expandable/collapsible section of text.

{{% multishortcode name="details" print="false" %}}
summary: "Expand me..."
content: |
  Thank you!
{{% /multishortcode %}}

## Usage

{{% multishortcode name="details" execute="false" %}}
summary: "Expand me..."
content: |
  Thank you!
{{% /multishortcode %}}

This shortcode is fully compatible with Hugo's [`details` shortcode](https://gohugo.io/shortcodes/details/) but **offers some extensions**.

[Markdown callout syntax](https://gohugo.io/render-hooks/blockquotes/#extended-syntax) is available in other Markdown parsers like [Obsidian](https://help.obsidian.md/Editing+and+formatting/Callouts#Change+the+title) and therefore is the recommended syntax for generating portable Markdown.

In Markdown syntax the section is a callout of the style `details`. Its first line takes **summary** and **open**, while **name** and **title** are written as the [Markdown attributes](shortcodes/callout#markdown-attributes-configuration) `groupid` and `hint`. **class** and **raw** are not available.

The [`callout` shortcode](shortcodes/callout) is also capable of displaying expandable/collapsible sections of text but with additional parameters for color and additional icons.

### Parameters

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **summary**           | `"Details"`     | Arbitrary text to appear next to the expand/collapse icon. |
| **open**              | `false`         | How the content is displayed.<br><br>- `true`: the content is initially shown<br>- `false`: the content is initially hidden |
| **name**              | _&lt;empty&gt;_ | Arbitrary name of the group the section belongs to.<br><br>Of all sections with the same **name**, at most one is open at any given time. |
| **class**             | _&lt;empty&gt;_ | CSS classes to be added to the section. |
| **title**             | _&lt;empty&gt;_ | Arbitrary text to be displayed as a tooltip for the summary. |
| **raw**               | `false`         | **Extension**. How the content is processed.<br><br>- `false`: the content is rendered as Markdown<br>- `true`: the content is written as it is, see [below](#raw-content) |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_ | Arbitrary text to be displayed on expand. |

## Examples

### All Defaults

{{% multishortcode name="details" %}}
content: |
  Yes, you did it!
{{% /multishortcode %}}

### Initially Expanded

{{% multishortcode name="details" %}}
summary: "Expand me..."
open: "true"
content: |
  No need to press you!
{{% /multishortcode %}}

### Arbitrary Text

{{% multishortcode name="details" %}}
summary: "Show me almost **endless** possibilities"
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
{{% /multishortcode %}}

### Grouped Sections

If you give multiple sections the same `name`, they behave like an accordion: at most one will be open at any given time. If you open one of the sections, all other sections of the same group will close.

{{% multishortcode name="details" %}}
- summary: "Expand me..."
  name: "details-toggle"
  open: "true"
  content: |
    No need to press you!

- summary: "Expand me..."
  name: "details-toggle"
  content: |
    Thank you!
{{% /multishortcode %}}

### Raw Content

The content is rendered as Markdown on its own, apart from the rest of your page. This has consequences:

- A footnote defined inside of the content is listed inside of the section instead of at the end of your page, and a footnote defined outside of it can not be referenced.
- A heading inside of the content doesn't show up in the table of contents.
- With `goldmark.renderer.unsafe=false` (which is the default if you don't set it), HTML inside of the content is removed. This includes the HTML written by other shortcodes you call in there.

If the content is HTML already or contains other shortcodes, set `raw=true`. The content is then written as it is and no Markdown is rendered.

````go
{{</* details summary="Expand me..." raw=true */>}}
<p>A badge inside of a paragraph: {{%/* badge style="primary" */%}}Important{{%/* /badge */%}}</p>
{{</* /details */>}}
````

{{< details summary="Expand me..." raw=true >}}
<p>A badge inside of a paragraph: {{% badge style="primary" %}}Important{{% /badge %}}</p>
{{< /details >}}

### Calling Syntax

Call the shortcode with `{{</* details */>}}` as shown on this page. This works regardless of your configuration.

A call with `{{%/* details */%}}` writes its HTML into the Markdown of your page. With `goldmark.renderer.unsafe=false` the whole section is removed.
