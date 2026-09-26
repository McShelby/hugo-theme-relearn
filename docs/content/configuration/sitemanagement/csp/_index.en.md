+++
categories = ['explanation', 'howto']
description = 'Serving your site with a strict Content Security Policy'
options = ['enableSubresourceIntegrity']
title = 'Content Security Policy'
weight = 10
+++

The theme writes no inline JavaScript. Its settings travel as JSON data blocks and all of its code comes from script files, so your site can be served with a strict [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP).

## Policy

This policy covers every feature of the theme except Mermaid

````http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; style-src-attr 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:
````

`style-src-attr 'unsafe-inline'` allows `style` attributes: the theme writes colors and image sizes given in your content as such, and Hugo colors highlighted code this way unless you [set `markup.highlight.noClasses=false`](configuration/branding/modules#change-syntax-highlighting). If none of this applies, you use no Mermaid and your [math output](shortcodes/math#output-of-the-formulae) is `mathml`, you can leave it out: Mermaid and the other math outputs write `style` attributes as well. Inline `<style>` elements stay forbidden; the theme writes none.

## What Needs More

- **Mermaid**: Mermaid writes its styles into inline `<style>` elements. Add `style-src-elem 'self' 'unsafe-inline'` - with `'self'` repeated, as it replaces `style-src` for all style elements.
- **Inlined SVGs**: an SVG shown with the [`inlinecontent` image effect](authoring/linking/imageeffects) brings its own `<style>` elements into the page, if it has any, and needs the same `style-src-elem`.
- **Libraries from elsewhere**: if you set `customMermaidURL` or `customOpenapiURL`, add their origin to `script-src`, and for Swagger UI to `style-src` as well.
- **Your own inline JavaScript**: a `javascript:` URL as the `href` of a [button](shortcodes/button), [card](shortcodes/card) or [topbar button](configuration/customization/topbar#button) is blocked. Give it an `action` instead and [handle that in a script file](shortcodes/button#button-with-own-action).

## Subresource Integrity

Set `enableSubresourceIntegrity=true` to have the theme add an [integrity hash](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to each script and stylesheet it links, including the search index and the stylesheets of the OpenAPI shortcode. A browser then refuses a file that changed after the build.

{{< multiconfig file=hugo section=params >}}
enableSubresourceIntegrity = true
{{< /multiconfig >}}

> [!warning] Not for the file system
> A browser can not check an integrity hash for a page opened from the file system and refuses the file instead, which leaves the page without any script or style. Keep this off if your site must work that way.
