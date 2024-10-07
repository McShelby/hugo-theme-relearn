+++
description = "Learn how to customize your site's colors, fonts, favicon, and logo"
options = ["themeVariant"]
title = "Branding"
weight = 1
+++

The Relearn theme offers color variants to change your site's appearance. Each color variant contains of a CSS file and optional settings in your `hugo.toml`.

You can use the pre-made variants, [customize them](#modifying-variants), or create your own. The [interactive variant generator](configuration/appearance/generator) can help you with this.

Once set up in `hugo.toml`, you can switch variants using the selector at the bottom of the menu.

## Changing the Variant

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Set the `themeVariant` option to change the variant.

The theme offers the recommended [advanced configuration mode](#theme-variant-advanced) that combines the functionality for [multiple variants](#multiple-variants), [OS setting adjustments](#adjust-to-os-settings), and more.

### Simple Setup {#theme-variant}

#### Single Variant

Set `themeVariant` to your theme CSS file name:

{{< multiconfig file=hugo >}}
[params]
  themeVariant = "relearn-light"
{{< /multiconfig >}}

Place your theme file in `assets/css` or `themes/hugo-theme-relearn/assets/css`. Name it `theme-*.css`.

In the above example, the path of your theme file must be `assets/css/theme-relearn-light.css` or `themes/hugo-theme-relearn/assets/css/theme-relearn-light.css`.

#### Multiple Variants

To let the reader choose between multiple variants, set `themeVariant` like this:

{{< multiconfig file=hugo >}}
[params]
  themeVariant = [ "relearn-light", "relearn-dark" ]
{{< /multiconfig >}}

The first variant is the default, and a selector will appear if there's more than one.

#### Adjust to OS Settings

Use the `auto` value to match OS light/dark settings. Usually it makes sense to set it in the first position and make it the default.

{{< multiconfig file=hugo >}}
[params]
  themeVariant = [ "auto", "red" ]
{{< /multiconfig >}}

If you don't configure anything else, the theme will default to use `relearn-light` for light mode and `relearn-dark` for dark mode.

Default is `relearn-light` for light and `relearn-dark` for dark mode. These defaults are overwritten by the first two non-auto options of your `themeVariant` array.

You can override the default with `themeVariantAuto`:

{{< multiconfig file=hugo >}}
[params]
  themeVariantAuto = [ "learn", "neon" ]
{{< /multiconfig >}}

### Advanced {#theme-variant-advanced}

The theme offers an advanced way to configure theme variants and all of the aspects above inside of a single configuration item. This comes with some features previously unsupported.

Like with the [multiple variants](#multiple-variants) option, you are defining your theme variants in an array but now _not by simple strings_ **but in a table with suboptions**.

Again, in this case, the first variant is the default chosen on first view and a variant selector will be shown in the menu footer if the array contains more than one entry.

{{< multiconfig file=hugo >}}
[params]
  themeVariant = [ "relearn-light", "relearn-dark" ]
{{< /multiconfig >}}

you now write it that way:

{{< multiconfig file=hugo >}}
[params]
  [[params.themeVariant]]
    identifier = "relearn-light"
  [[params.themeVariant]]
    identifier = "relearn-dark"
{{< /multiconfig >}}

The `identifier` option is mandatory and equivalent to the string in the first example. Further options can be configured, see the table below.

#### Parameter

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| identifier            | _&lt;empty&gt;_ | Must correspond to the name of a color variant either in your site's or the theme's directory in the form `assets/css/theme-<IDENTIFIER>.css`. |
| name                  | see notes       | The name to be displayed in the variant selector. If not set, the identifier is used in a human readable form. |
| auto                  | _&lt;empty&gt;_ | If set, the variant is treated as an [auto mode variant](#adjust-to-os-settings). It has the same behavior as the `themeVariantAuto` option. The first entry in the array is the color variant for light mode, the second for dark mode. Defining auto mode variants with the advanced options has the benefit that you can now have multiple auto mode variants instead of just one with the simple options. |

#### Example Configuration of This Site

{{< multiconfig file=hugo >}}
[params]
themeVariant = [
	{ identifier = "relearn-auto",  name = "Relearn Light/Dark", auto = [] },
	{ identifier = "relearn-light"  },
	{ identifier = "relearn-dark"   },
	{ identifier = "relearn-bright" },
	{ identifier = "zen-auto",      name = "Zen Light/Dark", auto = [ "zen-light", "zen-dark" ] },
	{ identifier = "zen-light"      },
	{ identifier = "zen-dark"       },
	{ identifier = "retro-auto",    name = "Retro Learn/Neon", auto = [ "learn", "neon" ] },
	{ identifier = "neon"           },
	{ identifier = "learn"          }
]
{{< /multiconfig >}}

## Advanced Topics

### Modifying Variants

In case you like a shipped variant but only want to tweak some aspects, you have some choices. **Don't edit the file in the theme's directory!** You will lose the ability to later easily upgrade your theme to a newer version.

1. Copy and change

    You can copy the shipped variant file from the theme's `themes/hugo-theme-relearn/assets/css` directory to the site's `assets/css` directory and either store it with the same name or give it a new name. Edit the settings and save the new file. Afterwards, you can use it in your `hugo.toml` by the chosen name.

2. Create and import

    You can create a new variant file in the site's `assets/css` directory and give it a new name. Import the shipped variant, add the settings you want to change and save the new file. Afterwards, you can use it in your `hugo.toml` by the chosen name.

    For example, you want to use the `relearn-light` variant but want to change the syntax highlighting schema to the one used in the `neon` variant. For that, create a new `assets/css/theme-my-branding.css` in your site's directory and add the following lines:

    ````css {title="assets/css/theme-my-branding.css"}
    @import "theme-relearn-light.css";

    :root {
      --CODE-theme: neon; /* name of the chroma stylesheet file */
      --CODE-BLOCK-color: rgba( 226, 228, 229, 1 ); /* fallback color for code text */
      --CODE-BLOCK-BG-color: rgba( 40, 42, 54, 1 ); /* fallback color for code background */
    }
    ````

    Afterwards, put this in your `hugo.toml` to use your new variant:

    {{< multiconfig file=hugo >}}
    [params]
      themeVariant = "my-branding"
    {{< /multiconfig >}}

    In comparison to _copy and change_, this has the advantage that you profit from any adjustments to the `relearn-light` variant while keeping your modifications.

### React to Variant Switches in JavaScript

Once a color variant is fully loaded, either initially or by switching the color variant manually with the variant selector, the custom event `themeVariantLoaded` on the `document` will be dispatched. You can add an event listener and react to changes.

````javascript {title="JavaScript"}
document.addEventListener( 'themeVariantLoaded', function( e ){
  console.log( e.detail.variant ); // `relearn-light`
});
````

## Change Syntax Highlighting

If you want to switch the syntax highlighting theme together with your color variant, first you need to configure your installation [according to Hugo's documentation](https://gohugo.io/content-management/syntax-highlighting/#generate-syntax-highlighter-css) to provide a syntax highlighting stylesheet file.

{{< multiconfig file=hugo >}}
markup.highlight.noClasses=false
{{< /multiconfig >}}

You can use one of the shipped stylesheet files or use Hugo to generate a file for you.

````shell
hugo gen chromastyles --style=monokai > chroma-mycode.css
````

The file must be written to `assets/css/chroma-<NAME>.css`. To use it with your color variant, you have to modify `--CODE-theme: <NAME>` in the color variant stylesheet file.

````css {title="assets/css/theme-my-branding.css"}
@import "theme-relearn-light.css";
:root {
  --CODE-theme: mycode; /* name of the chroma stylesheet file */
}
````

## Change 3rd-Party Libraries Theming

Some of the shipped shortcodes are using 3rd-party libraries. See the individual shortcode documentation on how to change their theming.

- [`mermaid` shortcode](shortcodes/mermaid#setting-a-specific-mermaid-theme)
- [`openapi` shortcode](shortcodes/openapi#setting-a-specific-swagger-ui-theme)

## Change the Favicon

If your favicon is an SVG, PNG, or ICO, just drop your image in your site's `static/images/` directory and name it `favicon.svg`, `favicon.png`, or `favicon.ico` respectively.

If you want to adjust your favicon according to your OS settings for light/dark mode, add the image files `static/images/favicon-light.svg` and `static/images/favicon-dark.svg` to your site's directory, respectively, corresponding to your file format. In case some of the files are missing, the theme falls back to `favicon.svg` for each missing file. All supplied favicons must be of the same file format.

If no favicon file is found, the theme will look up the alternative filename `logo` in the same location and will repeat the search for the list of supported file types.

If you need to change this default behavior, create a new file `layouts/partials/favicon.html` in your site's directory and write something like this:

````html {title="layouts/partials/favicon.html"}
<link rel="icon" href="/images/favicon.bmp" type="image/bmp">
````

## Change the Logo

Create a new file in `layouts/partials/logo.html` of your site. Then write any HTML you want. You could use an `img` HTML tag and reference an image, or you could paste an SVG definition!

The size of the logo will adapt automatically.
