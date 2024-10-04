+++
description = "How to configure heading anchors"
options = ["disableAnchorCopy", "disableAnchorScrolling"]
title = "Headings"
weight = 3
+++

Each heading may have an anchor link that is displayed when the heading is hovered.

The behavior what should happen if the anchor icon is clicked is configurable in your `hugo.toml`. By default all options are activated. If you deactivate all options, no link will be shown on hover.

{{< multiconfig file=hugo >}}
[params]
disableAnchorCopy = false
disableAnchorScrolling = false
{{< /multiconfig >}}

## Copy Anchor Links to Clipboard

If you set `params.disableAnchorCopy=true`, no anchor link will be copied to the clipboard when the anchor icon is pressed.

## Scroll to Heading

If you set `params.disableAnchorScrolling=true`, the page will not scroll to the beginning of the heading when the anchor icon is clicked.
