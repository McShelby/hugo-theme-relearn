+++
title = 'Version 8.3'
type = 'releasenotes'
weight = -3

[params]
  disableToc = false
  hidden = true
  minHugoVersion = '0.141.0'
+++

## 8.3.0 (2025-11-27) {#8-3-0}

### Hugo 0.141.0

- {{% badge style="hugo" %}}0.141.0{{% /badge %}} This release requires a newer Hugo version.

### Change

- {{% badge style="change" %}}Change{{% /badge %}} The [`children` shortcode](shortcodes/children) has changed the way it picks an image if displayed as card.

  The theme now uses the same mechanism as for picking the social media image - [which is done by Hugo itself](https://gohugo.io/templates/embedded/#configuration-open-graph). You may have to adjust the file name of your preview image accordingly.

### New

- {{% badge style="new" %}}New{{% /badge %}} The theme can now [check external links](authoring/frontmatter/linking#check-external-urls) for validity during build. No more stale links anymore.

  To activate it set `urlExternalCheck=true` in the your `hugo.toml` `params` section.

  The name of option `ignoreerror` was changed to `urlIgnoreError` in that matter. You can leave your config unchanged but will see warnings if you are using the deprecated name.

- {{% badge style="new" %}}New{{% /badge %}} The `tree` shortcode learned to also [format output of the `tree` terminal command](shortcodes/tree/#tree-command-output) of your favorite operating system.

- {{% badge style="new" %}}New{{% /badge %}} On mobile, the page title will be displayed in the breadcrumbs area.

- {{% badge style="new" %}}New{{% /badge %}} The buttons in the topbar, for the heading anchors, copying code and the reset Mermaid zoom were visually improved.

  Additionally there is a new style [`inline`](shortcodes/button#by-special-color), displaying items in the style of the code inline copy-to-clipboard buttons.

- {{% badge style="new" %}}New{{% /badge %}} The tooltips shown when copying code and links, and resetting the Mermaid zoom were revamped into toast that appear at the bottom of the page.
