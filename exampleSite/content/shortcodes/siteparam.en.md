+++
description = "Get value of site params"
title = "Site param"
+++

The `siteparam` shortcode prints values of site params.

## Usage

While the examples are using shortcodes with named parameter you are free to use positional aswell or call this shortcode from your own partials.

{{< tabs groupId="shortcode-parameter">}}
{{% tab name="shortcode" %}}


````go
{{%/* siteparam name="editURL" */%}}
````

{{% /tab %}}
{{% tab name="shortcode (positional)" %}}

````go
{{%/* siteparam "editURL" */%}}
````

{{% /tab %}}
{{% tab name="partial" %}}

````go
{{ partial "shortcodes/siteparam.html" (dict
  "context" .
  "name" "editURL"
)}}
````

{{% /tab %}}
{{< /tabs >}}

### Parameter

| Name                 | Position | Default          | Notes       |
|:---------------------|:---------|:-----------------|:------------|
| **name**             | 1        | _&lt;empty&gt;_  | The name of the site param to be displayed. |

## Examples

### `editURL` from `config.toml`

```go
`editURL` value: {{%/* siteparam name="editURL" */%}}
```

`editURL` value: {{% siteparam name="editURL" %}}
