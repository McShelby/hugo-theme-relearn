+++
description = "Displays content from other files"
title = "Include"
+++

The `include` shortcode includes other files from your project inside of the current page.

## Usage

While the examples are using shortcodes with named parameter you are free to use positional aswell or also call this shortcode from your own partials.

{{< tabs groupId="shortcode-parameter">}}
{{% tab name="shortcode" %}}

````go
{{%/* include file="shortcodes/INCLUDE_ME.md" */%}}
````

{{% /tab %}}
{{% tab name="shortcode (positional)" %}}

````go
{{%/* include "shortcodes/INCLUDE_ME.md" */%}}
````

{{% /tab %}}
{{% tab name="partial" %}}

````go
{{ partial "shortcodes/include .html" (dict
  "context" .
  "file" "shortcodes/INCLUDE_ME.md"
)}}
````

{{% /tab %}}
{{< /tabs >}}

The included files can even contain Markdown and will be taken into account when generating the table of contents.

### Parameter

| Name                 | Position | Default          | Notes       |
|:---------------------|:---------|:-----------------|:------------|
| **file**             | 1        | _&lt;empty&gt;_  | The path to the file to be included. Path resolution adheres to [Hugo's build-in `readFile` function](https://gohugo.io/functions/readfile/) |
| **hidefirstheading** | 2        | `false`          | When `true` and the included file contains headings, the first heading will be hidden. This comes in handy, eg. if you include otherwise standalone Markdown files. |

## Examples

### Arbitray Content

````go
{{%/* include "shortcodes/INCLUDE_ME.md" */%}}
````

{{% include "shortcodes/INCLUDE_ME.md" %}}
