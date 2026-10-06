+++
aliases = '/shortcodes/swagger'
categories = ['howto', 'reference']
description = 'UI for your OpenAPI / Swagger specifications'
frontmatter = ['openapi.errorlevel', 'openapi.force']
options = ['openapi.errorlevel', 'openapi.force']
title = 'OpenAPI'
+++

The `openapi` shortcode displays your OpenAPI / Swagger specifications using the [Swagger UI](https://github.com/swagger-api/swagger-ui) library.

## Usage

{{% multishortcode name="openapi" execute="false" %}}
src = "https://petstore3.openapi.io/api/v3/openapi.json"
{{% /multishortcode %}}

If you want to print out (or generate a PDF) from your OpenAPI documentation, don't initiate printing directly from the page because the elements are optimized for interactive usage in a browser.

Instead, open the [print preview](authoring/frontmatter/topbar) in your browser and initiate printing from that page. This page is optimized for reading and expands most of the available sections.

A specification that is a resource of your page or site is found by the search. A specification given by URL is loaded by the browser of your reader and is not.

### Parameters

| Name                 | Default          | Notes       |
|----------------------|------------------|-------------|
| **src**              | _&lt;empty&gt;_  | The path to the to the OpenAPI specification resource or URL to be used. Resource paths adhere to [Hugo's logical path](https://gohugo.io/methods/page/path/). |
| **lang**             | _&lt;empty&gt;_  | The language code used for the reading direction of the Swagger UI and for the texts the theme adds to it, like _Expand all_ and _Collapse all_. This must be one of the languages configured for your site. If not set, the language of the page is used. |

## Settings

### Enabling Link Warnings

{{% badge style=`option` %}}Option{{% /badge %}} {{% badge style=`frontmatter` %}}Front Matter{{% /badge %}} You can use `openapi.errorlevel` to control what should happen if a local OpenAPI specification link cannot be resolved to a resource.

If not set or empty, any unresolved link is written as given into the resulting output. If set to `warning` the same happens and an additional warning is printed in the built console. If set to `error` an error message is printed and the build is aborted.

Please note that this cannot resolve files inside of your `static` directory. The file must be a resource of the page or the site.

Link warnings are also available for [images & links](authoring/frontmatter/linking#enabling-link-and-image-link-warnings) and the [include](shortcodes/include#enabling-link-warnings) shortcode.

{{< multiconfig section=params >}}
openapi.errorlevel = 'warning'
{{< /multiconfig >}}

### Using a Different Version of the Swagger UI Library

The theme uses the shipped Swagger UI library by default.

In case you want to use a different version of the Swagger UI library, store its files as `assets/js/swagger-ui/swagger-ui-bundle.js`, `assets/js/swagger-ui/swagger-ui-standalone-preset.js` and `assets/css/swagger-ui/swagger-ui.css` in your site. They replace the shipped version.

### Force Loading of the Swagger UI Library

{{% badge style=`option` %}}Option{{% /badge %}} {{% badge style=`frontmatter` %}}Front Matter{{% /badge %}} The Swagger UI library will be loaded if the page contains an `openapi` shortcode or codefence.

You can force loading the Swagger UI library if no shortcode or codefence was used by setting `openapi.force=true`. If a shortcode or codefence was found, the option has no effect. This comes handy in case you are using scripting to render a spec.

{{< multiconfig section=params >}}
openapi.force = true
{{< /multiconfig >}}

### Setting a Specific Swagger UI Theme

The recommended way to configure your Swagger UI theme is to set the default value using the `--OPENAPI-theme` and `OPENAPI-CODE-theme` variable in your [color variant stylesheet](configuration/branding/generator). This allows your specs to look pretty when the user switches the color variant.

The theme uses Swaggers theming support. For `--OPENAPI-theme` the only allowed values are `light` or `dark`. For `--OPENAPI-CODE-theme` [the allowed values](https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/) are `agate`, `arta`, `monokai`, `nord`, `obsidian`, `tomorrow-night`, `idea`.

## Example

### Using Local File

{{% multishortcode name="openapi" %}}
src = "petstore.json"
{{% /multishortcode %}}
