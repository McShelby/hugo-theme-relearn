+++
title = "Relearn Theme for Hugo"
+++

# Hugo Relearn Theme

[Hugo-theme-relearn](http://github.com/McShelby/hugo-theme-relearn) is a theme for [Hugo](https://gohugo.io/), a static website generator written in Go. Where Hugo is often used for blogs, this theme is designed with documentation in mind.

{{% notice info %}}
The theme initially was a fork of the great [hugo-theme-learn](https://github.com/matcornic/hugo-theme-learn) with the aim of fixing long outstanding bugs and adepting to latest Hugo features. As far as possible this theme tries to be a drop-in replacement for hugo-theme-learn.
{{% /notice %}}

## Main features

* [Automatic Search]({{%relref "basics/configuration/_index.md#activate-search" %}})
* [Multilingual mode]({{%relref "cont/i18n/_index.md" %}})
* Unlimited menu levels
* Automatic next/prev buttons to navigate through menu entries
* [Image resizing, shadow...]({{%relref "cont/markdown.en.md#images" %}})
* [Attachments files]({{%relref "shortcodes/attachments.en.md" %}})
* [List child pages]({{%relref "shortcodes/children/_index.md" %}})
* [Mermaid diagram]({{%relref "shortcodes/mermaid.en.md" %}}) (flowchart, sequence, gantt)
* [Customizable look and feel and theme variants]({{%relref "basics/customization/_index.md"%}})
* [Buttons]({{%relref "shortcodes/button.en.md" %}})
* [Tip/Note/Info/Warning boxes]({{%relref "shortcodes/notice.en.md" %}})
* [Expand]({{%relref "shortcodes/expand.en.md" %}})
* [Tabs]({{%relref "shortcodes/tabs.en.md" %}})
* [File inclusion]({{%relref "shortcodes/include.en.md" %}})

![Screenshot](https://github.com/McShelby/hugo-theme-relearn/raw/main/images/screenshot.png?width=40pc&classes=shadow)

## Contribute to this documentation

Feel free to update this content, just click the **Edit this page** link displayed on top right of each page, and pullrequest it.

{{% notice note %}}
Your modification will be deployed automatically when merged.
{{% /notice %}}

## Documentation website

This current documentation has been statically generated with Hugo with a simple command : `hugo -t hugo-theme-relearn`. The source code is [available on GitHub](https://github.com/McShelby/hugo-theme-relearn).

{{% notice info %}}
Automatically published and hosted thanks to [Netlify](https://www.netlify.com/). Read more about [Automated HUGO deployments with Netlify](https://www.netlify.com/blog/2015/07/30/hosting-hugo-on-netlifyinsanely-fast-deploys/)
{{% /notice %}}
