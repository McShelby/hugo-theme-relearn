+++
categories = ['howto', 'reference']
description = 'Beautiful math and chemical formulae'
frontmatter = ['math', 'math.force', 'math.output']
options = ['math', 'math.force', 'math.output']
title = 'Math'
+++

The `math` shortcode renders complex math and chemical formulae using [Hugo's built-in KaTeX](https://gohugo.io/functions/transform/tomath/).

{{% multishortcode name="math" print="false" %}}
align: "center"
content: |

  $$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
{{% /multishortcode %}}

## Usage

{{% multishortcode name="math" execute="false" %}}
align: "center"
content: |

  $$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
{{% /multishortcode %}}

You can also use [pure Markdown](authoring/markdown#subscript-and-superscript) for writing simple math expressions.

Delimiters around your formulae require the [Passthrough configuration](#passthrough-configuration), as the theme finds your formulae by them. Passthrough syntax itself has limited features as it does not provide any of the below parameters besides **content**. Nevertheless, it is widely available in other Markdown parsers like GitHub and therefore is the recommended syntax for generating portable Markdown.

### Parameters

| Name                  | Default          | Notes       |
|-----------------------|------------------|-------------|
| **align**             | `center`         | The vertical alignment.<br><br>Allowed values are `left`, `center` or `right`. |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_  | Your formulae.<br><br>Enclose each formula in the block or inline delimiters of your [Passthrough configuration](#passthrough-configuration). Text outside of them is written as Markdown.<br><br>Without any delimiters, the whole content is one formula displayed as a block. |

## Settings

### Output of the Formulae

{{% badge style="option" %}}Option{{% /badge %}} {{% badge style="frontmatter" %}}Front Matter{{% /badge %}} By default, formulae are written as [MathML](https://developer.mozilla.org/docs/Web/MathML), which every current browser displays without any stylesheet or font of the theme. The display quality depends on the browser and the math fonts installed on your reader's system.

If you want your formulae to look the same in every browser, set `math.output` to `htmlAndMathml`. The theme then links the KaTeX stylesheet and fonts to every page containing math. The MathML is kept for screen readers. The value `html` omits it.

{{< multiconfig section=params >}}
math.output = 'htmlAndMathml'
{{< /multiconfig >}}

### Providing Options for KaTeX

{{% badge style="option" %}}Option{{% /badge %}} {{% badge style="frontmatter" %}}Front Matter{{% /badge %}} Besides `output`, you can set every option of [Hugo's `transform.ToMath` function](https://gohugo.io/functions/transform/tomath/#options) in `math`, for example your own macros.

Each option of your page's front matter overwrites the option of the same name of your configuration options.

{{< multiconfig section=params >}}
[math.macros]
  '\R' = '\mathbb{R}'
{{< /multiconfig >}}

A formula that KaTeX can not render is written as its source and reported as a warning in your build.

### Force Loading of the KaTeX Stylesheet

{{% badge style="option" %}}Option{{% /badge %}} {{% badge style="frontmatter" %}}Front Matter{{% /badge %}} If your [output](#output-of-the-formulae) needs the KaTeX stylesheet, it will be linked to your page if the page contains a `math` shortcode, Markdown codefence, Passthrough syntax or the partial is called from your templates.

If you write KaTeX's HTML by other means, you can force linking the stylesheet by setting `math.force=true`. If a formula was rendered, the option has no effect.

`math=true` does the same but can't be combined with other `math.*` options.

{{< multiconfig section=params >}}
math.force = true
{{< /multiconfig >}}

### Passthrough Configuration

The theme finds your formulae by the delimiters of Hugo's [Passthrough configuration](https://gohugo.io/content-management/mathematics/#step-1), so it is required if you use delimiters in any syntax. It also lets you write math without enclosing it in a shortcode or Markdown codefence.

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

[See the example](#examples) on how a Passthrough configurations makes using math really easy.

## Examples

### Block Math

In Passthrough default configuration, block math is generated if you use two consecutive `$$` as a delimiter around your formulae.

{{% multishortcode name="math" %}}
content: |
  $$\left|
  \begin{array}{cc}
  a & b \\
  c & d
  \end{array}\right|$$
{{% /multishortcode %}}

### Inline Math

In Passthrough default configuration, inline math is generated if you use a single `$` as a delimiter around your formulae.

{{% multishortcode name="math" formats="markdown-passthrough,shortcode,partial" format="Euclid already knew, %s is irrational." %}}
content: $\sqrt{2}$
{{% /multishortcode %}}

### Block Math with Right Alignment

With Passthrough syntax, only the [**content** parameter](#parameters) is available.

{{% multishortcode name="math" %}}
align: "right"
content: |

  $$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
{{% /multishortcode %}}

### Chemical Formulae

KaTeX can also render chemical formulae.

{{% multishortcode name="math" %}}
content: |

  $$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
{{% /multishortcode %}}
