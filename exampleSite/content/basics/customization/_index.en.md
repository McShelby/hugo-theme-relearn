+++
title = "Customization"
weight = 25
+++

## Serving your page from a subfolder

If your site is served from a subfolder, eg. `https://example.com/mysite/`, you have to set the following lines to your `hugo.toml`

````toml
baseURL = "https://example.com/mysite/"
canonifyURLs = true
relativeURLs = true
````

Without `canonifyURLs=true` URLs in sublemental pages (like `sitemap.xml`, `rss.xml`) will be generated falsly while your HTML files will still work. See https://github.com/gohugoio/hugo/issues/5226.

## Serving your page from the filesystem

If you want your page served from the filesystem by using URLs starting with `file://` you'll need the following configuration in your `hugo.toml`:

````toml
relativeURLs = true
````

The theme will append an additional `index.html` to all page bundle links by default to make the page be servable from the file system. If you don't care about the file system and only serve your page via a webserver you can also generate the links without this change by adding this to your `hugo.toml`

````toml
[params]
  disableExplicitIndexURLs = true
````

{{% notice note %}}
If you want to use the search feature from the file system using an older installation of the theme make sure to change your outputformat for the homepage from the now deprecated `JSON` to `SEARCH` [as seen below](#activate-search).
{{% /notice %}}

## Activate search

If not already present, add the following lines in your `hugo.toml` file.

```toml
[outputs]
  home = ["HTML", "RSS", "SEARCH"]
```

This will generate a search index file at the root of your public folder ready to be consumed by the Lunr search library. Note that the `SEARCH` outputformat was named `JSON` in previous releases but was implemented differently. Although `JSON` still works, it is now deprecated.

### Activate dedicated search page

You can add a dedicated search page for your page by adding the `SEARCHPAGE` outputformat to your home page by adding the following lines in your `hugo.toml` file. This will cause Hugo to generate a new file `http://example.com/mysite/search.html`.

```toml
[outputs]
  home = ["HTML", "RSS", "SEARCH", "SEARCHPAGE"]
```

You can access this page by either clicking on the magnifier glass or by typing some search term and pressing `ENTER` inside of the menu's search box .

![Screenshot of the dedicated search page](search_page.png?&width=60pc)

{{% notice note %}}
To have Hugo create the dedicated search page successfully, you must not generate the URL `http://example.com/mysite/search.html` from your own content. This can happen if you set `uglyURLs=true` in your `hugo.toml` and defining a Markdown file `content/search.md`.

To make sure, there is no duplicate content for any given URL of your project, run `hugo --printPathWarnings`.
{{% /notice %}}

## Activate print support

You can activate print support to add the capability to print whole chapters or even the complete site. Just add the `PRINT` output format to your home, section and page in your `hugo.toml` as seen below:

```toml
[outputs]
  home = ["HTML", "RSS", "PRINT", "SEARCH"]
  section = ["HTML", "RSS", "PRINT"]
  page = ["HTML", "RSS", "PRINT"]
```

This will add a little printer icon in the top bar. It will switch the page to print preview when clicked. You can then send this page to the printer by using your browser's usual print functionality.

{{% notice note %}}
The resulting URL will not be [configured ugly](https://gohugo.io/templates/output-formats/#configure-output-formats) in terms of [Hugo's URL handling](https://gohugo.io/content-management/urls/#ugly-urls) even if you've set `uglyURLs=true` in your `hugo.toml`. This is due to the fact that for one mime type only one suffix can be configured.

Nevertheless, if you're unhappy with the resulting URLs you can manually redefine `outputFormats.PRINT` in your own `hugo.toml` to your liking.
{{% /notice %}}

## Home Button Configuration

If the `disableLandingPageButton` option is set to `false`, a Home button will appear
on the left menu. It is an alternative for clicking on the logo. To edit the
appearance, you will have to configure the `landingPageName` for the defined languages:

```toml
[languages]
[languages.en]
...
[languages.en.params]
landingPageName = "<i class='fas fa-home'></i> Home"
...
[languages.pir]
...
[languages.pir.params]
landingPageName = "<i class='fas fa-home'></i> Arrr! Homme"
...
```

If this option is not configured for a specific language, they will get their default values:

```toml
landingPageName = "<i class='fas fa-home'></i> Home"
```

The home button is going to look like this:

![Default Home Button](home_button_defaults.png?width=18.75rem)

## Social Media Meta Tags

You can add social media meta tags for the [Open Graph](https://gohugo.io/templates/internal/#open-graph) protocol and [Twitter Cards](https://gohugo.io/templates/internal/#twitter-cards) to your site. These are configured as mentioned in the Hugo docs.

## Change the Menu Width

The menu width adjusts automatically for different screen sizes.

| Name | Screen Width  | Menu Width |
| ---- | ------------- | ---------- |
| S    | < 48rem       | 14.375rem  |
| M    | 48rem - 60rem | 14.375rem  |
| L    | >= 60rem      | 18.75rem   |

The values for the screen width breakpoints aren't configurable.

If you want to adjust the menu width you can define the following CSS variables in your `custom-header.html`. Note that `--MENU-WIDTH-S` applies to the menu flyout width in mobile mode for small screen sizes.

````css
:root {
    --MENU-WIDTH-S: 14.375rem;
    --MENU-WIDTH-M: 14.375rem;
    --MENU-WIDTH-L: 18.75rem;
}
````

## Own Shortcodes with JavaScript Dependencies

Certain shortcodes make use of additional JavaScript files. The theme only loads these dependencies if the shortcode is used. To do so correctly the theme adds management code in various files.

You can you use this mechanism in your own shortcodes. Say you want to add a shortcode `myshortcode` that also requires the `jquery` JavaScript library.

1. Write the shortcode file `layouts/shortcodes/myshortcode.html` and add the following line

    ````go
   {{- .Page.Store.Set "hasMyShortcode" true }}
    ````

1. Add the following snippet to your `hugo.toml`

    ````go
    [params.relearn.dependencies]
      [params.relearn.dependencies.myshortcode]
        name = "MyShortcode"
        location = "footer"
    ````

1. Add the dependency loader file `layouts/partials/dependencies/myshortcode.html`. The loader file will be appended to your header or footer, dependend on the `location` setting in your `hugo.toml`.

    ````html
    <script src="https://www.unpkg.com/jquery/dist/jquery.js"></script>
    ````

Character casing is relevant!

- the `name` setting in your `hugo.toml` must match the key (that needs to be prefixed with a `has`) you used for the store in your `layouts/shortcodes/myshortcode.html`.
- the key on `params.relearn.dependencies` in your `hugo.toml` must match the base file name of your loader file.

See the `math`, `mermaid` and `openapi` shortcodes for examples.

## Output Formats

Certain parts of the theme can be changed for support of your own [output formats](https://gohugo.io/templates/output-formats/). Eg. if you define a new output format `PLAINTEXT` in your `hugo.toml`, you can add a file `layouts/partials/header.plaintext.html` to change the way, the page header should look like for that output format.

## React to Variant Switches in JavaScript

Once a color variant is fully loaded, either initially or by switching the color variant manually with the variant selector, the custom event `themeVariantLoaded` on the `document` will be dispatched. You can add an event listener and react to changes.

````javascript
document.addEventListener( 'themeVariantLoaded', function( e ){
  console.log( e.detail.variant ); // `relearn-light`
});
````

## Partials

The Relearn theme has been built to be as configurable as possible by defining multiple [partials](https://gohugo.io/templates/partials/)

In `themes/hugo-theme-relearn/layouts/partials/`, you will find all the partials defined for this theme. If you need to overwrite something, don't change the code directly. Instead [follow this page](https://gohugo.io/themes/customizing/). You'd create a new partial in the `layouts/partials` folder of your local project. This partial will have the priority.

This theme defines the following partials :

- `header.html`: the header of the page. See [output-formats](#output-formats)
- `footer.html`: the footer of the page. See [output-formats](#output-formats)
- `body.html`: the body of the page. The body may contain of one or many articles. See [output-formats](#output-formats)
- `article.html`: the output for a single article, can contain elements around your content. See [output-formats](#output-formats)
- `menu.html`: left menu. _Not meant to be overwritten_
- `search.html`: search box. _Not meant to be overwritten_
- `custom-header.html`: custom headers in page. Meant to be overwritten when adding CSS imports. Don't forget to include `style` HTML tag directive in your file.
- `custom-footer.html`:  custom footer in page. Meant to be overwritten when adding JavaScript. Don't forget to include `javascript` HTML tag directive in your file.
- `favicon.html`: the favicon
- `heading.html`: side-wide configuration to change the pages title headings.
- `heading-pre.html`: side-wide configuration to prepend to pages title headings. If you override this, it is your responsibility to take the page's `headingPre` setting into account.
- `heading-post.html`: side-wide configuration to append to pages title headings. If you override this, it is your responsibility to take the page's `headingPost` setting into account.
- `logo.html`: the logo, on top left hand corner
- `meta.html`: HTML meta tags, if you want to change default behavior
- `menu-pre.html`: side-wide configuration to prepend to menu items. If you override this, it is your responsibility to take the page's `menuPre` setting into account.
- `menu-post.html`: side-wide configuration to append to menu items. If you override this, it is your responsibility to take the page's `menuPost` setting into account.
- `menu-footer.html`: footer of the the left menu
- `toc.html`: table of contents
- `content.html`: the content page itself. This can be overridden if you want to display page's meta data above or below the content.
- `content-header.html`: header above the title, has a default implementation but you can overwrite it if you don't like it.
- `content-footer.html`: footer below the content, has a default implementation but you can overwrite it if you don't like it.
