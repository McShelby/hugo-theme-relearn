+++
description = "All configuration options of the Relearn theme"
tags = ["reference"]
title = "Options Reference"
weight = 6
+++

On top of [Hugo's global configuration options](https://gohugo.io/overview/configuration/), you can set further options unique to the theme in your `hugo.toml`.

This is the complete list of options supported by the theme.

See the [index](options/) for pointers to in-detail documentation.

## All config options

The values reflect example options. The defaults can be taken from the [annotated example](#annotated-config-options) below.

{{< multiconfig file=hugo section=params >}}
{{% include "config/_default/params.toml" %}}
{{< /multiconfig >}}

## Annotated config options

````toml {title="hugo.toml"}
[params]
{{% include "config/_default/params.toml" %}}
````
