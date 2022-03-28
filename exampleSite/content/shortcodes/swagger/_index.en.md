---
description: "Adds UI for your Swagger / OpenAPI Specifications"
title: "Swagger"
---

This shortcode uses the [RapiDoc](https://mrin9.github.io/RapiDoc) library to display your OpenAPI Specifications.

{{% notice note %}}
This only works in modern browsers.
{{% /notice %}}

## Configuration

Swagger is configured with default settings. You can customize Swagger's default settings for all of your files thru a JSON object in your `config.toml` or override these settings per page thru your pages frontmatter.

The JSON object of your `config.toml` / frontmatter is forwarded into Swagger's initialization. At the moment, only the `theme` setting is supported.

The `theme` setting can also be set by your used color variant. This will be the sitewide default and can - again - be overridden by your settings in `config.toml` or frontmatter.

### Example

````toml
[params]
  swaggerInitialize = "{ \"theme\": \"dark\" }"
````

## Usage

Just insert give the URL to your OpenAPI Specification like this:

````go
{{</* swagger src="https://petstore3.swagger.io/api/v3/openapi.json" */>}}
````

If your page is a leaf or branch bundle, you can also use relative URLs:

````go
{{</* swagger src="petstore.json" */>}}
````

The `src` parameter is mandatory and can be either an absolute or a relative URL.

## Example

{{< swagger src="petstore.json" >}}
