+++
categories = ["custom", "theming"]
title = "Customization"
weight = 25
+++

The Relearn theme has been built to be as configurable as possible by defining multiple [partials](https://gohugo.io/templates/partials/)

In `themes/hugo-theme-relearn/layouts/partials/`, you will find all the partials defined for this theme. If you need to overwrite something, don't change the code directly. Instead [follow this page](https://gohugo.io/themes/customizing/). You'd create a new partial in the `layouts/partials` folder of your local project. This partial will have the priority.

This theme defines the following partials :

- `header.html`: the header of the page. See [output-formats](#output-formats)
- `footer.html`: the footer of the page. See [output-formats](#output-formats)
- `body.html`: the body of the page. The body may contain of one or many articles. See [output-formats](#output-formats)
- `article.html`: the output for a single article, can contain elements around your content. See [output-formats](#output-formats)
- `menu.html`: left menu. _Not meant to be overwritten_
- `search.html`: search box. _Not meant to be overwritten_
- `custom-header.html`: custom headers in page. Meant to be overwritten when adding CSS imports. Don't forget to include `style` HTML tag directive in your file.
- `custom-footer.html`:  custom footer in page. Meant to be overwritten when adding JavaScript. Don't forget to include `javascript` HTML tag directive in your file.
- `favicon.html`: the favicon
- `heading-pre.html`: side-wide configuration to prepend to pages title headings. If you override this, it is your responsibility to take the page's `headingPre` setting into account.
- `heading-post.html`: side-wide configuration to append to pages title headings. If you override this, it is your responsibility to take the page's `headingPost` setting into account.
- `logo.html`: the logo, on top left hand corner
- `meta.html`: HTML meta tags, if you want to change default behavior
- `menu-pre.html`: side-wide configuration to prepend to menu items. If you override this, it is your responsibility to take the page's `menuPre` setting into account.
- `menu-post.html`: side-wide configuration to append to menu items. If you override this, it is your responsibility to take the page's `menuPost` setting into account.
- `menu-footer.html`: footer of the the left menu
- `toc.html`: table of contents
- `content.html`: the content page itself. This can be overridden if you want to display page's meta data above or below the content.
- `content-header.html`: header above the title, has a default implementation but you can overwrite it if you don't like it.
- `content-footer.html`: footer below the content, has a default implementation but you can overwrite it if you don't like it.

## Change the Logo

Create a new file in `layouts/partials/` named `logo.html`. Then write any HTML you want.
You could use an `img` HTML tag and reference an image created under the _static_ folder, or you could paste a SVG definition!

{{% notice note %}}
The size of the logo will adapt automatically
{{% /notice %}}

## Change the Favicon

If your favicon is a SVG, PNG or ICO, just drop off your image in your local `static/images/` folder and name it `favicon.svg`, `favicon.png` or `favicon.ico` respectively.

Additionally, if you want your site to use light & dark theme favicons that follow the OS' (and in some cases, the browser's) color scheme, add the image files to your local `static/images/` folder and name them eg. `favicon-light.svg` and/or `favicon-dark.svg` respectively corresponding to your file format. In case one of the files is missing, the theme falls back to eg. `favicon.svg` for the missing file. All supplied favicons must be of the same file format.

{{% notice warning %}}
IE and old browser versions do not support [media queries](https://caniuse.com/css-media-interaction), which are necessary for the light & dark theme favicon option.
If you have requirements to support IE and/or older browser versions, use one of the other options.
{{% /notice %}}

If no favicon file is found, the theme will lookup the alternative filename `logo` in the same location and will repeat the search for the list of supported file types.

If you need to change this default behavior, create a new file in `layouts/partials/` named `favicon.html`. Then write something like this:

```html
<link rel="icon" href="/images/favicon.bmp" type="image/bmp">
```

## Change the Menu Width

The menu width adjusts automatically for different screen sizes.

| Name | Screen Width  | Menu Width |
| ---- | ------------- | ---------- |
| S    | < 48rem       | 0          |
| M    | 48rem - 60rem | 14.375rem  |
| L    | >= 60rem      | 18.75rem   |

The values for the screen width breakpoints aren't configurable.

If you want to adjust the menu width you can define the following CSS variables in your `custom-header.html`. Note that `--MENU-WIDTH-S` doesn't exist as the menu is always hidden for small screen sizes.

````css
:root {
    --MENU-WIDTH-M: 14.375rem;
    --MENU-WIDTH-L: 18.75rem;
}
````

## Change the Colors {#theme-variant}

The Relearn theme lets you choose between some predefined color variants in light or dark mode, but feel free to add one yourself!

You can preview the shipped variants by changing them in the variant selector at the bottom of the menu.

### Single Variant

Set the `themeVariant` value with the name of your theme file. That's it!

```toml
[params]
  themeVariant = "relearn-light"
```

In the above example your theme file has to be named `theme-relearn-light.css`

### Multiple Variants

You can also set multiple variants. In this case, the first variant is the default chosen on first view and a variant switch will be shown in the menu footer.

```toml
[params]
  # Change default color scheme with a variant one.
  themeVariant = [ "relearn-light", "relearn-dark" ]
```

{{% notice tip %}}
If you want to switch the syntax highlighting theme together with your color variant, generate a syntax highlighting stylesheet and configure your installation [according to Hugo's documentation](https://gohugo.io/content-management/syntax-highlighting/), and `@import` this stylesheet in your color variant stylesheet. For an example, take a look into `theme-relearn-light.css` and `config.toml` of the exampleSite.
{{% /notice %}}

### Adjust to OS Settings

You can also cause the site to adjust to your OS settings for light/dark mode. Just set the `themeVariant` to `auto`. That's it.

If you've set multiple variants, you can drop `auto` at any position, but usually it makes sense to set it in the first position and make it the default.

```toml
[params]
  themeVariant = [ "auto", "red" ]
```

If you don't configure anything else, the theme will use `relearn-light` for light mode and `relearn-dark` for dark mode.

If you don't like that, you can set `themeVariantAuto`. The first element is the variant for light mode, the second for dark mode

```toml
[params]
  themeVariantAuto = [ "learn", "neon" ]
```

{{% notice note %}}
This is not supported for Internet Explorer 11, which still displays in the `relearn-light` variant.
{{% /notice %}}


### JavaScript

Once a variant is fully loaded, either initially or by switching the variant manually with the variant selector, the custom event `themeVariantLoaded` on the `document` will be dispatched. You can add an event listener and react to changes.

````javascript
document.addEventListener( 'themeVariantLoaded', function( e ){
  console.log( e.detail.variant ); // `relearn-light`
});
````

### Roll your Own

If you are not happy with the shipped variants you can either copy and rename one of the shipped files from `themes/hugo-theme-relearn/static/css` to `static/css`, edit them afterwards to your liking in a text editor and configure the `themeVariant` parameter in your `config.toml` or just use the [interactive variant generator](basics/generator).

## Own Shortcodes with JavaScript Dependencies

Certain shortcodes make use of additional JavaScript files. The theme only loads these dependencies if the shortcode is used. To do so correctly the theme adds management code in various files. To provide this behavior to the user and extending it for his own shortcodes this can be configured.

Say you want to add a shortcode `myshortcode` that also requires the `jquery` JavaScript library.

1. Write the shortcode file `layouts/shortcodes/myshortcode.html` and add the following line

    ````go
   {{- .Store.Set "hasMyShortcode" true }}
    ````

1. Add the following snippet to your `config.toml`

    ````go
    [params.relearn.dependencies]
      [params.relearn.dependencies.myshortcode]
        name = "MyShortcode"
        location = "footer"
    ````

1. Add the dependency loader file `layouts/partials/dependencies/myshortcode.html`. The loader file will be appended to your header or footer, dependend on the `location` setting in your `config.toml`.

    ````html
    <script src="https://www.unpkg.com/jquery/dist/jquery.js"></script>
    ````

Character casing is relevant!

- the `name` setting in your `config.toml` must match the key (that needs to be prefixed with a `has`) you used for the store in your `layouts/shortcodes/myshortcode.html`.
- the key on `params.relearn.dependencies` in your `config.toml` must match the base file name of your loader file.

See the `math`, `mermaid` and `openapi` shortcodes for examples.

## Output Formats

Certain parts of the theme can be changed for support of your own [output formats](https://gohugo.io/templates/output-formats/). Eg. if you define a new output format `PLAINTEXT` in your `config.toml`, you can add a file `layouts/partials/header.plaintext.html` to change the way, the page header should look like for that output format.
