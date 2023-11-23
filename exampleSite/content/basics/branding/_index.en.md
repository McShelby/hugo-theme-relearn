+++
categories = ["custom", "theming"]
title = "Branding"
weight = 24
+++

The Relearn theme provides configuration options to change your your site's colors, favicon and logo. This allows you to easily align your site visuals to your desired style. Most of these options are exposed thru so called color variants.

A color variant lets you customize various visual effects of your site like almost any color, used fonts, color schemes of print, syntax highligtning, Mermaid and the OpenAPI shortcode, etc. It contains of a CSS file and optional configuration options in your `config.toml`.

The Relearn theme ships with a wide set of different color variants. You can use them as-is, copy them over and use them as a starting point for your customizations or just create completely new variants unique to your site. The [interactive variant generator](basics/generator) may help you with this task.

Once configured in your `config.toml`, you can select them with the variant selector at the bottom of the menu.

## Change the Variant (Simple) {#theme-variant}

### Single Variant

Set the `themeVariant` value to the name of your theme file. That's it! Your site will be displayed in this variant only.

````toml
[params]
  themeVariant = "relearn-light"
````

{{% notice note %}}
Your theme variant file must reside in your site's `static/css` directory or in the theme's `static/css` directory and the file name must start with `theme-` and end wit `.css`. In the above example, the path of your theme file must be `static/css/theme-relearn-light.css`.

If you want to make changes to a shipped color variant, create a copy in your site's `static/css` directory. Don't edit the file in the theme's directory!

{{% /notice %}}

### Multiple Variants

You can also set multiple variants. In this case, the first variant is the default chosen on first view and a variant selector will be shown in the menu footer if the array contains more than one entry.

````toml
[params]
  themeVariant = [ "relearn-light", "relearn-dark" ]
````

{{% notice tip %}}
The theme provides an advanced configuration mode, combining the functionality for multiple variants with the below possibilities of adjusting to your OS settings, logo and syntax highlightning and even more!

Although all options documented here are still working, the advanced configuration options are the recommended way to configure your color variants. [See below](#theme-variant-advanced).
{{% /notice %}}

## Adjust to OS Settings

You can also cause the site to adjust to your OS settings for light/dark mode. Just set the `themeVariant` to `auto` to become an auto mode variant. That's it.

You can use the `auto` value with the single or multiple variants option. If you are using multiple variants, you can drop `auto` at any position in the option's array, but usually it makes sense to set it in the first position and make it the default.

````toml
[params]
  themeVariant = [ "auto", "red" ]
````

If you don't configure anything else, the theme will default to use `relearn-light` for light mode and `relearn-dark` for dark mode. These defaults are overwritten by the first two non-auto options of your `themeVariant` option if present.

In the above example, you would end with `red` for light mode and the default of `relearn-dark` for dark mode.

If you don't like that behavior, you can explicitly set `themeVariantAuto`. The first entry in the array is the color variant for light mode, the second for dark mode.

````toml
[params]
  themeVariantAuto = [ "learn", "neon" ]
````

## Change the Favicon

If your favicon is a SVG, PNG or ICO, just drop your image in your site's `static/images/` directory and name it `favicon.svg`, `favicon.png` or `favicon.ico` respectively.

If you want to adjust your favicon according to your OS settings for light/dark mode, add the image files `static/images/favicon-light.svg` and `static/images/favicon-dark.svg` to your site's directory, respectively, corresponding to your file format. In case some of the files are missing, the theme falls back to `favicon.svg` for each missing file. All supplied favicons must be of the same file format.

If no favicon file is found, the theme will lookup the alternative filename `logo` in the same location and will repeat the search for the list of supported file types.

If you need to change this default behavior, create a new file `layouts/partials/favicon.html` in your site's directory and write something like this:

````html
<link rel="icon" href="/images/favicon.bmp" type="image/bmp">
````

## Change the Logo

Create a new file in `layouts/partials/logo.html` of your site. Then write any HTML you want. You could use an `img` HTML tag and reference an image created under the _static_ folder, or you could paste a SVG definition!

{{% notice note %}}
The size of the logo will adapt automatically.
{{% /notice %}}

## Syntax highlightning

If you want to switch the syntax highlighting theme together with your color variant, generate a syntax highlighting stylesheet and configure your installation [according to Hugo's documentation](https://gohugo.io/content-management/syntax-highlighting/). Then, `@import` the syntax highlightning stylesheet in your color variant stylesheet.

For an example, take a look into `theme-relearn-light.css` and `config.toml` of the exampleSite.

If you want to reconfigure just the syntax highlighting of an existing color variant, you need to copy the file to your site's directory and adjust it accordingly.

## Change the Variant (Advanced) {#theme-variant-advanced}

The theme offers a new way to configure theme variants and all of the aspects above inside of a single configuration item. This comes with some features previously unsupported.

Like with the [multiple variants](#multiple-variants) option, you are defining your theme variants in an array but now _not by simple strings_ **but in a table with suboptions**.

Again, in this case, the first variant is the default chosen on first view and a variant selector will be shown in the menu footer if the array contains more than one entry.

````toml
[params]
  themeVariant = [ "relearn-light", "relearn-dark" ]
````

you now write it that way:

````toml
[params]
  [[params.themeVariant]]
    identifier = "relearn-light"
  [[params.themeVariant]]
    identifier = "relearn-dark"
````

The `identifier` option is mandatory and equivalent to the string in the first example. Further options can be configured, see the table below.

### Parameter

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| identifier            | _&lt;empty&gt;_ | Must correspond to the name of a color variant either in your site's or the theme's directory in the form `static/css/theme-<IDENTIFIER>.css`. |
| name                  | see notes       | The name to be displayed in the variant selector. If not set, the identifier is used in a human readable form. |
| auto                  | _&lt;empty&gt;_ | If set, the variant is treated as an [auto mode variant](#adjust-to-os-settings). It has the same behavior as the `themeVariantAuto` option. The first entry in the array is the color variant for light mode, the second for dark mode. Defining auto mode variants with the advanced options has the benefit that you can now have multiple auto mode variants instead of just one with the simple options. |

### Example Configuration of This Site

````toml
[params]
  [[params.themeVariant]]
    identifier = "relearn-auto"
    name = "Relearn Light/Dark"
    auto = []
  [[params.themeVariant]]
    identifier = "relearn-light"
  [[params.themeVariant]]
    identifier = "relearn-dark"
  [[params.themeVariant]]
    identifier = "zen-auto"
    name = "Zen Light/Dark"
    auto = [ "zen-light", "zen-dark" ]
  [[params.themeVariant]]
    identifier = "zen-light"
  [[params.themeVariant]]
    identifier = "zen-dark"
  [[params.themeVariant]]
    identifier = "neon"
````
