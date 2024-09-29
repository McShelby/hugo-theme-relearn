+++
description = "Modifying partials to your needs"
title = "Partials"
weight = 2
+++

## Customizable Partials

The Relearn theme has been built to be as configurable as possible by defining multiple partials that can be overridden by you to customize the theme.

As a rule of thumb, the less code a partial of the theme contains, the less likely you will have trouble updating the theme to a future version.

Following is a list of partials that are save to be overridden

- `layouts/partials/content.html`: the content of a page itself, can be overridden if you want to display page's meta data above or below the content

- `layouts/partials/content-header.html`: header above the title, has a default implementation to display the tags taxonomy but you can override it if you don't like it

- `layouts/partials/content-footer.html`: footer below the content, has a default implementation to display author information, modification dates and category taxonomy but you can override it if you don't like it

- `layouts/partials/custom-header.html`: custom headers in page; meant to be overridden when adding CSS imports; don't forget to include `style` HTML tag directive in your file

- `layouts/partials/custom-footer.html`:  custom footer in page; meant to be overridden when adding JavaScript; don't forget to include `javascript` HTML tag directive in your file

- `layouts/partials/favicon.html`: the favicon; definitely meant to be overridden

- `layouts/partials/heading.html`: the pages title headings

- `layouts/partials/heading-pre.html`: prepend something to pages title headings; if you override this, it is your responsibility to take the page's `headingPre` setting into account

- `layouts/partials/heading-post.html`: append something to pages title headings; if you override this, it is your responsibility to take the page's `headingPost` setting into account

- `layouts/partials/logo.html`: the logo on the top left corner; definitely meant to be overridden

- `layouts/partials/menu-pre.html`: prepend something to a menu item; if you override this, it is your responsibility to take the page's `menuPre` setting into account

- `layouts/partials/menu-post.html`: append something to a menu item; if you override this, it is your responsibility to take the page's `menuPost` setting into account

- `layouts/partials/menu-footer.html`: footer of the left menu

You may override other partials from the directory `themes/hugo-relearn-themes/` besides `themes/hugo-relearn-themes/layouts/partials/_relearn`. Just be aware that this may become a hassle with future updates.

## Usable Partials

You may use other partials from the directory `themes/hugo-relearn-themes/` besides the ones contained in `themes/hugo-relearn-themes/layouts/partials/_relearn`. Just be aware that using other partials besides [the ones mentioned above](#customizable-partials) may become a hassle with future updates.
