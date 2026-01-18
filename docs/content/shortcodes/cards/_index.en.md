+++
categories = ['howto', 'reference']
description = 'Show content in a set of cards'
title = 'Cards'
+++

The `cards` shortcode displays your content in a grouped set of cards.

{{% multishortcode name="cards" print="false" %}}
content:
  - title: "Python Example"
    href: "https://example.com"
    content: |
      The AI native programming language.

      ```python
      print("Hello World!")
      ```
  - title: "Terminal Example"
    content: |
      For guys who like to tinker around.

      ```bash
      echo "Hello World!"
      ```
  - title: "C Example"
    content: |
      For the connoisseur of programming.

      ```c
      printf("Hello World!");
      ```
{{% /multishortcode %}}

## Usage

{{% multishortcode name="cards" execute="false" %}}
content:
  - title: "Python Example"
    href: "https://example.com"
    content: |
      The AI native programming language.

      ```python
      print("Hello World!")
      ```
  - title: "Terminal Example"
    content: |
      For guys who like to tinker around.

      ```bash
      echo "Hello World!"
      ```
  - title: "C Example"
    content: |
      For the connoisseur of programming.

      ```c
      printf("Hello World!");
      ```
{{% /multishortcode %}}

If you just want a single card you can instead call the [`card` shortcode](shortcodes/card) standalone.

Also follow the above link to see the parameter for each nested card.

### Parameters

| Name                  | Default              | Notes       |
|-----------------------|----------------------|-------------|
| **template**          | `default`            | The template to be used to display all cards in the set. Can be overridden for each card.<br><br>- `default`: The standard layout<br>- `debug`: A debug layout helping you in development<br><br>See the `card` shortcode how to [use your own templates](shortcodes/card#card-templates). |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_      | Arbitrary number of cards defined with the `card` sub-shortcode. |

## Examples

### Lots of Cards

{{% multishortcode name="cards" %}}
content:
  - title: "Python"
    content: "The AI native programming language."
  - title: "Terminal"
    content: "For guys who like to tinker around."
  - title: "C"
    content: "For the connoisseur of programming."
  - title: "C++"
    content: "For the guys that can cope with syntax."
  - title: "C#"
    content: "For guys that need two destructors."
{{% /multishortcode %}}

### Lots of Cards with Templates

{{% multishortcode name="cards" %}}
template: "debug"
content:
  - title: "Python"
    content: "The AI native programming language."
  - title: "Terminal"
    template: "default"
    content: "For guys who like to tinker around."
  - title: "C"
    content: "For the connoisseur of programming."
  - title: "C++"
    content: "For the guys that can cope with syntax."
  - title: "C#"
    content: "For guys that need two destructors."
{{% /multishortcode %}}
