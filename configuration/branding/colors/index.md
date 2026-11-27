# Colors

The Relearn theme offers color variants to change your site's appearance. Each color variant consists of a CSS file, or of the files it [imports](configuration/branding/variants#imports), and optional settings in your project configuration.

You can use the [shipped variants](#shipped-variants), [customize them](configuration/branding/variants#modifying-variants), decorate them with [effects](configuration/branding/variants#effects), or create your own. The [interactive variant generator](configuration/branding/generator) can help you with this.

Once set up in your project configuration, you can switch variants using the selector at the bottom of the menu.

## Shipped Variants

The theme ships with the following set of variants

| Family   | Variants | Notes |
|----------|----------|-------|
| Relearn  | [Light](configuration/branding/colors?variant=relearn-light#shipped-variants), [Dark](configuration/branding/colors?variant=relearn-dark#shipped-variants) | The classic Relearn default, coming with signature green, a dark sidebar and a light or dark content area |
| Zen      | [Light](configuration/branding/colors?variant=zen-light#shipped-variants), [Dark](configuration/branding/colors?variant=zen-dark#shipped-variants) | A more relaxed white/grey look, coming with blue accents and a light or dark sidebar and content area |
| Contrast | [Light](configuration/branding/colors?variant=contrast-light#shipped-variants), [Dark](configuration/branding/colors?variant=contrast-dark#shipped-variants) | [High contrast](configuration/publishing/accessibility), coming with black text on white or white text on black |
| Book     | [Light](configuration/branding/colors?variant=book-light#shipped-variants), [Dark](configuration/branding/colors?variant=book-dark#shipped-variants) | A book-like look with calligraphic titles, coming with burgundy accents on warm paper tones or garnet accents on dark leather tones |
| Tome     | [Light](configuration/branding/colors?variant=tome-light#shipped-variants), [Dark](configuration/branding/colors?variant=tome-dark#shipped-variants) | Book with a [glow around the page](configuration/branding/variants#effects) |
| Unicorn  | [Light](configuration/branding/colors?variant=unicorn-light#shipped-variants), [Dark](configuration/branding/colors?variant=unicorn-dark#shipped-variants) | A gradient across sidebar and topbar, pastel with magenta accents in Light and vivid in Dark |
| Glow     | [Powder](configuration/branding/colors?variant=powder#shipped-variants), [Neon](configuration/branding/colors?variant=neon#shipped-variants) | Unicorn Light with a [glow around the page](configuration/branding/variants#effects), Unicorn Dark with [glowing text](configuration/branding/variants#effects) |
| Retro    | [Learn](configuration/branding/colors?variant=learn#shipped-variants), [Blue](configuration/branding/colors?variant=blue#shipped-variants), [Green](configuration/branding/colors?variant=green#shipped-variants), [Red](configuration/branding/colors?variant=red#shipped-variants) | The default of the old Learn theme, coming with signature light purple, and variations tinted in blue, green or red |

## Changing the Variant

{{% badge style="option" %}}Option{{% /badge %}} Set the `themeVariant` option to the list of your site's variants. Each entry is a table with the `identifier` of the variant and further [parameters](#parameters).

The `identifier` names the variant's file `assets/css/theme-<IDENTIFIER>.css`, taken from your site or else from the theme. A variant with [`imports`](configuration/branding/variants#imports) can do without it.

{{< multiconfig file=hugo section=params >}}
themeVariant = [
  { identifier = 'relearn-light' },
  { identifier = 'relearn-dark' }
]
{{< /multiconfig >}}

An entry with nothing but its `identifier` can be written as the identifier alone.

{{< multiconfig file=hugo section=params >}}
themeVariant = [ 'relearn-light', 'relearn-dark' ]
{{< /multiconfig >}}

With more than one variant, the variant switcher is shown at the bottom of the menu and the first variant is the default. To change the position or the icon of the variant switcher, see the [chapter on sidebar configuration](configuration/sidebar/menus#defining-sidebar-menus).

A site with only one variant can set `themeVariant` to that variant instead of a list. The variant switcher is not shown then.

{{< multiconfig file=hugo section=params >}}
themeVariant = 'relearn-light'
{{< /multiconfig >}}

Default is `auto`. So without `themeVariant`, your site [adjusts to the OS settings](#adjust-to-os-settings) with `relearn-light` for light and `relearn-dark` for dark mode.

### Force the Default Variant

{{% badge style="option" %}}Option{{% /badge %}} Set `forceDefaultThemeVariant` to `true` to keep the reader's selection in the browser's [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) instead of its local storage, so every new visit starts with the first variant of `themeVariant` again, even if the reader selected another one before. Default is `false`.

{{< multiconfig file=hugo section=params >}}
forceDefaultThemeVariant = true
themeVariant = [ 'relearn-light', 'relearn-dark' ]
{{< /multiconfig >}}

If your site is opened from the file system, this option has no effect.

### Adjust to OS Settings

A variant with the `auto` parameter matches the OS light/dark setting. The first entry of `auto` is the variant for light mode, the second the one for dark mode. Usually it makes sense to set it in the first position and make it the default. A site can have several of them.

{{< multiconfig file=hugo section=params >}}
themeVariant = [
	{ identifier = 'zen-auto', auto = [ 'zen-light', 'zen-dark' ] },
	{ identifier = 'red' }
]
{{< /multiconfig >}}

{{% badge style="option" %}}Option{{% /badge %}} A missing entry of `auto` is taken from the `themeVariantAuto` option, or else from the first two variants of `themeVariant` that are neither auto mode nor [scripted](#scripted-variants), or else it is `relearn-light` for light and `relearn-dark` for dark mode. The identifier `auto` makes a variant an auto mode variant even without the `auto` parameter.

{{< multiconfig file=hugo section=params >}}
themeVariantAuto = [ 'learn', 'neon' ]
themeVariant = [ 'auto', 'red' ]
{{< /multiconfig >}}

### Parameters

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| identifier            | _&lt;empty&gt;_ | Must correspond to the name of a color variant either in your site's or the theme's directory in the form `assets/css/theme-<IDENTIFIER>.css`. With `imports`, the file is optional. |
| imports               | _&lt;empty&gt;_ | The variants and effects [imported](configuration/branding/variants#imports) into this variant, as if its file started with an `@import` of each. It can't be combined with `auto` or `script`. |
| name                  | see notes       | The name to be displayed in the variant selector. If not set, the identifier is used in a human readable form. |
| auto                  | _&lt;empty&gt;_ | If set, the variant is an [auto mode variant](#adjust-to-os-settings). The first entry is the color variant for light mode, the second for dark mode. |
| script                | _&lt;empty&gt;_ | If set, the variant is [chosen by a script](#scripted-variants) of this name and needs no stylesheet of its own. It can't be combined with `auto` or `print`. |
| params                | _&lt;empty&gt;_ | Values of the site's `params` that are overridden while this variant is active, see [below](#variant-parameters). A [scripted variant](#scripted-variants) passes them to its script instead. |
| hidden                | `false`         | If `true`, the variant will not be shown in the variant switcher but is still available for internal use (e.g. to override parameter when used as a sub-variant of an auto mode variant, or to be chosen by a [script](#scripted-variants)). |
| print                 | see notes       | The [print variant](#theme-variant-print) used instead of this variant when printing. If not set, the one of the `themeVariantPrint` option is used. An auto mode variant ignores it and prints with the print variants of its light and dark variant. |

### Variant Parameters

Some of the site's `params` can be given a different value for a variant by setting it in the variant's `params`. While the variant is active, it takes the place of the site's value. The most prominent example is the [logo](configuration/branding/logo#variant-specific-logos), which you can override for each variant.

| Name                  | Notes       |
|-----------------------|-------------|
| logo                  | [Logo of the variant](configuration/branding/logo#variant-specific-logos), only its `src` |

{{< multiconfig file=hugo section=params >}}
themeVariant = [
	{ identifier = 'relearn-light' },
	{ identifier = 'neon',         params = { logo = { src = '/images/logo-neon.svg' } } }
]
{{< /multiconfig >}}

The variant's `params` may hold more, like the options of a [scripted variant](#scripted-variants).

### Dividers

To group the entries of the variant switcher, put an entry `{ type = 'divider' }` between them. It draws a line in the variant switcher and is no variant itself.

Give the divider a `name` to label the group following it, like `{ type = 'divider', name = 'Classic' }`. A named divider may also stand first to label the first group.

Of consecutive dividers only the last one is kept. Trailing dividers are dropped, as are leading ones without a name.

### Example Configuration

{{< multiconfig file=hugo section=params >}}
themeVariant = [
	{ type = 'divider',             name = 'Modern' },
	{ identifier = 'relearn-auto',  name = 'Relearn Light/Dark', auto = [] },
	{ identifier = 'relearn-light'  },
	{ identifier = 'relearn-dark'   },
	{ type = 'divider'              },
	{ identifier = 'zen-auto',      name = 'Zen Light/Dark', auto = [ 'zen-light', 'zen-dark' ] },
	{ identifier = 'zen-light'      },
	{ identifier = 'zen-dark'       },
	{ type = 'divider',             name = 'Classic' },
	{ identifier = 'retro-auto',    name = 'Retro Learn/Neon', auto = [ 'learn', 'neon' ] },
	{ identifier = 'neon'           },
	{ identifier = 'learn'          }
]
{{< /multiconfig >}}

## Scripted Variants

A variant with a `script` lets a script choose the variant to show, for example by the current date or the time of day. The reader selects it in the variant switcher like any other variant, while the page shows and prints the variant the script chooses. The script is asked on every page load.

The script is the file `assets/js/<SCRIPT>.js` of your site or the theme. It must define a function of the same name. The function is called with the configuration of all variants and the configuration of the variant asked for, and returns the identifier of a variant without a `script`. Each configuration holds every option of its variant as the theme prepared it from yours, so a script may read options of its own from the `params` of its variant. A script must not change them. It may choose hidden variants and scripted variants, whose script is asked in turn, so a script choosing by the season can leave the time of day to another.

````js {title="assets/js/myVariantByWeekday.js"}
function myVariantByWeekday(variants, variant) {
  var weekday = new Date().getDay();
  return weekday == 0 || weekday == 6 ? 'zen-light' : 'relearn-light';
}
````

{{< multiconfig file=hugo section=params >}}
themeVariant = [
	{ identifier = 'my-weekday', name = 'Weekday/Weekend', script = 'myVariantByWeekday' },
	{ identifier = 'relearn-light', hidden = true },
	{ identifier = 'zen-light',     hidden = true }
]
{{< /multiconfig >}}

If the function fails, returns something else or a scripted variant that was already asked for, the first variant of the variant switcher that isn't scripted is shown instead. If the variant switcher has none, it is the first variant of `themeVariant` that isn't scripted, even if it is hidden. If all variants of `themeVariant` are scripted, the build stops with an error.

### Variant by Time

The theme ships with the script `themeVariantByTime`, which chooses a variant by the local time of the reader.

The `themeVariantByTimeMappings` in the `params` of its variant map the local time a variant starts, like `07:30`, to the identifier of the variant to show from then on. Before the earliest time of the day, the variant of the latest time is shown.

{{< multiconfig file=hugo section=params >}}
themeVariant = [
	{ identifier = 'my-time', name = 'Morning/Day/Night', script = 'themeVariantByTime', params = { themeVariantByTimeMappings = {
		'06:00' = 'relearn-light',
		'09:00' = 'zen-light',
		'20:00' = 'zen-dark'
	} } },
	{ identifier = 'relearn-light', hidden = true },
	{ identifier = 'zen-light',     hidden = true },
	{ identifier = 'zen-dark',      hidden = true }
]
{{< /multiconfig >}}

See it in action with [Relearn Day/Night](configuration/branding/colors?variant=relearn-time#variant-by-time) of this documentation.

### Variant by Occasion

The theme ships with the script `themeVariantByOccasion`, which chooses a variant by the festivals and seasons of the current date.

The `themeVariantByOccasionMappings` in the `params` of its variant list which variant to show for which occasion. The entries are checked in the configured order and the first match wins, so put the more specific ones first. An entry may also show a variant of the [script by time](#variant-by-time), so the occasion picks the variant and the time of day picks between its light and dark version.

| Name                  | Notes       |
|-----------------------|-------------|
| occasion              | The ID of an occasion, a date like `2026-12-24` or a date of every year like `12-24`, which match on the local date of the reader. A list of two of them matches from the start of the first to the end of the second, like `[ 'advent', 'epiphany' ]` or `[ '11-15', 'new-year' ]`. Without it, the entry always matches, which makes it a good last entry. |
| variant               | The identifier of the variant to show. |

A festival has an ID like `christmas` or `lunar-new-year` and a season one like `season-winter-north-meteorological`, see the [available occasions](#available-occasions).

{{< multiconfig file=hugo section=params >}}
themeVariant = [
	{ identifier = 'my-occasion', name = 'By Occasion', script = 'themeVariantByOccasion', params = { themeVariantByOccasionMappings = [
		{ occasion = [ 'advent', 'epiphany' ], variant = 'my-christmas' },
		{ occasion = 'season-winter-north-meteorological', variant = 'my-winter' },
		{ variant = 'relearn-auto' }
	] } },
	{ identifier = 'relearn-auto', auto = [] },
	{ identifier = 'my-christmas', hidden = true },
	{ identifier = 'my-winter', hidden = true }
]
{{< /multiconfig >}}

See it in action with [Season Day/Night](configuration/branding/colors?variant=season#variant-by-occasion) of this documentation, which shows another variant in each meteorological season of the northern hemisphere, light by day and dark by night.

#### Available Occasions

| ID                    | Days        |
|-----------------------|-------------|
| `advent`              | 1st Sunday of Advent to December 24 |
| `buddhas-birthday`    | Buddha's Birthday of East Asia, 8th day of the 4th Chinese month |
| `carnival`            | Thursday to Tuesday before Ash Wednesday |
| `christmas`           | December 24 to 26 |
| `christmas-orthodox`  | January 7 |
| `day-of-the-dead`     | Día de los Muertos, November 1 to 2 |
| `diwali`              | Main day of Diwali with two days before and after |
| `easter`              | Good Friday to Easter Monday |
| `easter-orthodox`     | Orthodox Good Friday to Easter Monday |
| `eid-al-adha`         | Four days from the 10th of Dhu al-Hijjah |
| `eid-al-fitr`         | Three days from the 1st of Shawwal |
| `epiphany`            | January 6 |
| `halloween`           | October 31 |
| `hanukkah`            | Eight days from the 25th of Kislev |
| `holi`                | Holika Dahan and Holi |
| `lunar-new-year`      | Lunar New Year to the Lantern Festival |
| `mid-autumn`          | Mid-Autumn Festival, 15th day of the 8th Chinese month |
| `mid-summer`          | June 19 to 27, the days the celebrations of the different countries fall on |
| `new-year`            | December 31 to January 1 |
| `nowruz`              | Nowruz to Sizdah Bedar |
| `pesach`              | Eight days from the 15th of Nisan |
| `ramadan`             | The month of Ramadan |
| `rosh-hashanah`       | Two days from the 1st of Tishri |
| `thanksgiving-ca`     | Thanksgiving of Canada, 2nd Monday of October |
| `thanksgiving-us`     | Thanksgiving of the US, 4th Thursday of November |
| `vesak`               | First full moon of May |
| `yom-kippur`          | 10th of Tishri |
| `season-<SEASON>-<HEMISPHERE>-<RECKONING>` | A season, like `season-winter-north-meteorological`, where `<SEASON>` is `spring`, `summer`, `autumn` or `winter`, `<HEMISPHERE>` is `north` or `south` and `<RECKONING>` is `astronomical`, bounded by equinoxes and solstices, or `meteorological`, of whole months like December to February for the northern winter |

### Random Variant

The theme ships with the script `themeVariantByRandom`, which chooses one of the other variants of `themeVariant` by chance, including hidden and scripted ones. As every script, it is asked on every page load, so each page may show another variant.

To choose only from some of them, list their identifiers in `themeVariantByRandomVariants` in the `params` of its variant.

{{< multiconfig file=hugo section=params >}}
themeVariant = [
	{ identifier = 'relearn-light' },
	{ identifier = 'zen-light' },
	{ identifier = 'tome-light' },
	{ identifier = 'my-random', name = 'Random', script = 'themeVariantByRandom', params = { themeVariantByRandomVariants = [ 'relearn-light', 'zen-light' ] } }
]
{{< /multiconfig >}}

See it in action with [Random Fun](configuration/branding/colors?variant=random#random-variant) of this documentation.

## Print Variant {#theme-variant-print}

When a page is printed or shown as its [print version](configuration/sitemanagement/outputformats#print-support), it doesn't use the variant selected by the reader but its print variant, with the theme's print variables on top.

The print variables set every color that depends on a light or dark background to values made for paper, with links, titles, code, boxes and the topbar in black on white. So the print shows the fonts of the print variant but the colors of paper. The print variables are in the theme's `assets/css/format-print-variables.css`. To change them for your site, copy the file into your site's `assets/css` directory and edit it. To keep a single value of a print variant on paper, mark it `!important` in the variant.

````css {title="assets/css/theme-my-light.css"}
:root {
  --MAIN-LINK-color: rgba( 0, 0, 255, 1 ) !important; /* blue links also on paper */
}
````

{{% badge style="option" %}}Option{{% /badge %}} Set `themeVariantPrint` to the print variant of your site. Default is `relearn-light`.

{{< multiconfig file=hugo section=params >}}
themeVariantPrint = 'zen-light'
{{< /multiconfig >}}

Each variant can name its own print variant with the `print` [parameter](#parameters), which wins over `themeVariantPrint`. A variant naming itself prints with its own fonts.

If a print variant has a different print variant itself, by its `print` parameter or by `themeVariantPrint`, that one is used instead, and so on, until a variant names itself. If this comes back to a variant already visited, the build stops with an error. An auto mode variant prints with the print variants of its light and dark variant, following the reader's OS setting.

In the following example, both variants print with the fonts of the light variant.

{{< multiconfig file=hugo section=params >}}
themeVariant = [
	{ identifier = 'my-auto',  auto = [ 'my-light', 'my-dark' ] },
	{ identifier = 'my-light', print = 'my-light' },
	{ identifier = 'my-dark',  print = 'my-light' }
]
{{< /multiconfig >}}

A print variant doesn't need to be part of `themeVariant`. If you list it, set it `hidden` to keep it out of the variant switcher.

The style rules of a print variant apply to the print as well. Wrap rules meant for the screen only as shown for [screen-only rules](configuration/branding/variants#screen-only-rules).

## Advanced Topics

### Creating Variants

To change a shipped variant, decorate it with effects or build one of your own, see [custom variants](configuration/branding/variants).

### Linking to a Variant

You can select a variant by adding the query parameter `variant`, containing the identifier of the variant, to the URL of any page of your site, e.g. `https://example.com/my-page?variant=relearn-dark`. This also works for [links in your content](authoring/linking/pages#links-to-a-color-variant).

This has the same effect as if the reader had selected the variant with the variant switcher: The selection is [stored in the reader's browser](configuration/publishing/storedinformation), replacing a previous one, and carried over to the following presented pages. The query parameter is removed from the URL in the browser's address bar afterwards.

The variant must be one of your configured variants and must not be `hidden`. Otherwise the query parameter is ignored.

### React to Variant Switches in JavaScript

Once a color variant is fully loaded, either initially or by switching the color variant manually with the variant selector, the custom event `themeVariantLoaded` on the `document` will be dispatched. You can add an event listener and react to changes.

````javascript {title="JavaScript"}
document.addEventListener( 'themeVariantLoaded', function( e ){
  console.log( e.detail.variant ); // `relearn-light`
});
````
