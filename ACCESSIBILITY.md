# Accessibility

The theme wants your documentation to be usable by everyone, whether they read it with their eyes, a screen reader or a magnifier, and whether they move through it with a mouse, a keyboard or by touch. Accessibility is a supported feature of the theme: what doesn't work for you or your readers is a bug.

This document tells what the theme aims for, what remains up to the author of a site, what is expected from contributors and how to report a barrier.

## Priorities

- **Accessibility target**: The theme works toward level AA of the [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/). This target guides the work but is not a claim of verified conformance. The theme is checked by its maintainer and was not audited by an independent party.
- **Structure**: Each page has a link to skip to its content, landmarks for the menu, the topbar, the breadcrumbs and the content, and one heading hierarchy starting with the title of the page.
- **Keyboard**: Everything the theme offers can be reached and operated by keyboard and shows where the focus is. What is used often has a [keyboard shortcut](https://mcshelby.github.io/hugo-theme-relearn/configuration/publishing/shortcuts).
- **Assistive technology**: Controls have a name and tell their state, like buttons that show and hide something. What changes without a page load, like the results of a search, is announced. Decorative icons are hidden.
- **Vision**: The [contrast variants](https://mcshelby.github.io/hugo-theme-relearn/configuration/branding/colors#shipped-variants) have colors chosen for high contrast, and the forced colors of the operating system are honored. Links can be [underlined](https://mcshelby.github.io/hugo-theme-relearn/configuration/publishing/accessibility#underlined-links), so they are told apart by more than their color.
- **Motion**: Animations are turned off if the operating system asks for reduced motion.
- **Math**: Formulae are written as MathML, which screen readers can read.
- **Languages**: Each page declares its language and reading direction, and the texts the theme writes itself are translated.

## What Is Up to You

The theme can only care for what it writes itself. A site built with it is only as accessible as its content, its colors and its customizations, so this document does not cover your site. If you are obliged to publish an accessibility statement for your site, this document is a basis for it, not a replacement.

- **Colors**: The contrast of text depends on the [color variant](https://mcshelby.github.io/hugo-theme-relearn/configuration/branding/colors) you choose or write. Colors you set yourself, like the one of a badge or a box, are yours to check.
- **Headings**: The theme writes the title of a page as its first heading, so start the headings of your content one level below and don't skip a level. The headings the theme writes for you fit in on their own. The exception is the [`pages` shortcode](https://mcshelby.github.io/hugo-theme-relearn/shortcodes/pages), whose `headinglevel` you have to set to match the place you call it from.
- **Images**: Give each image an alternative text. For a complex image or a graph, describe it in the text around it.
- **Links**: Write link texts that tell where they lead even if read on their own.

## Contributor Expectations

The automated tests of the theme don't check accessibility. If your contribution changes what a reader sees or operates, check it by hand before you send it:

- **Keyboard**: Go through your change with the keyboard alone. Everything can be reached in a sensible order and operated, the focus is always visible and nothing traps it.
- **Screen reader**: For a new or changed control, check that it has a name telling its purpose, that it tells its state and that what it changes on the page is announced.
- **Colors**: Look at your change in the contrast variants and with the forced colors of your operating system. Don't use color as the only way to tell things apart.
- **Motion**: A new animation has to be turned off if reduced motion is asked for.
- **Zoom**: Your change keeps working in the mobile layout and with the page zoomed in, without content getting lost.
- **Documentation**: What you write for the docs follows what is asked from every author [above](#what-is-up-to-you).

See the [contribution guidelines](https://mcshelby.github.io/hugo-theme-relearn/development/contributing) for everything else.

## Reporting Accessibility Issues

If you run into a barrier, please [open an issue](https://github.com/McShelby/hugo-theme-relearn/issues). Your report is welcome and is treated like any other bug of the theme.

It helps if you include

- what you were trying to do and what happened instead
- the page it happened on, best a page of this documentation that shows it
- your operating system, your browser and your assistive technology, with their versions
- the color variant in use

You don't need to tell anything about yourself, and a screenshot or recording is welcome but not required.

You will be told whether the barrier can be reproduced, whether it is caused by the theme, your site or a third-party library, and whether there is a workaround until it is fixed. There are no guaranteed times for a fix.

## Ownership and Maintenance

Accessibility is owned by the [maintainer](https://github.com/McShelby) of the theme, who triages the reports, tracks the known barriers and keeps this document current. It describes the version of the theme it is shipped with.

## Supported Environments

The theme writes static HTML that is meant to work in the current versions of the common browsers, on desktop and mobile devices, operated by mouse, keyboard or touch. It relies on standard HTML and ARIA instead of the behavior of a specific assistive technology.

No list of tested combinations of browsers and assistive technologies is kept, so none is claimed to be free of barriers.

## Known Limitations

- **Color variants**: Not every shipped [color variant](https://mcshelby.github.io/hugo-theme-relearn/configuration/branding/colors#shipped-variants) has enough contrast in every place. Use the contrast variants if you need it.
- **Mermaid**: The graphs of the [`mermaid` shortcode](https://mcshelby.github.io/hugo-theme-relearn/shortcodes/mermaid) are drawn in the browser by the Mermaid library. The theme does not give them a text alternative. Describe your graph in the text around it, or with the `accTitle` and `accDescr` keywords of Mermaid.
- **OpenAPI**: The [`openapi` shortcode](https://mcshelby.github.io/hugo-theme-relearn/shortcodes/openapi) shows your specification with the Swagger UI library. The theme has no influence on how accessible its interface is.
- **Math**: How well a formula is read aloud depends on the support for MathML in the browser and the screen reader.
- **Testing**: As accessibility is checked by hand, a regression may go unnoticed until it is reported.

If you find a barrier not listed here, please [report it](#reporting-accessibility-issues).

## Feedback

Accessibility is never finished. If you have a suggestion to improve this document or the way the theme handles accessibility, open an issue or a pull request.
