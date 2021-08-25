+++
description = "Displays content from other markdown files"
title = "Include"
+++

The include shortcode includes other files from your project inside of the current file. This can even contain markdown and will be taken into account when generating the table of contents.

## Usage

````go
{{%/* include "<file>" */%}}
````

## Examples

### Arbitray content

{{% include "shortcodes/INCLUDE_ME.md" %}}

{{% expand "Show markup" %}}
````go
{{%/* include "shortcodes/INCLUDE_ME.md" */%}}
````
{{% /expand %}}
