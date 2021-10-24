+++
description = "Displays an expandable/collapsible section of text on your page"
title = "Expand"
+++

The Expand shortcode displays an expandable/collapsible section of text on your page.

## Usage

````go
{{%/* expand [ <string> [ "true" | "false" ] ] */%}}
Yes!
{{%/* /expand */%}}
````

The first optional parameter defines the text that appears next to the expand/collapse icon. The default text is `"Expand me..."`.

The second optional parameter controls if the block is initially shown as expanded (`"true"`) or collapsed (`"false"`). The default ist `"false"`.
## Examples

{{% expand "I'll tell you a secret..." %}}
...maybe the next time you'll open this expander!
{{% /expand %}}

### All defaults

{{% expand %}}
Yes, you did it!
{{% /expand %}}

{{% expand "Show markup" "true" %}}
````go
{{%/* expand */%}}
Yes, you did it!
{{%/* /expand */%}}
````
{{% /expand %}}

### Initially expanded

{{% expand "Expand me..." "true" %}}
No need to press you!
{{% /expand %}}

{{% expand "Show markup" "true" %}}
````go
{{%/* expand "Expand me..." "true" */%}}
No need to press you!
{{%/* /expand */%}}
````
{{% /expand %}}

### Arbitrary text

{{% expand "Show me endless possibilities" %}}
Some expandable text.

You can add:

- multiple paragraphs
- bullet point lists
- _emphasized_, **bold** and even **_bold emphasized_** text
- [links](https://example.com)
- other shortcodes besides `expand`
- etc.

```plaintext
...and even source code
```

> the possiblities are endless
{{% /expand %}}

{{% expand "Show markup" %}}
````go
{{%/* expand "Show me endless possibilities" */%}}
Some expandable text.

You can add:

- multiple paragraphs
- bullet point lists
- _emphasized_, **bold** and even **_bold emphasized_** text
- [links](https://example.com)
- other shortcodes besides `expand`
- etc.

```plaintext
...and even source code
```

> the possiblities are endless
{{%/* /expand */%}}
````
{{% /expand %}}
