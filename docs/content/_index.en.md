+++
description = "A theme for Hugo designed for documentation."
title = "Hugo Relearn Theme"
type = "home"
[[cascade]]
	[cascade.target]
		path = "/introduction/changelog/*/*/*"
	[cascade.params]
		[cascade.params.build]
			render = "never"
+++
{{% replaceRE "https://mcshelby.github.io/hugo-theme-relearn/" "" %}}
{{< include "README.md" "true" >}}
{{% /replaceRE %}}