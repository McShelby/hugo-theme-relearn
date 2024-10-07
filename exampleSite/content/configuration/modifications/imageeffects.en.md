+++
description = "How to extend image effects"
options = ["imageEffects"]
title = "Custom Image Effects"
weight = 3
+++

This page shows you, how to configure custom [image effects](content/markdown#image-effects) on top of existing ones.

For a detailed usage example, see [this page](content/imageeffects).

If you don't configure anything in your `hugo.toml`, the image effects default to

{{< multiconfig >}}
[params]
  [params.imageEffects]
    border = false
    lazy = true
    lightbox = true
    shadow = false
{{< /multiconfig >}}

You can change these settings in your `hugo.toml`

{{< multiconfig file=hugo >}}
[params]
  [params.imageEffects]
    border = true
    lazy = false
{{< /multiconfig >}}

This would result in

{{< multiconfig >}}
[params]
  [params.imageEffects]
    border = true
    lazy = false
    lightbox = true
    shadow = false
{{< /multiconfig >}}

## Adding Custom Effects

You can add new effects with boolean values

{{< multiconfig file=hugo >}}
[params]
  [params.imageEffects]
    bg-white = true
{{< /multiconfig >}}

Result:

{{< multiconfig >}}
[params]
  [params.imageEffects]
    bg-white = true
    border = true
    lazy = false
    lightbox = true
    shadow = false
{{< /multiconfig >}}

## Styling Custom Effects

If the effective image effect value is

- `true`: add a class with the effect's name
- `false`: add a class with the effect's name and a "no" prefix

### Example

````markdown
![Minion](https://octodex.github.com/images/minion.png)
````

### Result

````html
<img src="https://octodex.github.com/images/minion.png" loading="lazy" alt="Minion" class="bg-white border nolazy lightbox noshadow">
````

Styles for default image effets are contained in the theme. Add custom styles for your extension image effects to `layouts/partials/content-header.html`.

In the above example you could add styles for both cases:

````css
img.bg-white {
  background-color: white;
}
img.nobg-white {
  background-color: transparent;
}
````
