+++
categories = ['explanation', 'howto']
description = 'Recipe to create various documentation screenshots'
title = 'Screenshooting'
weight = 5
+++

Sometimes screenshots need to be redone. This page explains how to create the different screenshots, tools and settings

## Common

**Creation**:

- Use English translation
- Empty search
- Remove history checkmarks but leave it on the page thats used for the screenshot
- After resize of the page into the required resolution, reload the page to have all scrollbars in default loading position

## Demo Screenshot

**Content**:

A meaningful full-screen screenshot of an interesting page.

The content should be:

- timeless: not showing any dates or often edited content
- interesting: show a bunch of interesting elements like headings, code, etc
- balanced: no cluttering with overpresent elements or coloring
- aligned: aligned outlines

**Used by**:

- Hugo Themes info: https://themes.gohugo.io/themes/hugo-theme-relearn/ _1000 x 1500 @ 1_ (`images/screenshot.png`)
- Hugo Themes gallery: https://themes.gohugo.io/tags/docs/ _900 x 600_ @ 1 (`images/tn.png`)

**Page URL**: [Screenshot Link](shortcodes/notice)

**Creation**:

- save as `images/screenshot.png`
- from original screenshot, scale to _900 x 600_ and save as `images/tn.png`

**Remarks**:

The locations are mandatory due to Hugo's theme site builder.

**Preview** `images/screenshot.png`:

![Screenshot](/images/screenshot.png?width=50%25&height=50%25)

**Preview** `images/tn.png`:

![tn](/images/tn.png?width=50%25&height=50%25)

## Hero Image

**Content**:

Show the [Demo Screenshot](#demo-screenshot) page on different devices and different themes. Composition of the different device screenshots into a template.

The content should be:

- consistent: always use the same page for all devices
- pleasing: use a delightful background

**Used by**:

- Hugo Themes notes: https://themes.gohugo.io/themes/hugo-theme-relearn/               _1280 x 640_
- GitHub project site: https://github.com/McShelby/hugo-theme-relearn                  _1280 x 640_
- GitHub social media preview: https://github.com/McShelby/hugo-theme-relearn/settings _1280 x 640_

**Page URL**: [Hero Image Link](shortcodes/notice)

**Creation**:

- Template: http://www.pixeden.com/psd-web-elements/psd-screen-web-showcase
- Desktop: light theme _1440 x 900 @ 1_
- Tablet: light theme _778 x 1038 @ 1_
- Phone: dark theme _450 x 801 @ .666_
- From original template resize to _3000 x 1500_ offset y: _-330_, scale to _1280 x 640_ and save as `images/hero.png`

**Preview** `images/hero.png`:

![Hero](/images/hero.png?width=50%25&height=50%25)

## Shortcode Feature Images

The feature images for the [shortcodes](shortcodes) are generated automatically via a [Node.js](https://nodejs.org) script.

It lives in the [infra repository](development/developing) inside of the `tools/screenshots` directory. All following commands need to be executed from the root of that repository.

To recreate the screenshots

- install Node.js according to their installation guide
- check out the infra repository next to the theme, as described in [Developing](development/developing)
- run `npm ci`
- run `npm run screenshots`

The script serves the documentation itself on port 3132, captures each page and writes the result back into `docs/content/<shortcode>/featured.png` of the resolved theme checkout. To capture against a server you are already running instead, pass its address:

````shell
npm run screenshots -- --base=http://localhost:1313
````

Run this locally and commit the resulting images with the change that made them stale. The regenerated files land in your theme checkout, so they show up in `git status` alongside everything else.
