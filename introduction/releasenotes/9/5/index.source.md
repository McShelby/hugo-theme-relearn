---
params:
  disableToc: false
  hidden: true
  minHugoVersion: 0.166.0
title: Version 9.5
type: releasenotes
weight: -5
---

## 9.5.0 (XXXX-XX-XX) {#9-5-0}

### Change

- {{% badge style="change" %}}Change{{% /badge %}} Your own [topbar elements](configuration/customization/topbar#defining-own-elements) now receive the parameters of their configuration as `element`, like the elements of the sidebar menus do. The area they are written into is available as `config`.

  If your element template reads a parameter like `.onwidths`, change it to `.element.onwidths`. Reading the parameters directly still works but is deprecated and will stop working with 10.0.0. Templates only reading `.page` don't need to be changed.

  If your templates call one of the theme's elements like `topbar/element/editbutton.html` themselves, pass its parameters as `element`. Parameters given next to `page` still work but issue a deprecation warning.

- {{% badge style="change" %}}Change{{% /badge %}} The `iconposition` parameter of the [`button` shortcode](shortcodes/button) is deprecated. The icon is always shown in front of the title.

  The parameter still works but issues a deprecation warning and will stop working with 10.0.0.

- {{% badge style="change" %}}Change{{% /badge %}} The [`math` shortcode](shortcodes/math) changes in preparation for 10.0.0. Each deprecated usage still works but issues a warning.

  The shortcode, codefence and partial take your formula without delimiters. Delimiters will be taken as part of your formula with 10.0.0. Remove the delimiters around your formula. If they were inline delimiters, set the new `displayMode` option of the shortcode or partial to `false` to keep your formula inline. A codefence always displays its formula as a block; for an inline formula, use the shortcode instead.

  The options of Hugo's `transform.ToMath` function moved from `math` to [`math.toMath`](shortcodes/math#providing-options-for-katex) in your project configuration and front matter. Options set directly in `math`, like `math.output`, will stop working with 10.0.0.

  Give `math.toMath.macros` as a list of name and definition pairs. Hugo lowercases the names of a map, so a macro containing uppercase letters can't be used by its name. A map still works but issues a warning.

- {{% badge style="change" %}}Change{{% /badge %}} The theme has updated its Mermaid dependency to 12.2.0, which changes how your graphs look. Many diagram types are drawn with Mermaid's new `neo` look and laid out by ELK, and the shipped [color variants](configuration/branding/colors#shipped-variants) now use the new `redux-color` and `redux-dark-color` Mermaid themes.

  To keep the previous appearance, set `--MERMAID-theme` back to `default` or `dark` in your [color variant](configuration/branding/colors#modifying-variants) and add `{ "look": "classic", "layout": "dagre" }` to your [Mermaid initialization options](shortcodes/mermaid#providing-initialization-options-for-the-mermaid-library).

### New

- {{% badge style="new" %}}New{{% /badge %}} The [image effects](authoring/linking/imageeffects) `height` and `width` can now be set in your project configuration or a page's front matter, to give all images of your site or page a default size.

- {{% badge style="new" %}}New{{% /badge %}} [Topbar buttons](configuration/customization/topbar#screen-widths-and-titles) can show their title next to their icon depending on the width of the screen, using the new options `titleonwidths`, `titleonwidthm` and `titleonwidthl`. The theme's buttons keep showing only their icon unless you set these options.

- {{% badge style="new" %}}New{{% /badge %}} With the updated Mermaid dependency, you can draw [use case diagrams](shortcodes/mermaid#use-case).
