+++
description = "Test shortcodes inside of list items"
title = "Lists"
+++

## Plain

- one
- two
- two

  and a half

- three

## Attachments

- one
- two
- {{% attachments style="blue" /%}}

  {{% attachments style="blue" /%}}

- three

## Badge

- one
- two
- {{% badge color="fuchsia" icon="fab fa-hackerrank" %}}Awesome{{% /badge %}}&nbsp;

  {{% badge color="fuchsia" icon="fab fa-hackerrank" %}}Awesome{{% /badge %}}

- three

## Button

- one
- two
- {{% button href="https://gohugo.io/" style="warning" icon="dragon" %}}Get Hugo{{% /button %}}&nbsp;

  {{% button href="https://gohugo.io/" style="warning" icon="dragon" %}}Get Hugo{{% /button %}}

- three

## Children

- one
- two
- {{% children sort="weight" %}}

  {{% children sort="weight" %}}

- three

## Expand

- one
- two
- {{% expand title="Expand me..." %}}Thank you!{{% /expand %}}

  {{% expand title="Expand me..." %}}Thank you!{{% /expand %}}

- three

## Icon

- one
- two
- {{% icon icon="exclamation-triangle" %}}&nbsp;

  {{% icon icon="exclamation-triangle" %}}

- three

## Include

- one
- two
- {{% include file="shortcodes/INCLUDE_ME.md" %}}

  {{% include file="shortcodes/INCLUDE_ME.md" %}}

- three

## Math

- one
- two
- {{< math align="center" >}}
  $$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
  {{< /math >}}

  {{< math align="center" >}}
  $$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
  {{< /math >}}

- three

## Mermaid

- one
- two
- {{< mermaid align="center" zoom="true" >}}
  graph LR;
  If --> Then
  Then --> Else
  {{< /mermaid >}}

  {{< mermaid align="center" zoom="true" >}}
  graph LR;
  If --> Then
  Then --> Else
  {{< /mermaid >}}

- three

## Notice

- one
- two
- {{% notice style="primary" title="There may be pirates" icon="skull-crossbones" %}}
  It is all about the boxes.
  {{% /notice %}}

  {{% notice style="primary" title="There may be pirates" icon="skull-crossbones" %}}
  It is all about the boxes.
  {{% /notice %}}

- three

## Siteparam

- one
- two
- {{% siteparam name="editURL" %}}

  {{% siteparam name="editURL" %}}

- three

## Tabs

- one
- two
- {{< tabs >}}
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
  {{< /tabs >}}

  {{< tabs >}}
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
  {{< /tabs >}}

- three
