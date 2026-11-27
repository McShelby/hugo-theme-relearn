---
categories:
- howto
description: Create your own color variants and decorate them with effects
options:
- themeVariant
title: Custom Variants
weight: 3
---

Your own color variants are configured in the `themeVariant` option like the [shipped variants](configuration/branding/colors#shipped-variants). They can build on a shipped variant, change its settings and add [effects](#effects) to it.

## Modifying Variants

In case you like a shipped variant but only want to tweak some aspects, you have two choices. **Don't edit the file in the theme's directory!** You will lose the ability to later easily upgrade your theme to a newer version.

### Copy and Change

Copy the shipped variant file from the theme's `themes/hugo-theme-relearn/assets/css` directory to the site's `assets/css` directory and either store it with the same name or give it a new name. Edit the settings and save the new file. Afterwards, you can use it in your project configuration by the chosen name.

### Import and Change

Create a new variant file in the site's `assets/css` directory and give it a new name. Import the shipped variant, add the settings you want to change and save the new file. Afterwards, you can use it in your project configuration by the chosen name.

For example, you want to use the `relearn-light` variant but want to change its primary color to the one of your brand. For that, create a new `assets/css/theme-my-branding.css` in your site's directory and add the following lines:

````css {title="assets/css/theme-my-branding.css"}
@import "theme-relearn-light.css";

:root {
  --PRIMARY-color: rgba(0, 102, 204, 1); /* color of your brand */
  --PRIMARY-HOVER-color: rgba(0, 82, 163, 1); /* color of your brand when hovered */
}
````

Afterwards, put this in your project configuration to use your new variant:

{{< multiconfig file=hugo section=params >}}
themeVariant = 'my-branding'
{{< /multiconfig >}}

In comparison to _copy and change_, this has the advantage that you profit from any adjustments to the `relearn-light` variant while keeping your modifications.

## Imports

A variant can import other variants and effects in two ways, which can be mixed:

- with `@import` in its file `assets/css/theme-<IDENTIFIER>.css`, like `@import "theme-zen-dark.css";`
- with the `imports` [parameter](configuration/branding/colors#parameters) of the variant in your project configuration, like `imports = [ 'theme-zen-dark.css' ]`

Both name a file of your site's or the theme's `assets/css` directory, either a variant as `theme-<IDENTIFIER>.css` or an [effect](#effects) as `effect-<NAME>.css`. The files are imported in the given order, so a later one wins over an earlier one. A variant must not import itself, not even through other variants.

The entries of `imports` are taken as if they were written at the start of the variant's file, before its own imports and settings, also where another variant imports it. With `imports`, the variant's file is optional.

As an alternative to the example of [import and change](#import-and-change), you can keep only your settings in a file and leave the imports to the `imports` parameter. Such a file can bring your settings to several variants:

````css {title="assets/css/theme-my-branding.css"}
:root {
  --PRIMARY-color: rgba(0, 102, 204, 1); /* color of your brand */
  --PRIMARY-HOVER-color: rgba(0, 82, 163, 1); /* color of your brand when hovered */
}
````

The following `my-branding-light` and `my-branding-dark` apply your settings to `relearn-light` and `relearn-dark`, and don't need files of their own:

{{< multiconfig file=hugo section=params >}}
themeVariant = [
	{ identifier = 'my-branding-light', imports = [ 'theme-relearn-light.css', 'theme-my-branding.css' ] },
	{ identifier = 'my-branding-dark',  imports = [ 'theme-relearn-dark.css', 'theme-my-branding.css' ] }
]
{{< /multiconfig >}}

An [auto mode variant](configuration/branding/colors#adjust-to-os-settings) and a [scripted variant](configuration/branding/colors#scripted-variants) have no stylesheet of their own and can't have `imports`. Give them to their light and dark variant or to the variants their script chooses instead.

## Effects

Effects decorate a variant beyond its colors. They are shown on screen only and don't apply to print.

The theme ships with the following effects

| Name             | Notes       |
|------------------|-------------|
| `text-glowing`   | Makes titles, menu entries and boxes glow. Set `--TEXT-GLOWING-color` for the color of the glow, default is the text color. Made for dark variants. |
| `page-glowing`   | Lets a glow shine in from the edges of the screen. Set `--PAGE-GLOWING-color` for the color of the glow, default is the primary color. |
| `season-winter`  | Decorates the page with a winter scene of snow, trees, lights and a lantern. |
| `backdrop-faded` | Fades the scene behind the content towards the background color, to keep the content readable on top of a scene. Set `--BACKDROP-FADED-color` for the color, default is the background color of the content. |
| `backdrop-milky` | Lays milky glass over the scene behind the content, blurring it and fading it towards the background color. Set `--BACKDROP-MILKY-color` for the color, default is the background color of the content. |

See the effects in action with [Powder](configuration/branding/variants?variant=powder#effects) or [Winter Tome Dark](configuration/branding/variants?variant=tome-dark-winter#effects) of this documentation.

### Using Effects

To use an effect, create your own variant that imports a variant and the effects you want, one after the other. Effects sharing the first part of their name, like `backdrop-faded` and `backdrop-milky`, can't be combined; choose one of them.

For that, write the imports into the file of your variant

````css {title="assets/css/theme-my-winter.css"}
@import "theme-zen-dark.css";
@import "effect-season-winter.css";
@import "effect-backdrop-faded.css";
````

and put this in your project configuration to use your new variant:

{{< multiconfig file=hugo section=params >}}
themeVariant = 'my-winter'
{{< /multiconfig >}}

Instead, you can list them in the [`imports`](#imports) parameter of your variant. As your variant is made of nothing but imports, it then doesn't need a file:

{{< multiconfig file=hugo section=params >}}
themeVariant = [
	{ identifier = 'my-winter', imports = [ 'theme-zen-dark.css', 'effect-season-winter.css', 'effect-backdrop-faded.css' ] }
]
{{< /multiconfig >}}

### Writing Your Own Effect

You can write your own effect as `assets/css/effect-<NAME>.css`. An effect can't import other files. Files it refers to with `url()` must be placed in your `assets` directory and given relative to the effect, like `url('../images/my-effect/snow.svg')`. Wrap its rules as shown for [screen-only rules](#screen-only-rules).

## Screen-only Rules

The style rules of a variant also apply when it is used as a [print variant](configuration/branding/colors#theme-variant-print). If your variant contains style rules that are meant for the screen only, wrap them as follows. The print version of a page is shown on screen too, so `@media screen` alone is not enough.

````css {title="assets/css/theme-my-dark.css"}
:root:not([data-r-output-format='print']) {
  @media screen {
    h1 {
      text-shadow: 0 0 4px rgba( 255, 255, 255, 1 ); /* a glow, only for the screen */
    }
  }
}
````

## Non-standard Modifications

You may feel tempted to add further modifications besides just setting CSS variables in your custom variant stylesheet.

While this is possible, please note that due to the way the theme uses the variant files, the following will not work:

- `@font-face` rules - they need to be moved to `assets/css/fonts.css`, `assets/css/custom.css` or `layouts/partials/custom-header.html`
- rules selecting the `html` element - replace `html` with `:root`
