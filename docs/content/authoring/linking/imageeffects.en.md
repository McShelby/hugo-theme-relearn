+++
categories = ['explanation']
description = 'How to apply effects to your images'
frontmatter = ['imageEffects']
title = 'Image Effects'
weight = 3
+++

The theme offers [effects](authoring/markdown#image-effects) for your linked images.

You can [define additional custom image effects and set defaults](configuration/customization/imageeffects) in your configuration.

The default image effects shipped with the theme are

| Name          | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| border        | Draws a light thin border around the image                        |
| dataurl       | if the linked image points to a resource, it is converted to a base64 encoded dataurl |
| inlinecontent | if the linked image points to a SVG resource, the content will be used instead of an `<img>` element, this is useful for applying additional CSS styles to the elements inside of the SVG which is otherwise impossible |
| lazy          | Lets the image be lazy loaded                                     |
| lightbox      | The image will be clickable to show it enlarged                   |
| shadow        | Draws a shadow around the image to make it appear hovered/glowing |

One way to use them is to add them as URL query parameter to each individually linked image.

This can become cumbersome to be done consistently for the whole site. Instead, you can [configure the defaults](configuration/customization/imageeffects) in your `hugo.toml` as well as overriding these defaults in a page's front matter.

## Effect Priority

Image effects are applied in the following priority order (lowest to highest):

1. Built-in defaults
2. Site-wide configuration in `hugo.toml`
3. Page front matter configuration
4. URL query parameters
5. Template caller `attributes` parameter (highest priority)

Explicitly set URL query parameter will override the defaults set for a page or your site. When calling the image partial directly from templates, effects passed via the `attributes` parameter have the highest priority and will override all other settings.

If an effect accepts boolean values, only setting the parameter name without a value in the URL will set it to `true`.

Without any settings in your `hugo.toml` `imageEffects` defaults to

{{< multiconfig >}}
imageEffects.border = false
imageEffects.dataurl = false
imageEffects.inlinecontent = false
imageEffects.lazy = true
imageEffects.lightbox = true
imageEffects.shadow = false
{{< /multiconfig >}}

{{% badge style="frontmatter" %}}Front Matter{{% /badge %}} This can be overridden in a pages front matter for example by

{{< multiconfig fm=true section=params >}}
imageEffects.lazy = false
{{< /multiconfig >}}

Or by explicitly override settings by URL query parameter

````md {title="URL"}
![Minion](https://octodex.github.com/images/minion.png?lazy=true&lightbox=false)
````

The settings applied to the above image would be

{{< multiconfig >}}
imageEffects.border = true
imageEffects.dataurl = false
imageEffects.inlinecontent = false
imageEffects.lazy = true
imageEffects.lightbox = false
imageEffects.shadow = false
{{< /multiconfig >}}

## Template Usage

When calling the image partial directly from templates, you can pass effect preferences via the `attributes` parameter. Effect names can be prefixed with `no` to disable them.

````go {title="Template"}
{{- $attributes := dict "class" "nolightbox border" }}
{{ partial "shortcodes/image.html" (dict "page" . "url" "image.png" "attributes" $attributes) }}
````

This approach has the highest priority and will override all other effect settings, including URL query parameters. Effect classes are processed but not added to the final HTML `class` attribute. Non-effect classes pass through unchanged.

For example, `class = "nolightbox custom-img-class"` will disable the lightbox effect and add `custom-img-class` to the HTML output, but neither `lightbox` nor `nolightbox` will appear in the final class attribute.
