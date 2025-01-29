+++
categories = ["explanation", "howto"]
description = "How to extend image effects"
options = ["imageEffects"]
title = "Image Effects"
weight = 3
+++

This page shows you, how to configure custom [image effects](authoring/markdown#image-effects) on top of existing ones.

This setting can also [be overridden by your front matter](authoring/imageeffects).

If you don't configure anything in your `hugo.toml`, the image effects default to

## Default Values

{{< multiconfig >}}
[imageEffects]
  border = false
  lazy = true
  lightbox = true
  shadow = false
{{< /multiconfig >}}

## Configuration

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} You can change these settings in your `hugo.toml` and add arbitrary custom effects as boolean values (like `bg-white` in the below snippet).

{{< multiconfig file=hugo >}}
[params]
  [params.imageEffects]
    bg-white = true
    border = true
    lazy = false
{{< /multiconfig >}}

This would result in

{{< multiconfig >}}
[imageEffects]
  bg-white = true
  border = true
  lazy = false
  lightbox = true
  shadow = false
{{< /multiconfig >}}

### Example

With this configuration in effect, the following URL

````markdown {title="Markdown"}
![Minion](https://octodex.github.com/images/minion.png)
````

would result in

````html {title="HTML"}
<img src="https://octodex.github.com/images/minion.png" loading="lazy" alt="Minion" class="bg-white border nolazy lightbox noshadow">
````

## Styling Effects

If the resulting effect value is

- `true`: add a class with the effect's name
- `false`: add a class with the effect's name and a "no" prefix

Styles for default effects are contained in the theme. Add styles for your custom effects to `layouts/partials/content-header.html`.

For the above example you could add styles for both boolean cases:

````html {title="layouts/partials/content-header.html"}
<style>
img.bg-white {
  background-color: white;
}
img.nobg-white {
  background-color: transparent;
}
</style>
````
