---
description: "UI for your Swagger / OpenAPI Specifications"
title: "Swagger"
---

This shortcode uses the [RapiDoc](https://mrin9.github.io/RapiDoc) library to display your Swagger / OpenAPI Specifications.

{{% notice note %}}
This only works in modern browsers.
{{% /notice %}}

## Usage

While the examples are using shortcodes with named parameter you are free to also call this shortcode from your own partials.

{{< tabs groupId="shortcode-parameter">}}
{{% tab name="shortcode" %}}

````go
{{</* swagger src="https://petstore3.swagger.io/api/v3/openapi.json" */>}}
````

{{% /tab %}}
{{% tab name="partial" %}}

````go
{{ partial "shortcodes/swagger.html" (dict
  "context" .
  "src" "https://petstore3.swagger.io/api/v3/openapi.json"
)}}
````

{{% /tab %}}
{{< /tabs >}}

### Parameter

| Name                 | Default          | Notes       |
|:---------------------|:-----------------|:------------|
| **src**              | _&lt;empty&gt;_  | The URL to the OpenAPI Specification file. This can be relative to the URL of your page if it is a leaf or branch bundle. |

## Configuration

Swagger is configured with default settings. You can customize Swagger's default settings for all of your files thru a JSON object in your `config.toml` or override these settings per page thru your pages frontmatter.

The JSON object of your `config.toml` / frontmatter is forwarded into Swagger's initialization. At the moment, only the `theme` setting is supported.

The `theme` setting can also be set by your used color variant. This will be the sitewide default and can - again - be overridden by your settings in `config.toml` or frontmatter.

### Global Configuration File

````toml
[params]
  swaggerInitialize = "{ \"theme\": \"dark\" }"
````

## Example

### Using Local File

````go
{{</* swagger src="petstore.json" */>}}
````

{{< swagger src="petstore.json" >}}
