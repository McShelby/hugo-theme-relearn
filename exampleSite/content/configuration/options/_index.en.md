+++
description = "All configuration options of the Relearn theme"
tags = ["reference"]
title = "Options Reference"
weight = 6
+++

You can set configuration options in your `hugo.toml`.

A configurable option is marked with a {{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} badge throughout the documentation.

On top of [Hugo's configuration options](https://gohugo.io/getting-started/configuration/#all-configuration-settings), you can use the following settings unique to the theme.

## Index

{{% taxonomy "options" "h3" %}}

## All Configuration Options

The example reflect example values. The defaults can be taken from the [annotated example](#annotated-configuration-options) below or the individual documentation.

{{< multiconfig file=hugo section=params >}}
{{% include "config/_default/params.toml" %}}
{{< /multiconfig >}}

## Annotated Configuration Options

````toml {title="hugo.toml"}
[params]
{{% include "config/_default/params.toml" %}}
````
