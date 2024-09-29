+++
description = "Changing the width of the sidebar"
title = "Width"
weight = 1
+++

The theme reacts to browser resizes and adjusts the menu width accordingly.

If you dislike the default behavior, you can link to a CSS stylesheet or change it in your `layouts/partials/custom-header.html`.

## Change the Menu Width

The menu width adjusts automatically for different screen sizes for the following screen sizes:

| Name | Screen Width  | Menu Width |
| ---- | ------------- | ---------- |
| S    | < 48rem       | 14.375rem  |
| M    | 48rem - 60rem | 14.375rem  |
| L    | >= 60rem      | 18.75rem   |

The values for the screen width breakpoints aren't configurable.

If you want to adjust the menu width you can define the following CSS variables. Note that `--MENU-WIDTH-S` applies to the menu flyout width in mobile mode for small screen sizes.

````html {title="layouts/partials/custom-header.html"}
<style>
:root {
    --MENU-WIDTH-S: 14.375rem;
    --MENU-WIDTH-M: 14.375rem;
    --MENU-WIDTH-L: 18.75rem;
}
</style>
````
