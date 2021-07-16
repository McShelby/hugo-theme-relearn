---
title : Expand
description : "Displays an expandable/collapsible section of text on your page"
---

The Expand shortcode displays an expandable/collapsible section of text on your page.

## Usage

````
{{%/* expand "Does this relearn theme rock?" { "true" | "false" } */%}}
Yes!
{{%/* /expand */%}}
````

The first optional parameter defines the text that appears next to the expand/collapse icon. The default text is `"Expand me..."`.

The second optional parameter controls if the block is initially shown as expanded (`"true"`) or collapsed (`"false"`). The default ist `"false"`.
## Examples

### All defaults

{{% expand %}}
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{% /expand %}}

{{% expand "Show markup" %}}
````
{{%/* expand */%}}
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{%/* /expand */%}}
````
{{% /expand %}}

### Initially expanded

{{% expand "Expand me..." "true" %}}
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{% /expand %}}

{{% expand "Show markup" %}}
````
{{%/* expand "Expand me..." "true" */%}}
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{%/* /expand */%}}
````
{{% /expand %}}

### Arbitrary text

{{% expand "Show me endless possibilities" %}}
Some expandable text.

You can add:

- multiple paragraphs
- bullet point lists
- *emphasized*, **bold** and even ***bold emphasized*** text
- [links](https://example.com)
- other shortcodes besides `expand`
- etc.

```
...and even source code
```

> the possiblities are endless
{{% /expand%}}

{{% expand "Show markup" %}}
````
{{%/* expand "Show me endless possibilities" */%}}
Some expandable text.

You can add:

- multiple paragraphs
- bullet point lists
- *emphasized*, **bold** and even ***bold emphasized*** text
- [links](https://example.com)
- other shortcodes besides `expand`
- etc.

```
...and even source code
```

> the possiblities are endless
{{%/* /expand */%}}
````
{{% /expand %}}
