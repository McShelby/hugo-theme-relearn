+++
categories = ['howto', 'reference']
description = 'Show content in a card'
title = 'Card'
+++

Use the `card` shortcode to display content in a nice card.

{{% multishortcode name="card" print="false" %}}
- title: "High performance code"
  href: "https://example.com"
  content: |
    Awesome AI accelerated code

    ```python
    printf("Hello World!");
    ```
{{% /multishortcode %}}

## Usage

{{% multishortcode name="card" execute="false" %}}
- title: "High performance code"
  href: "https://example.com"
  content: |
    Awesome AI accelerated code

    ```c
    printf("Hello World!");
    ```
{{% /multishortcode %}}

If you want to show a set of cards grouped together you can wrap your cards into the [`cards` shortcode](shortcodes/cards).

### Parameters

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **href**              | _&lt;empty&gt;_ | Either the destination URL for the card or JavaScript code to be executed on click. If this parameter is set, the card will hover on mouse over.<br><br>- if starting with `javascript:` all following text will be executed in your browser<br>- every other string will be interpreted as URL, you can use [link effects](authoring/markdown#link-effects) as well. |
| **image**             | _&lt;empty&gt;_ | URL to an image to be displayed at the start of the card. |
| **title**             | _&lt;empty&gt;_ | Arbitrary title for the card. |
| **template**          | `default`       | The template to be used to display the card. <br><br>- `default`: The standard layout<br>- `debug`: A debug layout helping you in development<br><br>See below how to [use your own templates](#card-templates). |
| **params**            | _&lt;empty&gt;_ | Arbitrary additional parameter for your template as string (JSON, TOML, YAML) or in a `dict`.<br><br>[See example below](#debug-card-template-with-arbitrary-parameter). |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_ | Arbitrary text to be displayed on the card. |

## Card Templates

If you have advanced requirements to display your cards, you can place a card layout partial into `layouts/partials/card` that will be used for each single card.

For example, if you want to see debug output displaying the parameter the partial receives, you could set `template=debug` which will cause the partial `layouts/partials/debug.html` to be called. The `debug` card template is shipped with the theme.

A card template will be called with all the above parameter. `href` and `image` are transformed into a form ready to be consumed.

## Examples

### A Bit of Everything

{{% multishortcode name="card" %}}
- title: "Everything"
  image: "/images/magic.gif"
  href: "https://example.com"
  content: "Image, title and a text"
{{% /multishortcode %}}

### Just Text

Because the text contains source code with the copy-to-clipboard button, you are not allowed to use the `href` parameter or your layout may get messed up.

{{% multishortcode name="card" %}}
- content: |
    reallylongwordthatdoesnotwraparoundandbehaveslikeaprick

    ```c
    printf("Hello Code!");
    ```

    ---

    And a bullet list

    - blue
    - red
    - yellow
    - marshmallow
    - cardboard box
    - sandals
    - kumi ichi
    - random stuff
    - just made up
    - i guess i reached the end
    - really?
    - you can stop now
{{% /multishortcode %}}

### Image Only

If only an image is displayed, the full card will be used.

{{% multishortcode name="card" %}}
- image: "/images/magic.gif"
  content: ""
{{% /multishortcode %}}

### Debug Card Template with Arbitrary Parameter

Show all parameter for the card template with the custom `debug` card template.

Adds additional `params` for the template.

{{% multishortcode name="card" %}}
- template: "debug"
  params: '{"blub":"bla"}'
  content: ""
{{% /multishortcode %}}
