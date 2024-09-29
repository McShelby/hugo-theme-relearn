+++
description = "Changing the width the content area"
title = "Width"
weight = 1
+++

The theme reacts to browser resizes and adjusts the menu and content width accordingly.

If you dislike the default behavior, you can link to a CSS stylesheet or change it in your `layouts/partials/custom-header.html`.

## Change the Main Area's Max Width

By default the main area width will only grow to a certain extent if more vertical screen space is available. This is done for readability purposes as long lines are usually harder to read.

If you are unhappy with the default, you can define the following CSS variable and set the value to your liking. If you want to use all available space, select a really big value like `1000rem`;

````html {title="layouts/partials/custom-header.html"}
<style>
:root {
    --MAIN-WIDTH-MAX: 80.25rem;
}
</style>
````
