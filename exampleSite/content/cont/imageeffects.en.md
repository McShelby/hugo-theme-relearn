+++
title = "Image Effects"
weight = 5
+++

The theme supports non-standard [image effects](cont/markdown#image-effects).

As described, you can add this to the URL query parameter, but this may be cumbersome to do it consistently for the whole page.

Instead, you can configure the defaults in your `hugo.toml` aswell as overriding these default in the pages frontmatter.

Explicitly set URL query parameter will override the defaults in effect for a page.

Without any settings in your `hugo.toml` this defaults to

````toml {title="hugo.toml"}
[params]
  [params.imageEffects]
    border = false
    lightbox = true
    shadow = false
````

This can be overridden in a pages frontmatter by eg.

````toml {title="frontmatter"}
+++
[imageEffects]
  border = true
+++
````

Or by explicitly override settings by URL query parameter

````markdown {title="URL"}
![Minion](https://octodex.github.com/images/minion.png?lightbox=false&bg-white=true)
````

The settings applied to the above image would be

````toml {title="Result"}
  border = true
  lightbox = false
  shadow = false
  bg-white = true
````

This ends up in the following HTML where the parameter are converted to CSS classes.

````html {title="HTML"}
<img src="https://octodex.github.com/images/minion.png?lightbox=false&bg-white=true" alt="Minion" class="bg-white border nolightbox noshadow">
````


## Extending

As you can see in the above example, the `bg-white` parameter is not initially supported in the themes default settings. Nevertheless you are free to define arbitrary parameter by just adding them to the URL query parameter or set them in your `hugo.toml` or pages frontmatter.

{{% notice note %}}
If no extended parameter like `bg-white` in the example is set on the URL, a `class="nobg-white"` in the HTML will only be generated if a default value was set in the `hugo.toml` or pages frontmatter.
{{% /notice %}}
