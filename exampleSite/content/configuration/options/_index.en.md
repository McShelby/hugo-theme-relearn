+++
description = "All configuration options of the Relearn theme"
tags = ["reference"]
title = "Options Reference"
weight = 6
+++

On top of [Hugo's global configuration options](https://gohugo.io/overview/configuration/), you can set further options unique to the theme in your `hugo.toml`.

This is the complete list of theme options. Note that all these options are explained in detail in other sections of this documentation.

The values shown here, reflect the options active in this documentation. The default values can be taken from the [annotated example](#annotated-config-options) below.

## All config options

{{< multiconfig file=hugo >}}
[params]
{{% include "config/_default/params.toml" %}}
{{< /multiconfig >}}

## Annotated config options

````toml {title="hugo.toml"}
[params]
{{% include "config/_default/params.toml" %}}
````
