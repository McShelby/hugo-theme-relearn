+++
description = "Testing different markdown constructs inside of tables"
title = "Tables"
+++

## Lines and Paragraphs

| i |
|---|
| <p>HTML Paragraph I</p><p>HTML Paragraph II</p> |

| i |
|---|
| HTML Line I<br>HTML Line II |

| i |
|---|
| HTML Line I<br><br>HTML Line II |

| i |
|---|
| Markdown Multicell I |
| Markdown Multicell II |

## Headings

| i |
|---|
| <h1>HTML h1</h1> |

| i |
|---|
| <h2>HTML h2</h2> |

| i |
|---|
| <h3>HTML h3</h3> |

| i |
|---|
| <h4>HTML h4</h4> |

| i |
|---|
| <h5>HTML h5</h5> |

| i |
|---|
| <h6>HTML h6</h6> |

## Lists

| i |
|---|
| <ul><li>HTML List Item I</li><li>HTML List Item II</li></ul> |

## Code

| i |
|---|
| `Markdown Inline` |

| i |
|---|
| <code>HTML Inline</code> |

| i |
|---|
| <pre><code>HTML Block</code></pre> |

## Links & Images

| i |
|---|
| [Markdown Link](https://example.com) |

| i |
|---|
| https://example.com |

| i |
|---|
| ![Spock](https://octodex.github.com/images/spocktocat.png?classes=shadow&width=24px) |

## Other

| i |
|---|
| <blockquote>HTML Blockquote</blockquote> |

| i |
|---|
| <blockquote><p>HTML Blockquote with nested Paragraph</p></blockquote> |

| i |
|---|
| <hr> |

## Shortcodes

| i |
|---|
| {{% badge %}}Important{{% /badge %}} |

| i |
|---|
| {{% button href="https://gohugo.io/" %}}Get Hugo{{% /button %}} |

| i |
|---|
| {{% expand title="Expand me..." %}}Thank you!{{% /expand %}} |

| i |
|---|
| {{% icon heart %}} |

| i |
|---|
| {{% include file="/shortcodes/INCLUDE_ME.md" %}} |

| i |
|---|
| {{< math align="center" >}}
$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
{{< /math >}} |

| i |
|---|
| {{< math >}}$\sqrt{3}${{< /math >}} |

| i |
|---|
| {{< mermaid align="center" >}}
graph LR;
    If --> Then
    Then --> Else
{{< /mermaid >}} |

| i |
|---|
| {{% siteparam name="editURL" %}} |


| i |
|---|
| {{< tabs >}}
{{% tab title="python" %}}
```python
print("Hello World!")
```
{{% /tab %}}
{{% tab title="bash" %}}
```bash
echo "Hello World!"
```
{{% /tab %}}
{{< /tabs >}} |
