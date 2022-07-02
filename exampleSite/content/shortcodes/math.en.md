+++
description = "Beautiful math and chemical formulae"
title = "Math"
+++

The `math` shortcode generates beautiful formatted math and chemical formulae using the [MathJax](https://mathjax.org/) library.

{{< math >}}
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
{{< /math >}}

{{% notice note %}}
This only works in modern browsers.
{{% /notice %}}

## Usage

While the examples are using shortcodes with named parameter it is recommended to use codefences instead. This is because more and more other software supports Mermaid codefences (eg. GitHub) and so your markdown becomes more portable.

You are free to also call this shortcode from your own partials.

{{% notice note %}}
To use codefence syntax you have to turn off `guessSyntax` for the `markup.highlight` setting ([see the configuration section](#configuration)).
{{% /notice %}}

{{< tabs groupId="shortcode-parameter">}}
{{% tab name="codefence" %}}

````md
```math
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
```
````

{{% /tab %}}
{{% tab name="shortcode" %}}

````go
{{</* math */>}}
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
{{</* /math */>}}
````

{{% /tab %}}
{{% tab name="partial" %}}

````go
{{ partial "shortcodes/math.html" (dict
  "context" .
  "content" "$$left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$"
)}}

````

{{% /tab %}}
{{< /tabs >}}

### Parameter

Parameter are only supported when using shortcode or partial syntax. Defaults are used when using codefence syntax.

| Name                  | Default          | Notes       |
|:----------------------|:-----------------|:------------|
| **align**             | `center`         | Allowed values are `left`, `center` or `right`. |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_  | Your formuale. |

## Configuration

MathJax is configured with default settings. You can customize MathJax's default settings for all of your files thru a JSON object in your `config.toml` or override these settings per page thru your pages frontmatter.

The JSON object of your `config.toml` / frontmatter is forwarded into MathJax's configuration object.

See [MathJax documentation](https://docs.mathjax.org/en/latest/options/index.html) for all allowed settings.

{{% notice note %}}
To use codefence syntax you have to turn off `guessSyntax` for the `markup.highlight` setting.
{{% /notice %}}

### Global Configuration File

````toml
[params]
  mathJaxInitialize = "{ \"chtml\": { \"displayAlign\": \"left\" } }"

[markup]
  [markup.highlight]
    # if `guessSyntax = true`, there will be no unstyled code even if no language
    # was given BUT mermaid and math codefences will not work anymore! So this is a
    # mandatory setting for your site if you want to use math codefences
    guessSyntax = false
````

### Page's Frontmatter

````toml
+++
mathJaxInitialize = "{ \"chtml\": { \"displayAlign\": \"left\" } }"
+++
````

## Examples

### Inline Math

````md
Inline math is generated if you use a single `$` as a delimiter around your formulae: {{</* math */>}}$\sqrt{3}${{</* /math */>}}
````

Inline math is generated if you use a single `$` as a delimiter around your formulae: {{< math >}}$\sqrt{3}${{< /math >}}

### Blocklevel Math with Left Alignment

````md
If you delimit your formulae by two consecutive `$$` it generates a new block.

{{</* math align="left" */>}}
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
{{</* /math */>}}
````

If you delimit your formulae by two consecutive `$$` it generates a new block.

{{< math align="left" >}}
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
{{< /math >}}

### Codefence

You can also use codefences but without further parameter.

````md
```math
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
```
````

````math
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
````

### Chemical Formulae

````md
{{</* math */>}}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
{{</* /math */>}}
`````

{{< math >}}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
{{< /math >}}
