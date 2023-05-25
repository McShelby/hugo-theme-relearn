+++
description = "Show content in a single tab"
title = "Tab"
+++

You can use a `tab` shortcode to display a single tab.

This is especially useful if you want to flag your code example with an explicit language.

If you want multiple tabs grouped together you can wrap your tabs into the [`tabs` shortcode]({{% relref "shortcodes/tabs" %}}).

{{% tab name="c" %}}

```python
printf("Hello World!");
```

{{% /tab %}}

## Usage

While the examples are using shortcodes with named parameter you are free to also call this shortcode from your own partials.

{{< tabs groupid="shortcode-parameter">}}
{{% tab name="shortcode" %}}

````go
{{%/* tab name="c" */%}}
```c
printf("Hello World!");
```
{{%/* /tab */%}}
````

{{% /tab %}}
{{% tab name="partial" %}}

````go
{{ partial "shortcodes/tab.html" (dict
  "context" .
  "name" "c"
  "content" ("```c\nprintf(\"Hello World!\")\n```" | markdownify)
)}}
````

{{% /tab %}}
{{< /tabs >}}

### Parameter

| Name                  | Default              | Notes       |
|:----------------------|:---------------------|:------------|
| **name**              | _&lt;empty&gt;_      | Arbitrary text for the name of the tab. |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_      | Arbitrary text to be displayed in the tab. |

## Examples

### Code with collapsed margins

{{% tab name="Code" %}}

```python
printf("Hello World!");
```

{{% /tab %}}

### Mixed content

{{% tab name="_**Mixed**_" %}}

A tab can not only contain code but arbitrary text. In this case text and code will get a margin.

```python
printf("Hello World!");
```

{{% /tab %}}
