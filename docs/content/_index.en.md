+++
description = "A theme for Hugo designed for documentation."
title = "Hugo Relearn Theme"
type = "home"
[[cascade]]
	[cascade._target]
		path = "/introduction/changelog/*/*/*"
	[cascade.params]
		[cascade.params._build]
			render = "never"
+++
{{% replaceRE "https://mcshelby.github.io/hugo-theme-relearn/" "" %}}
{{< include "README.md" "true" >}}
{{% /replaceRE %}}