+++
description = "All configuration options of the Relearn theme"
tags = ["reference"]
title = "Options Reference"
weight = 6
+++

You can set configuration options in your `hugo.toml`. On top of [Hugo's configuration options](https://gohugo.io/getting-started/configuration/#all-configuration-settings), you can use the following settings unique to the theme.

A configurable option is marked with {{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} badge throughout the documentation.

## Index

{{% taxonomy "options" "h3" %}}

## All config options

The values reflect example options. The defaults can be taken from the [annotated example](#annotated-config-options) below or the individual documentation.

{{< multiconfig file=hugo section=params >}}
{{% include "config/_default/params.toml" %}}
{{< /multiconfig >}}

## Annotated config options

````toml {title="hugo.toml"}
[params]
{{% include "config/_default/params.toml" %}}
````
