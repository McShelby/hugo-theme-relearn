+++
description = "All configuration options of the Relearn theme"
tags = ["reference"]
title = "Options Reference"
weight = 6
+++

You can set configuration options in your `hugo.toml`.

On top of [Hugo's configuration options](https://gohugo.io/getting-started/configuration/#all-configuration-settings), you can use the additional theme settings listed below.

A configuration option provided by the theme is marked with a {{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} badge throughout the documentation.

You set each theme configuration option in the `params` section of your `hugo.toml`. For example, setting `math`

{{< multiconfig file=hugo >}}
[params]
  math = true
{{< /multiconfig >}}

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
