# Available Output Formats

The Relearn theme by default comes with templates for HTML and RSS for each page.

In addition you can configure the below formats.

If this is not enough, learn how to [create your own output formats](configuration/customization/outputformats).

## Print Support

Enable print support to print entire chapters or the whole site. Add the `print` output format to your home, section, and page in `hugo.toml`:

{{&lt; multiconfig file=hugo &gt;}}
[outputs]
  home = [&#39;html&#39;, &#39;rss&#39;, &#39;print&#39;]
  section = [&#39;html&#39;, &#39;rss&#39;, &#39;print&#39;]
  page = [&#39;html&#39;, &#39;rss&#39;, &#39;print&#39;]
{{&lt; /multiconfig &gt;}}

By default this adds a printer icon in the topbar but [can be deactived](authoring/frontmatter/topbar/#print-button). Clicking it switches to print preview, showing the page and its [visible subpages](configuration/content/hidden) in a printer-friendly format. Use your browser&#39;s print function to print or save as PDF.

The URL won&#39;t be [configured ugly](https://gohugo.io/templates/output-formats/#configure-output-formats) for [Hugo&#39;s URL handling](https://gohugo.io/content-management/urls/#ugly-urls), even with `uglyURLs=true` in `hugo.toml`. This is because each mime type can only have one suffix.

If you don&#39;t like the URLs, you can reconfigure `outputFormats.print` in your `hugo.toml` to something other than the default of:

{{&lt; multiconfig file=hugo &gt;}}
[outputFormats]
  [outputFormats.print]
    name= &#39;print&#39;
    baseName = &#39;index.print&#39;
    isHTML = true
    mediaType = &#39;text/html&#39;
    permalinkable = false
    noUgly = true
{{&lt; /multiconfig &gt;}}

## Markdown Support

Enable support to show the Markdown source of a page. Add the `markdown` output format to your home, section, and page in `hugo.toml`:

{{&lt; multiconfig file=hugo &gt;}}
[outputs]
  home = [&#39;html&#39;, &#39;rss&#39;, &#39;markdown&#39;]
  section = [&#39;html&#39;, &#39;rss&#39;, &#39;markdown&#39;]
  page = [&#39;html&#39;, &#39;rss&#39;, &#39;markdown&#39;]
{{&lt; /multiconfig &gt;}}

By default this adds a Markdown icon in the topbar but [can be deactived](authoring/frontmatter/topbar/#markdown-button). Clicking it switches to the Markdown source including the title of the page.

The `markdown` output format configuration is [provided by Hugo](https://gohugo.io/templates/output-formats/#output-format-definitions).

## Source Support

Enable support to show the source code of a page if it was generated from a file. Add the `source` output format to your home, section, and page in `hugo.toml`:

{{&lt; multiconfig file=hugo &gt;}}
[outputs]
  home = [&#39;html&#39;, &#39;rss&#39;, &#39;source&#39;]
  section = [&#39;html&#39;, &#39;rss&#39;, &#39;source&#39;]
  page = [&#39;html&#39;, &#39;rss&#39;, &#39;source&#39;]
{{&lt; /multiconfig &gt;}}

By default this adds a Source icon in the topbar but [can be deactived](authoring/frontmatter/topbar/#source-button). Clicking it switches to the source code of the page.

The Source output format differs from the Markdown format, as it prints the source code _as is_ including the front matter.

The URL won&#39;t be [configured ugly](https://gohugo.io/templates/output-formats/#configure-output-formats) for [Hugo&#39;s URL handling](https://gohugo.io/content-management/urls/#ugly-urls), even with `uglyURLs=true` in `hugo.toml`. This is because each mime type can only have one suffix.

If you don&#39;t like the URLs, you can reconfigure `outputFormats.source` in your `hugo.toml` to something other than the default of:

{{&lt; multiconfig file=hugo &gt;}}
[outputFormats]
  [outputFormats.source]
    name= &#39;source&#39;
    baseName = &#39;index.source&#39;
    isHTML = false
    mediaType = &#39;text/markdown&#39;
    permalinkable = false
    noUgly = true
{{&lt; /multiconfig &gt;}}
