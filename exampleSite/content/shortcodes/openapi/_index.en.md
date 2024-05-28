---
description: "UI for your OpenAPI / Swagger specifications"
title: "OpenAPI"
---

The `openapi` shortcode uses the [Swagger UI](https://github.com/swagger-api/swagger-ui) library to display your OpenAPI / Swagger specifications.

## Usage

While the examples are using shortcodes with named parameter you are free to also call this shortcode from your own partials.

{{< tabs groupid="shortcode-parameter">}}
{{% tab title="shortcode" %}}

````go
{{</* openapi src="https://petstore3.openapi.io/api/v3/openapi.json" */>}}
````

{{% /tab %}}
{{% tab title="partial" %}}

````go
{{ partial "shortcodes/openapi.html" (dict
  "page" .
  "src"  "https://petstore3.openapi.io/api/v3/openapi.json"
)}}
````

{{% /tab %}}
{{< /tabs >}}

### Parameter

| Name                 | Default          | Notes       |
|----------------------|------------------|-------------|
| **src**              | _&lt;empty&gt;_  | The path to the to the OpenAPI specification resource or URL to be used. Resource paths adhere to [Hugo's logical path](https://gohugo.io/methods/page/path/). |

{{% notice note %}}
If you want to print out (or generate a PDF) from your OpenAPI documentation, don't initiate printing directly from the page because the elements are optimized for interactive usage in a browser.

Instead, open the [print preview](basics/customization#activate-print-support) in your browser and initiate printing from that page. This page is optimized for reading and expands most of the available sections.
{{% /notice %}}

## Example

### Using Local File

````go
{{</* openapi src="petstore.json" */>}}
````

{{< openapi src="petstore.json" >}}
