+++
description = "How to configure colors, fonts, favicon and logo"
options = ["themeVariant"]
title = "Branding"
weight = 1
+++

The Relearn theme provides settings to change your site's colors, fonts, favicon and logo. These settings are bundled in so called color variants that are contained of a CSS file and optional configuration options in your `hugo.toml`.

The Relearn theme ships with a set of predefined color variants. You can use them as-is, copy them over and use them as a starting point for your customizations or just create completely new variants unique to your site. The [interactive variant generator](configuration/appearance/generator) may help you with this task.

Once configured in your `hugo.toml`, you can select them with the variant selector at the bottom of the menu.

## Change the Variant (Simple) {#theme-variant}

{{% notice tip %}}
The theme provides an advanced configuration mode, combining the functionality for multiple variants with the possibility of adjusting to your OS settings and syntax highlighting and even more!

Although all options documented here are still working, the advanced configuration options are the recommended way to configure your color variants. [See below](#theme-variant-advanced).
{{% /notice %}}

### Single Variant

Set the `themeVariant` value to the name of your theme CSS file. That's it! Your site will be displayed in this variant only.

{{< multiconfig file=hugo >}}
[params]
  themeVariant = "relearn-light"
{{< /multiconfig >}}

Your theme variant file must either reside in your site's `assets/css` directory or in the similar location of the theme at `themes/hugo-theme-relearn/assets/css`. The file name must start with `theme-` and end in `.css`.

In the above example, the path of your theme file must be `assets/css/theme-relearn-light.css` or `themes/hugo-theme-relearn/assets/css/theme-relearn-light.css`.

If you want to make changes to a shipped color variant, [see your choices below](#modify-shipped-variants).

### Multiple Variants

You can also set multiple variants. In this case, the first variant is the default chosen on first view and a variant selector will be shown in the menu footer if the array contains more than one entry.

{{< multiconfig file=hugo >}}
[params]
  themeVariant = [ "relearn-light", "relearn-dark" ]
{{< /multiconfig >}}

### Adjust to OS Settings

You can also cause the site to adjust to your OS settings for light/dark mode. Just set the `params.themeVariant` to `auto` to become an auto mode variant. That's it.

You can use the `auto` value with the single or multiple variants option. If you are using multiple variants, you can drop `auto` at any position in the option's array, but usually it makes sense to set it in the first position and make it the default.

{{< multiconfig file=hugo >}}
[params]
  themeVariant = [ "auto", "red" ]
{{< /multiconfig >}}

If you don't configure anything else, the theme will default to use `relearn-light` for light mode and `relearn-dark` for dark mode. These defaults are overwritten by the first two non-auto options of your `params.themeVariant` option if present.

In the above example, you would end with `red` for light mode and the default of `relearn-dark` for dark mode.

If you don't like that behavior, you can explicitly set `params.themeVariantAuto`. The first entry in the array is the color variant for light mode, the second for dark mode.

{{< multiconfig file=hugo >}}
[params]
  themeVariantAuto = [ "learn", "neon" ]
{{< /multiconfig >}}

## Change the Variant (Advanced) {#theme-variant-advanced}

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

### Parameter

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| identifier            | _&lt;empty&gt;_ | Must correspond to the name of a color variant either in your site's or the theme's directory in the form `assets/css/theme-<IDENTIFIER>.css`. |
| name                  | see notes       | The name to be displayed in the variant selector. If not set, the identifier is used in a human readable form. |
| auto                  | _&lt;empty&gt;_ | If set, the variant is treated as an [auto mode variant](#adjust-to-os-settings). It has the same behavior as the `themeVariantAuto` option. The first entry in the array is the color variant for light mode, the second for dark mode. Defining auto mode variants with the advanced options has the benefit that you can now have multiple auto mode variants instead of just one with the simple options. |

### Example Configuration of This Site

{{< multiconfig file=hugo >}}
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

## Advanced Variant Topics

### Modify Shipped Variants

In case you like a shipped variant but only want to tweak some aspects, you have some choices. **Don't edit the file in the theme's directory!** You will loose the ability to later easily upgrade your theme to a newer version.

1. Copy and change

    You can copy the shipped variant file from the theme's `themes/hugo-theme-relearn/assets/css` directory to the site's `assets/css` directory and either store it with the same name or give it a new name. Edit the settings and save the new file. Afterwards you can use it in your `hugo.toml` by the chosen name.

2. Create and import

    You can create a new variant file in the site's `assets/css` directory and give it a new name. Import the shipped variant, add the settings you want to change and save the new file. Afterwards you can use it in your `hugo.toml` by the chosen name.

    For example, you want to use the `relearn-light` variant but want to change the syntax highlighting schema to the one used in the `neon` variant. For that, create a new `assets/css/theme-my-branding.css` in your site's directory and add the following lines:

    ````css {title="assets/css/theme-my-branding.css"}
    @import "theme-relearn-light.css";

    :root {
      --CODE-theme: neon; /* name of the chroma stylesheet file */
      --CODE-BLOCK-color: rgba( 226, 228, 229, 1 ); /* fallback color for code text */
      --CODE-BLOCK-BG-color: rgba( 40, 42, 54, 1 ); /* fallback color for code background */
    }
    ````

    Afterwards put this in your `hugo.toml` to use your new variant:

    {{< multiconfig file=hugo >}}
    [params]
      themeVariant = "my-branding"
    {{< /multiconfig >}}

    In comparison to _copy and change_, this has the advantage that you profit from any adjustments to the `relearn-light` variant but keep your modifications.

### React to Variant Switches in JavaScript

Once a color variant is fully loaded, either initially or by switching the color variant manually with the variant selector, the custom event `themeVariantLoaded` on the `document` will be dispatched. You can add an event listener and react to changes.

````javascript
document.addEventListener( 'themeVariantLoaded', function( e ){
  console.log( e.detail.variant ); // `relearn-light`
});
````

## Change Syntax Highlighting

If you want to switch the syntax highlighting theme together with your color variant, first you need to configure your installation [according to Hugo's documentation](https://gohugo.io/content-management/syntax-highlighting/#generate-syntax-highlighter-css) to provide a syntax highlighting stylesheet file

{{< multiconfig file=hugo >}}
markup.highlight.noClasses=false
{{< /multiconfig >}}

You can use one of the shipped stylesheet files or use Hugo to generate a file for you

````shell
hugo gen chromastyles --style=monokai > chroma-mycode.css
````

The file must be written to `assets/css/chroma-<NAME>.css`. To use it with your color variant you have to modify `--CODE-theme: <NAME>` in the color variant stylesheet file

````css {title="assets/css/theme-my-branding.css"}
@import "theme-relearn-light.css";
:root {
  --CODE-theme: mycode; /* name of the chroma stylesheet file */
}
````

## Change 3rd-Party Libraries Theming

Some of the shipped shortcodes are using 3rd-party libraries. See the individual shortcode documentation on how to do this:

- [`mermaid` shortcode](shortcodes/mermaid#setting-a-specific-mermaid-theme)
- [`openapi` shortcode](shortcodes/openapi#setting-a-specific-swagger-ui-theme)

## Change the Favicon

If your favicon is a SVG, PNG or ICO, just drop your image in your site's `static/images/` directory and name it `favicon.svg`, `favicon.png` or `favicon.ico` respectively.

If you want to adjust your favicon according to your OS settings for light/dark mode, add the image files `static/images/favicon-light.svg` and `static/images/favicon-dark.svg` to your site's directory, respectively, corresponding to your file format. In case some of the files are missing, the theme falls back to `favicon.svg` for each missing file. All supplied favicons must be of the same file format.

If no favicon file is found, the theme will lookup the alternative filename `logo` in the same location and will repeat the search for the list of supported file types.

If you need to change this default behavior, create a new file `layouts/partials/favicon.html` in your site's directory and write something like this:

````html {title="layouts/partials/favicon.html"}
<link rel="icon" href="/images/favicon.bmp" type="image/bmp">
````

## Change the Logo

Create a new file in `layouts/partials/logo.html` of your site. Then write any HTML you want. You could use an `img` HTML tag and reference an image or you could paste a SVG definition!

The size of the logo will adapt automatically.
