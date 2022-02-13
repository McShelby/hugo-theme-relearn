+++
title = "Customization"
weight = 25
+++

The Relearn theme has been built to be as configurable as possible by defining multiple [partials](https://gohugo.io/templates/partials/)

In `themes/hugo-theme-relearn/layouts/partials/`, you will find all the partials defined for this theme. If you need to overwrite something, don't change the code directly. Instead [follow this page](https://gohugo.io/themes/customizing/). You'd create a new partial in the `layouts/partials` folder of your local project. This partial will have the priority.

This theme defines the following partials :

- *content*: the content page itself. This can be overridden if you wan't to display page's meta data above or below the content.
- *header*: the header of the content page (contains the breadcrumbs). _Not meant to be overwritten_
- *custom-header*: custom headers in page. Meant to be overwritten when adding CSS imports. Don't forget to include `style` HTML tag directive in your file
- *footer*: the footer of the content page (contains the arrows). _Not meant to be overwritten_
- *custom-footer*:  custom footer in page. Meant to be overwritten when adding Javacript. Don't forget to include `javascript` HTML tag directive in your file
- *favicon*: the favicon
- *logo*: the logo, on top left hand corner.
- *meta*: HTML meta tags, if you want to change default behavior
- *menu*: left menu. _Not meant to be overwritten_
- *menu-pre*: side-wide configuration to prepend to menu items. If you override this, it is your responsiblity to take the page's `pre` setting into account.
- *menu-post*: side-wide configuration to append to menu items. If you override this, it is your responsiblity to take the page's `post` setting into account.
- *menu-footer*: footer of the the left menu
- *search*: search box
- *toc*: table of contents

## Change the logo

Create a new file in `layouts/partials/` named `logo.html`. Then write any HTML you want.
You could use an `img` HTML tag and reference an image created under the *static* folder, or you could paste a SVG definition!

{{% notice note %}}
The size of the logo will adapt automatically
{{% /notice %}}

## Change the favicon

If your favicon is a SVG, PNG or ICO, just drop off your image in your local `static/images/` folder and name it `favicon.svg`, `favicon.png` or `favicon.ico` respectivly.

If no favicon file is found, the theme will lookup the alternative filename `logo` in the same location and will repeat the search for the list of supported file types.

If you need to change this default behavior, create a new file in `layouts/partials/` named `favicon.html`. Then write something like this:

```html
<link rel="icon" href="/images/favicon.bmp" type="image/bmp" />
```

## Change default colors {#theme-variant}

The Relearn theme let you choose between some predefined color scheme variants, but feel free to add one yourself!

### Standard variant

```toml
[params]
  # Change default color scheme with a variant one. Can be empty, "red", "blue", "green" or an array like [ "blue", "green" ].
  themeVariant = ""
```

![Red variant](images/standard-variant.png?width=60pc)

### Red variant

```toml
[params]
  # Change default color scheme with a variant one. Can be empty, "red", "blue", "green" or an array like [ "blue", "green" ].
  themeVariant = "red"
```

![Red variant](images/red-variant.png?width=60pc)

### Blue variant

```toml
[params]
  # Change default color scheme with a variant one. Can be empty, "red", "blue", "green" or an array like [ "blue", "green" ].
  themeVariant = "blue"
```

![Blue variant](images/blue-variant.png?width=60pc)

### Green variant

```toml
[params]
  # Change default color scheme with a variant one. Can be empty, "red", "blue", "green" or an array like [ "blue", "green" ].
  themeVariant = "green"
```

![Green variant](images/green-variant.png?width=60pc)

### 'Mine‘ variant

First, create a new CSS file in your local `static/css` folder prefixed by `theme` (e.g. with _mine_ theme `static/css/theme-mine.css`). Copy the following content and modify colors in CSS variables.

```css
:root {
    --MAIN-TEXT-color: #101010; /* Color of text by default */
    --MAIN-TITLES-TEXT-color: #444753; /* Color of titles h2-h3-h4-h5-h6 */
    --MAIN-LINK-color: #486ac9; /* Color of links */
    --MAIN-LINK-HOVER-color: #134fbf; /* Color of hovered links */
    --MAIN-ANCHOR-color: #486ac9; /* color of anchors on titles */
    --MAIN-BG-color: #ffffff; /* color of text by default */

    /* adjusted to relearn-light chroma style */
    --CODE-BLOCK-color: #000000; /* fallback color for block code text */
    --CODE-BLOCK-BG-color: #f8f8f8; /* fallback color for block code background */
    --CODE-BLOCK-BORDER-color: #d8d8d8; /* color of block code border */

    --CODE-INLINE-color: #5e5e5e; /* color for inline code text */
    --CODE-INLINE-BG-color: #fffae9; /* color for inline code background */
    --CODE-INLINE-BORDER-color: #f8e8c8; /* color of inline code border */

    --MENU-HOME-LINK-color: #323232; /* Color of the home button text */
    --MENU-HOME-LINK-HOVER-color: #808080; /* Color of the hovered home button text */

    --MENU-HEADER-BG-color: #7dc903; /* Background color of menu header */
    --MENU-HEADER-BORDER-color: #7dc903; /*Color of menu header border */

    --MENU-SEARCH-color: #efefef; /* Color of search field text */
    --MENU-SEARCH-BG-color: #3d414d; /* Search field background color (by default borders + icons) */
    --MENU-SEARCH-BOX-color: #efefef; /* Override search field border color */

    --MENU-SECTIONS-ACTIVE-BG-color: #202028; /* Background color of the active section and its children */
    --MENU-SECTIONS-BG-color: #282830; /* Background color of other sections */
    --MENU-SECTIONS-LINK-color: #bababa; /* Color of links in menu */
    --MENU-SECTIONS-LINK-HOVER-color: #ffffff;  /* Color of links in menu, when hovered */
    --MENU-SECTION-ACTIVE-CATEGORY-color: #444444; /* Color of active category text */
    --MENU-SECTION-ACTIVE-CATEGORY-BG-color: #ffffff; /* Color of background for the active category (only) */

    --MENU-VISITED-color: #506397; /* Color of 'page visited' icons in menu */
    --MENU-SECTION-HR-color: #282830; /* Color of <hr> separator in menu */
}
```

Then, set the `themeVariant` value with the name of your custom theme file. That's it!

```toml
[params]
  # Change default color scheme with a variant one. Can be "red", "blue", "green" or an array like [ "blue", "green" ].
  themeVariant = "mine"
```

### Multiple variants

You can also set multiple variants. In this case, the first variant is the default choosen on first view and a theme selector will be shown in the menu footer.

```toml
[params]
  # Change default color scheme with a variant one. Can be empty, "red", "blue", "green"  or an array like [ "blue", "green" ].
  themeVariant = [ "red", "blue ]
```

