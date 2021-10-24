+++
description = "Displays content from other Markdown files"
title = "Include"
+++

The include shortcode includes other files from your project inside of the current file. This can even contain Markdown and will be taken into account when generating the table of contents.

## Usage

````go
{{%/* include <string> [ "true" | "false" ] */%}}
````

The first required parameter is the path to the file to be included.

If the file's content will be displayed as HTML, the second optional parameter controls if the first heading of the included file should be displayed (`"true"`)- which is the default - or be hidden.

## Examples

### Arbitray content

{{% include "shortcodes/INCLUDE_ME.md" %}}

{{% expand "Show markup" %}}
````go
{{%/* include "shortcodes/INCLUDE_ME.md" */%}}
````
{{% /expand %}}
