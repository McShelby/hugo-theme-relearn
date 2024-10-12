+++
categories = ["explanation", "howto"]
description = "Adding Custom Output Formats"
title = "Output Formats"
weight = 6
+++

In addition to the [output formats coming with the theme](configuration/sitemanagement/outputformats), you can create your own [output formats](https://gohugo.io/templates/output-formats/).

## Starting from Scratch

If you want to add a new output format called `myformat` that outputs HTML and you want to build everything yourself without using the theme's components:

1. Create a file `layouts/_default/baseof.myformat.html`
2. Implement all the necessary code in this file

## Using the Theme's Structure

If you want to keep the general framework and only change specific parts, you can override these files:

- `layouts/_default/views/article.html`: Controls how a page's content and title are displayed
- `layouts/_default/views/body.html`: Determines the page body structure
- `layouts/_default/views/menu.html`: Defines the sidebar menu layout
- `layouts/_default/views/storeOutputFormat.html`: Stores the output format name for use in the framework

For a real-world example, check out the `print` output format implementations

- [`layouts/_default/views/body.print.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/_default/views/body.print.html)
- [`layouts/_default/views/menu.print.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/_default/views/menu.print.html)
- [`layouts/_default/views/storeOutputFormat.print.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/_default/views/storeOutputFormat.print.html)
