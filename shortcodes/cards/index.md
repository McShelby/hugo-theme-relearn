# Cards

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

### Parameters

| Name                  | Default              | Notes       |
|-----------------------|----------------------|-------------|
| **columns**           | `3`                  | The number of columns in full width mode to display the cards in. Accepts values from `1` to `5`. Numbers are reduced when width gets smaller. |
| **template**          | `default`            | The template to be used to display all cards in the set. Can be overridden for each card.<br><br>- `default`: The standard layout<br>- `debug`: A debug layout helping you in development<br><br>See below how to [use your own templates](#card-templates). |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_      | Arbitrary number of cards defined with the [`card` sub-shortcode](#card-parameters). |

### Card Parameters

Each card of the set is defined with the `card` shortcode.

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **href**              | _&lt;empty&gt;_ | Either the destination URL for the card or JavaScript code to be executed on click. If this parameter is set, the card will hover on mouse over.<br><br>- if starting with `javascript:` all following text will be executed in your browser<br>- every other string will be interpreted as URL, you can use [link effects](authoring/markdown#link-effects) as well. |
| **action**            | _&lt;empty&gt;_ | Name of an action executed by your own script on click, without inline JavaScript. Use this instead of a JavaScript **href** if your site uses a strict [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP). If this parameter is set, the card will hover on mouse over. See [example](#card-with-own-action). |
| **image**             | _&lt;empty&gt;_ | URL to an image to be displayed at the start of the card. |
| **imagealt**          | _&lt;empty&gt;_ | Text alternative for the `image`, announced by a screen reader in place of the image.<br><br>Set it if the card shows nothing but its image, as the image is then the only thing left to name the card. Without it such a card falls back to the title of the page its `href` leads to, or to the `href` itself.<br><br>Leave it empty if the card also shows a title. The title names the card, so the image beside it is marked as decorative with an empty `alt` attribute. |
| **title**             | _&lt;empty&gt;_ | Arbitrary title for the card. |
| **template**          | `default`       | The template to be used to display the card. Overrides the **template** of the set.<br><br>- `default`: The standard layout<br>- `debug`: A debug layout helping you in development<br><br>See below how to [use your own templates](#card-templates). |
| **params**            | _&lt;empty&gt;_ | Arbitrary additional parameter for your template as string (JSON, TOML, YAML) or in a `dict`.<br><br>[See example below](#lots-of-cards-with-templates). |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_ | Arbitrary text to be displayed on the card. |

### Single Card

If you just want a single card, you can call the `card` shortcode standalone, without the enclosing `cards` shortcode.

{{% multishortcode name="card" %}}
- title: "High performance code"
  href: "https://example.com"
  content: |
    Awesome AI accelerated code

    ```c
    printf("Hello World!");
    ```
{{% /multishortcode %}}

## Card Templates

If you have advanced requirements to display your cards, you can place a card layout partial into `layouts/partials/card` that will be used for each single card.

For example, if you want to see debug output displaying the parameter the partial receives, you could set `template=debug` which will cause the partial `layouts/partials/cards/debug.html` to be called. The `debug` card template is shipped with the theme.

A card template will be called with all the [card parameters](#card-parameters). `href` and `image` are transformed into a form ready to be consumed.

## Examples

### Lots of Cards

If only an image is displayed, the full card will be used. As no title is left to name the card, describe the image with the `imagealt` parameter.

{{% multishortcode name="cards" %}}
content:
  - title: "Everything"
    image: "/images/magic.gif"
    href: "/images/magic.gif?download"
    content: |
      Image, title, text and href.

      You can also use image effects in your `href`. This card will download the image.
  - title: "Title and Text"
    content: "Just a title and a text. You can use any **Markdown** in the text"
  - title: "Title Only"
    content: ""
  - title: "Image and Title"
    image: "/images/magic.gif"
    content: ""
  - image: "/images/magic.gif"
    content: "Image and a text"
  - content: |
      Text only

      > [!note]
      > Because this content contains source code the copy-to-clipboard button will only be usable if `href` and `action` parameter are **not** set.

      ```c
      printf("Hello Code!");
      ```
  - image: "/images/magic.gif"
    imagealt: "A top hat with a rabbit peeking out"
    href: "/images/magic.gif?download"
    content: ""
{{% /multishortcode %}}

### Lots of Cards with Templates

The `debug` card template shows all parameter it receives.

The `C` card adds additional `params` for the template.

{{% multishortcode name="cards" %}}
template: "debug"
content:
  - title: "C"
    params: '{"blub":"bla"}'
    content: "For the connoisseur of programming."
  - title: "C++"
    content: "For the guys that can cope with syntax."
  - title: "C#"
    content: "For guys that need two destructors."
{{% /multishortcode %}}

### Card with Own Action

The card is written with a `data-button-action` attribute. Handle it in your `assets/js/custom.js`, which the theme [loads on every page](configuration/customization/extending#simple-solution).

{{% multishortcode name="card" execute="false" %}}
- title: "Shout it out"
  action: "shout"
  content: "Click to greet the world"
{{% /multishortcode %}}

````js {title="custom.js"}
document.addEventListener('click', function (event) {
  var button = event.target.closest('button[data-button-action="shout"]');
  if (button) {
    alert('Hello world!');
    button.blur();
  }
});
````
