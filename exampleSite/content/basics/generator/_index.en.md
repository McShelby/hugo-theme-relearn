+++
title = "Stylesheet generator"
weight = 26
hidden = true
+++

This interactive tool may help you to generate your own color variant stylesheet.

To get started, first select a color variant from the theme selector that fits you best as a starting point.

The graph is interactive and reflect the current colors. You can click on any of the colored boxes to adjust the respective color. The graph and the page will update accordingly.

The arrowed lines reflect how colors are inherited thru different parts of the theme if the descendent isn't overwritten. If you want to delete a color and let it inherit from its parent, just delete the value from the input field.

This is best seen in the `neon` variant with the differnet headings colors. There, colors for the heading `h1`, `h2`, `h3` and `h4` are explicitly set. `h5` is not set and inherits its value from `h4`. `h6` is also not set and inherits its value from `h5`.

## Variant generator

<div id="vargenerator" class="mermaid" style="background-color: var(--INTERNAL-MAIN-TEXT-color);" align="center">Graph</div>

<a class="vardownload btn btn-default">Download color variant</a>

<script>
variants.generator( '#vargenerator', '.vardownload' );
</script>
