+++
description = "Beautiful math and chemical formulae"
title = "Math"
+++

The `math` shortcode generates beautiful formatted math and chemical formulae using the [MathJax](https://mathjax.org/) library.

{{< math align="center" >}}
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
{{< /math >}}

## Usage

While the examples are using shortcodes with named parameter it is recommended to use Markdown codefences instead. This is because more and more other software supports Markdown codefences (eg. GitHub) and so your markdown becomes more portable.

You are free to also call this shortcode from your own partials.

Math is also usable without enclosing it in a shortcode or Markdown codefence but [requires configuration](#passthrough-configuration) by you. In this case no parameter from the below table are available.

{{< tabs groupid="shortcode-parameter">}}
{{% tab title="markdown" %}}

````md
```math { align="center" }
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
```
````

{{% /tab %}}
{{% tab title="shortcode" %}}

````go
{{</* math align="center" */>}}
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
{{</* /math */>}}
````

{{% /tab %}}
{{% tab title="partial" %}}

````go
{{ partial "shortcodes/math.html" (dict
  "page"    .
  "content" "$$left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$"
  "align"   "center"
)}}
````

{{% /tab %}}
{{% tab title="passthrough" %}}

````md
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
````

{{% /tab %}}
{{< /tabs >}}

### Parameter

| Name                  | Default          | Notes       |
|-----------------------|------------------|-------------|
| **align**             | `center`         | Allowed values are `left`, `center` or `right`. |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_  | Your formulae. |

## Configuration

MathJax is configured with default settings but you can customize MathJax's default settings for all of your files through a JSON object in your `hugo.toml` or override these settings per page through your pages frontmatter.

The JSON object of your `hugo.toml` / frontmatter is forwarded into MathJax's configuration object.

See [MathJax documentation](https://docs.mathjax.org/en/latest/options/index.html) for all allowed settings.

### Global Configuration File

This example reflects the default configuration also used if you don't define `mathJaxInitialize`

{{< multiconfig file=hugo >}}
[params]
  mathJaxInitialize = "{ \"tex\": { \"inlineMath\": [[\"\\(\", \"\\)\"], [\"$\", \"$\"]], displayMath: [[\"\\[\", \"\\]\"], [\"$$\", \"$$\"]] }, \"options\": { \"enableMenu\": false }"
{{< /multiconfig >}}

### Page's Frontmatter

Usually you don't need to redefine the global initialization settings for a single page. But if you do, you have repeat all the values from your global configuration you want to keep for a single page as well.

Eg. If you have redefined the delimiters to something exotic like `@` symbols in your global config, but want to additionally align your math to the left for a specific page, you have to put this to your frontmatter:

{{< multiconfig fm=true >}}
mathJaxInitialize = "{ \"chtml\": { \"displayAlign\": \"left\" }, { \"tex\": { \"inlineMath\": [[\"\\(\", \"\\)\"], [\"@\", \"@\"]], displayMath: [[\"\\[\", \"\\]\"], [\"@@\", \"@@\"]] }, \"options\": { \"enableMenu\": false }"
{{< /multiconfig >}}

### Passthrough Configuration

You can use your math without enclosing it in a shortcode or Markdown codefence by using a [passthrough configuration](https://gohugo.io/content-management/mathematics/#step-1) in your `hugo.toml`:

{{< multiconfig file=hugo >}}
[markup]
  [markup.goldmark]
    [markup.goldmark.extensions]
      [markup.goldmark.extensions.passthrough]
        enable = true
        [markup.goldmark.extensions.passthrough.delimiters]
          inline = [['\(', '\)'], ['$',  '$']]
          block  = [['\[', '\]'], ['$$', '$$']]
{{< /multiconfig >}}

In this case you have to tell the theme that your page contains math by setting this in your page's frontmatter:

{{< multiconfig fm=true >}}
disableMathJax = false
{{< /multiconfig >}}

See the [example](#passthrough) on how it makes using math really easy.

## Examples

### Inline Math

````md
Inline math is generated if you use a single `$` as a delimiter around your formulae: {{</* math */>}}$\sqrt{3}${{</* /math */>}}
````

Inline math is generated if you use a single `$` as a delimiter around your formulae: {{< math >}}$\sqrt{3}${{< /math >}}

### Blocklevel Math with Right Alignment

````md
If you delimit your formulae by two consecutive `$$` it generates a new block.

{{</* math align="right" */>}}
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
{{</* /math */>}}
````

If you delimit your formulae by two consecutive `$$` it generates a new block.

{{< math align="right" >}}
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
{{< /math >}}

### Markdown Codefence

You can also use Markdown codefences.

````md
```math
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
```
````

````math
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
````

### Passthrough

This works for block as well as inline math but is only available if you are using the [passthrough configuration](#passthrough-configuration).

With passthrough configuration you can just drop your math without enclosed by shortcodes or Markdown codefences but no settings from the [parameter table](#parameter) are available.

````md
$$\left|
\begin{array}{cc}
a & b \\
c & d
\end{array}\right|$$
````

$$\left|
\begin{array}{cc}
a & b \\
c & d
\end{array}\right|$$

### Chemical Formulae

````md
{{</* math */>}}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
{{</* /math */>}}
`````

{{< math >}}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
{{< /math >}}
