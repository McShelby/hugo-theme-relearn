+++
description = "How to configure heading anchors"
options = ["disableAnchorCopy", "disableAnchorScrolling"]
title = "Headings"
weight = 2
+++

Each heading may have an anchor link that is displayed when the heading is hovered.

The behavior what should happen if the anchor icon is clicked is configurable in your `hugo.toml`. By default all of the following options are activated. If you deactivate all options, no anchor icon will be shown on hover.

## Copy Anchor Links to Clipboard

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} If you set `disableAnchorCopy=true`, no anchor link will be copied to the clipboard when the anchor icon is pressed.

## Scroll to Heading

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} If you set `disableAnchorScrolling=true`, the page will not scroll to the beginning of the heading when the anchor icon is clicked.
