# Version 9.3

## 9.3.0 (XXXX-XX-XX) {#9-3-0}

### Change

- {{% badge style="change" %}}Change{{% /badge %}} The borders of tables and the border of a zoomable Mermaid diagram, as well as the backgrounds of table headers and every second table row, now take their color from the [theme variant](configuration/branding/colors#modifying-variants) variable `BOX-NEUTRAL-color`, which inherits from `BOX-GREY-color`. Formerly they were a fixed gray that could not be changed by a variant and was too faint in the high contrast variants. The same goes for the border of tabs with `style=transparent`.

  The border of code blocks, `CODE-BLOCK-BORDER-color`, now inherits from `BOX-NEUTRAL-color` instead of `CODE-BLOCK-BG-color`. The shipped variants were adjusted to this.

  If your own variant does not set `CODE-BLOCK-BORDER-color`, its code blocks now get a visible border in the neutral color. As code boxes take their color from it, the title and frame of callouts and tabs with `style=code` change as well. To restore the previous look, set `CODE-BLOCK-BORDER-color` in your variant to the value of `CODE-BLOCK-BG-color`, or set `BOX-CODE-color` to only change code boxes.

  If your variant sets `BOX-NEUTRAL-color` or `BOX-GREY-color` to a strong color, your tables, Mermaid diagrams and transparent tabs now show it as well.
