+++
categories = ["explanation"]
description = "How to apply graphical effects to your images"
frontmatter = ["imageEffects"]
title = "Image Effects"
weight = 5
+++

The theme offers [graphical effects](authoring/markdown#image-effects) for your linked images.

You can [define additional custom image effects and set defaults](configuration/customization/imageeffects) in your configuration.

The default image effects shipped with the theme are

| Name     | Description                                                       |
| -------- | ----------------------------------------------------------------- |
| border   | Draws a light thin border around the image                        |
| lazy     | Lets the image be lazy loaded                                     |
| lightbox | The image will be clickable to show it enlarged                   |
| shadow   | Draws a shadow around the image to make it appear hovered/glowing |

One way to use them is to add them as URL query parameter to each individually linked image.

This can become cumbersome to be done consistently for the whole site. Instead, you can [configure the defaults](configuration/customization/imageeffects) in your `hugo.toml` as well as overriding these defaults in a page's front matter.

Explicitly set URL query parameter will override the defaults set for a page or your site.

Without any settings in your `hugo.toml` `imageEffects` defaults to

{{< multiconfig >}}
[imageEffects]
  border = false
  lazy = true
  lightbox = true
  shadow = false
{{< /multiconfig >}}

{{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} This can be overridden in a pages front matter for example by

{{< multiconfig fm=true >}}
[imageEffects]
  lazy = false
{{< /multiconfig >}}

Or by explicitly override settings by URL query parameter

````md {title="URL"}
![Minion](https://octodex.github.com/images/minion.png?lazy=true&lightbox=false)
````

The settings applied to the above image would be

{{< multiconfig >}}
border = true
lazy = true
lightbox = false
shadow = false
{{< /multiconfig >}}
