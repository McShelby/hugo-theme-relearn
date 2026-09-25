+++
categories = ['explanation', 'howto']
description = 'Serving your site with a strict Content Security Policy'
options = ['enableSubresourceIntegrity']
title = 'Content Security Policy'
weight = 10
+++

The theme writes no inline JavaScript. Its settings travel as JSON data blocks and all of its code comes from script files, so your site can be served with a strict [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP).

## Policy

This policy covers every feature of the theme except math

````http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:
````

`style-src` needs `'unsafe-inline'`, as the theme writes colors given to shortcodes as `style` attributes, and Mermaid and Swagger UI inject styles of their own.

## What Needs More

- **Math**: MathJax starts a worker from a `blob:` URL and loads its fonts from `https://cdn.jsdelivr.net`. Add `worker-src blob:` and `https://cdn.jsdelivr.net` to `font-src`.
- **Libraries from elsewhere**: if you set `customMathJaxURL`, `customMermaidURL` or `customOpenapiURL`, add their origin to `script-src`, and for Swagger UI to `style-src` as well.
- **Your own inline JavaScript**: a `javascript:` URL as the `href` of a [button](shortcodes/button), [card](shortcodes/card) or [topbar button](configuration/customization/topbar#button) is blocked. Give it an `action` instead and [handle that in a script file](shortcodes/button#button-with-own-action).

## Subresource Integrity

Set `enableSubresourceIntegrity=true` to have the theme add an [integrity hash](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to each script and stylesheet it links, including the search index and the stylesheets of the OpenAPI shortcode. A browser then refuses a file that changed after the build.

{{< multiconfig file=hugo section=params >}}
enableSubresourceIntegrity = true
{{< /multiconfig >}}

> [!warning] Not for the file system
> A browser can not check an integrity hash for a page opened from the file system and refuses the file instead, which leaves the page without any script or style. Keep this off if your site must work that way.
