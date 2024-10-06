+++
description = "Add further code to your site"
title = "Extending HTML"
weight = 2
+++

One of the most commonly asked questions is, how to add additional CSS styles or JavaScript.

This depends on your use case.

## Adding JavaScript or Stylesheets Unconditionally

If you simply want to add additional JavaScript files or CSS stylesheets on every page of your site, you can do so by either adding them in your `layouts/partials/custom-header.html` or `layouts/partials/custom-footer.html` partial.

Sometimes this just bloats up your site when only in a few cases those files are really needed. See the [next section](#own-shortcodes-with-dependencies), on how to conditionally add such dependencies.

## Own Shortcodes with Dependencies

Certain shortcodes make use of additional dependencies like JavaScript and CSS files. The theme only loads these dependencies if the shortcode is used. To do so correctly the theme adds management code in various files.

You can you use this mechanism in your own shortcodes. Say you want to add a shortcode `myshortcode` that also requires the `jquery` JavaScript library.

1. Write the shortcode file `layouts/shortcodes/myshortcode.html` and add the following line

    ````go {title="layouts/shortcodes/myshortcode.html"}
   {{- .Page.Store.Set "hasMyShortcode" true }}
    ````

1. Add the following snippet to your `hugo.toml`

    {{< multiconfig file=hugo >}}
    [params.relearn.dependencies]
      [params.relearn.dependencies.myshortcode]
        name = "MyShortcode"
    {{< /multiconfig >}}

1. Add the dependency loader file `layouts/partials/dependencies/myshortcode.html`. The loader file will be called from multiple locations inside of the theme with the parameter `page` containing the current [page](https://gohugo.io/methods/page/) variable and `location` with one of the currently defined locations

    * `header`: if called at the end of the HTML `head` element
    * `footer`: if called at the end of the HTML `body` element

    ````go {title="layouts/partials/dependencies/myshortcode.html"}
    {{- if eq .location "footer" }}
      <script src="https://www.unpkg.com/jquery/dist/jquery.js"></script>
    {{- end }}
    ````

Character casing is relevant!

- the `name` setting in your `hugo.toml` must match the key (that needs to be prefixed with a `has`) you used for the store in your `layouts/shortcodes/myshortcode.html`.
- the key on `params.relearn.dependencies` in your `hugo.toml` must match the base file name of your loader file.

See the `math`, `mermaid` and `openapi` shortcodes for examples.

{{% notice note %}}
If you are really into customization of the theme and want to use the dependency loader for your own locations, you can do this by simply calling it from inside of your overriden partials

````go
{{- partial "dependencies.gotmpl" (dict "page" . "location" "mylocation") }}
````

{{% /notice %}}
