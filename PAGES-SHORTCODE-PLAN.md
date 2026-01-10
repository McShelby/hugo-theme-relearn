# pages shortcode — implementation plan

Build a `pages` shortcode that queries a set of pages and renders it, replacing
the `children` shortcode's tangle of listing parameters. `children` becomes a
translation layer over it and is deprecated on the usual schedule.

Nothing here is implemented. Delete this file once the work has landed.

## Scope

In scope: the `pages` shortcode, its query and display halves, the front-matter
channel, rewriting `children` as a shim, and repointing every caller of the old
engine.

Out of scope: changing what a listing looks like. The shim's markup must match
what `children` produces today **except where a defect in the appendix changes
it**. The `children-sort`, `shortcodes` and `url-permutations` baselines pin
what the released `children` produces; where they move, the diff has to be a
defect from the appendix being fixed. Any other movement in them is a
regression.

## What already works and must keep working

**Taxonomy and term pages render through the listing shortcode.**
`layouts/partials/shortcodes/taxonomy.html` and `term.html` pass `page`, `type`
and `headingdepth` and nothing else; they are called in turn from
`layouts/partials/bodys/taxonomy.html` and `bodys/term.html`. Do not push
parameter handling back out into those callers.

**Three callers use the engine, not two.** Besides those, `layouts/partials/toc-id.html`
calls `_relearn/childrenGroups.gotmpl` directly to build the table of contents
on taxonomy and term pages, and reads `.Params.children.type`. It must be
repointed in the same step that deletes the old engine.

**The two taxonomy sources are not alike.** Both return a slice of dicts, but:

| Source | Shape | Label |
|---|---|---|
| `_relearn/pagesTaxonomy.gotmpl` | `LinkTitle`, `Page`, `Count` | `printf "%s (%d)"` — term name plus its page count |
| `_relearn/pagesTerm.gotmpl` | `LinkTitle`, `Page` | the page's title shown, no count |

Do not add counts to term listings; they never had them. Every source labels
an entry with the title shown as `title.gotmpl` resolves it with `linkTitle`,
the same text the menu and the breadcrumbs show — it translates a taxonomy's
name and humanizes a term without a title, which Hugo's `.LinkTitle` doesn't.

Both sources already drop hidden pages according to `disableTagHiddenPages`,
which is why `showhidden` is forced true for those two kinds today. That
filtering stays in the source, per Principle 2.

**`_relearn/pages.gotmpl` is not part of the engine and must survive.** Seven
templates use it, including `menu.html`, `bodys/tree.html`, `pageNext.gotmpl`
and `pagePrev.gotmpl`.

**Taxonomy and term listings are configurable from front matter.** The
released `params.children.*` keys are `breadcrumb`, `cardtemplate`,
`description`, `headingdepth`, `image`, `sort` and `type`. This is the feature
the exercise was for; it must come out at least as capable, and the old
namespace must keep working while `children` exists.

**Released, and therefore load-bearing:** the shortcode parameters
`breadcrumb`, `cardtemplate`, `containerstyle`, `depth`, `description`,
`headingdepth`, `image`, `showhidden`, `sort`, `style` and `type`; `type=group`
and its `.children-type-group` CSS; the `disableTermBreadcrumbs` site option,
which decides whether term listings show breadcrumbs; `type=card`'s 3-column
default; the `containerstyle`, `style` and `context` deprecations
`children.html` still honours. The grouping surface of the unreleased
precursor — `group`, `grouplayout`, `grouporder`, `sortorder`, `sortlayout`,
`columns`, `type=index` — is not part of `children` and the shim does not
translate it.

## Principles

Four rules. Each exists because breaking it produced a defect in the appendix,
so none is a preference.

1. **Retrieve, then render.** A query produces groups of pages; a display turns
   them into markup. Neither knows the other. No parameter may serve both, and
   no display may test whether grouping happened.
2. **A source normalises.** Unwrapping, hidden-page filtering and label
   extraction happen where pages are fetched. Nothing downstream may branch on
   where the pages came from.
3. **Group by a value, label separately.** The grouping expression produces the
   group's key; what the heading says is a separate expression. Never infer an
   ordering by inspecting a format string.
4. **Order on values, never on rendered keys.** Map keys are strings because
   Hugo map keys are strings, and `"10"` sorts before `"2"`. Every group
   therefore carries a `Sort` distinct from its `Key`, and group ordering uses
   `Sort` alone.

## Architecture

```
layouts/shortcodes/pages.html                 parameter capture
layouts/partials/shortcodes/pages.html        entry point; front-matter merge
layouts/partials/_relearn/pagesQuery.gotmpl   source → filter → group → order
layouts/partials/_relearn/pagesExpr.gotmpl    evaluate one pipeline for one page
layouts/partials/pages/{tree,headings,sections,list,cards}.html   displays, user-overridable
```

The query returns:

```
Group   Key       string   the grouping key; "" when ungrouped
        Sort      any      what the group is ordered by; never the Key
        Label     string   heading text
        Fallback  bool     true for the missing-value group
        Pages     slice of
                    Page   the Hugo page
                    Label  display text for this entry
                    Level  1-based depth below the listing root
```

`Fallback` is a flag rather than a reserved key string, so a page whose real
grouping value is empty cannot collide with it, and ordering can place it last
without matching on text.

The entry point hands each display:

```
groups        the slice above
headinglevel  already adjusted: headinglevel + 1 when grouped, else headinglevel
class         the class list to emit verbatim
columns       clamped
description, breadcrumb, image, cardtemplate
```

**`headinglevel` arrives adjusted.** A display emits its own headings at
`headinglevel + Level - 1`, uniformly, and never asks whether grouping happened —
which is Principle 1. The group heading itself is emitted by the entry point at
the unadjusted value.

**`class` arrives ready.** The display emits it verbatim so the shim can keep
the legacy class names; the display owns no class vocabulary of its own.

`Level` is what makes nested displays possible: `tree` indents by it, `headings`
places its heading by it, `list` and `cards` ignore it. Without it the query
result cannot express the hierarchy `levels > 1` produces.

## The expression language

A pipeline, parsed with two splits and no scanner:

1. split the expression on `|` and trim each stage — these are the stages;
2. split each stage on its **first** whitespace — name, then the rest of the
   stage trimmed as the argument.

Taking the argument as a trimmed remainder is what lets a date layout keep its
spaces without any quoting: `format January 2` yields name `format` and
argument `January 2`.

A string delimited by `"`, `'` or a backtick is taken as a whole by every split:
the `|` between stages, the commas of `orderby` and of a `where … in` list, and
the operator of `where`. `pagesExprSplit.gotmpl` masks such strings before
splitting and restores them after, so no scanner is needed; an argument and a
`where` literal lose their delimiters when read. This is what lets a layout
like `'January 2, 2006'` appear in `orderby`. Three delimiters, because a
shortcode parameter is itself delimited by `"` and an expression inside it
needs another. A quote left open is an error.

```
<field> [| <function> [argument]]…
```

| | |
|---|---|
| fields | `title` `linktitle` `weight` `length` `path` `section` |
| | `date` `lastmod` `publishdate` `expirydate` |
| | `params.<key>` — dotted, arbitrarily deep |
| text | `upper` `lower` `left <n>` `right <n>` `trim` `translate ['<prefix>']` |
| dates | `year` `month` `day` `weekday` `format '<layout>'` |
| any | `coalesce '<fallback>'` `default '<fallback>'` |

`title` is the page's title as its heading shows it and `linktitle` the title
shown in the menu and in every listing; the distinction follows Hugo's
`ByTitle` and `ByLinkTitle`. Both are resolved by `title.gotmpl`, never read
from Hugo directly, so they carry the theme's special cases without any of
their own: a taxonomy's translated name, a term's heading "Taxonomy :: Term"
and its humanized name if it has no title, a `linkTitle` of a taxonomy or term,
the site title for a home page without one. Every default that means "by title" uses `linktitle`, so a group
letter always matches the label beneath it. The older vocabulary of
`ordersectionsby` and `children`'s `sort` keeps `title` meaning the title shown,
as it has since 7.1.0; where it crosses into `pages` it becomes `linktitle`.

`left` counts runes, not bytes. `weekday` returns ISO numbering — Monday 1
through Sunday 7 — not Go's Sunday-0. `format` must be evaluated with Hugo's
`time.Format` so that `:date_long` and friends work; Go's `.Format` method does
not understand those tokens. `translate` looks the text up in the translation files,
prefixed by its optional argument so a site can scope its keys, like
`status-draft`; without a translation the text stays as it is. It belongs in
`grouplabel` rather than `groupby` where the groups are to keep the order of the
untranslated values.

**A `groupby` pipeline may end in `format`; its `Sort` is then a key of the
parts of the date the layout shows.** This is how `groupby="date | format
2006-01"` groups by year and month and still orders chronologically, and how
`date | format January` orders months January to December although it pools
them across years. Which parts a layout shows is found by formatting reference
dates that differ in one part only, once per expression - never by reading the
layout, which may be a localized token or carry literal text. It is Principle 4
doing its job rather than an exception to it, and Principle 3 is kept.

**`format` is allowed in `orderby`.** Its value to order by is the same key of
the date's shown parts as for `groupby`, so `date | format '2. January'` orders
by day and month across years - an order no other function can express.

## Query parameters

| Parameter | Default | Meaning |
|---|---|---|
| `pageref` | the calling page | a reference, absolute or relative to the calling page, to the page whose children are listed and whose front matter is read; a reference that is not a page fails the build. A partial caller may pass the page object as `page` instead |
| `axis` | by page kind | `descendants`, `siblings`, `ancestors`, `taxonomy`, `term`; `descendants` with the default `levels=1` lists the children |
| `levels` | `1` | how many levels `descendants` goes down and `ancestors` goes up; `levels=1` on `ancestors` is the parent |
| `flatten` | `false` | `true` turns the tree into one list; without `orderby` it keeps tree order, parents before their sub-pages |
| `kind` | `all` | `all`, `leaf`, `branch` |
| `hidden` | `false` | `false` stops at the first hidden page like the menu, `true` keeps them |
| `where` | — | `<pipeline> <op> <literal>`; ops `=` `!=` `<` `<=` `>` `>=` `in` |
| `groupby` | — | absent means one group |
| `grouplabel` | the key | heading text |
| `grouporder` | `asc` | `asc`, `desc` |
| `orderby` | `auto` | comma-separated, each `<pipeline> [asc\|desc]` |
| `limit` | — | first N pages, after ordering |

**Structure is only changed by `flatten`.** Without it the result is the site's
tree and `Level` is the position below the starting page; filters never lift
pages up. A page dropped by `hidden`, `kind` or `where` takes its sub-pages
with it. With `flatten` every page is one entry at `Level` 1 and the filters
apply to each page alone, which is what listing pages from any level needs.

### Defaults by page kind

These reproduce what a taxonomy or term page renders today, which is why
`{{% pages %}}` needs no parameters on either.

| | taxonomy | term | anything else |
|---|---|---|---|
| `axis` | `taxonomy` | `term` | `descendants` |
| `groupby` | `linktitle \| left 1 \| upper` | `linktitle \| left 1 \| upper` | — |
| `orderby` | `ordersectionsby`, else `linktitle` | `ordersectionsby`, else `linktitle` | `auto` |
| `columns` | `3` | `3` | `1`, or `3` for `display=cards` |
| `breadcrumb` | `false` | `ne .Site.Params.disableTermBreadcrumbs true` | `false` |
| `hidden` | filtered by the source | filtered by the source | `false` |

For the `taxonomy` and `term` sources the `hidden` parameter has no further
effect: those sources already apply `disableTagHiddenPages` themselves.

### Ordering

`orderby="auto"` defers to `ordersectionsby` in front matter, then in config,
then Hugo's default order. It is the only parameter with an `auto`. In an
`orderby` item a trailing `asc` or `desc` is the direction and the remainder is
the pipeline.

**Sorting runs on the normalised entries, not with Hugo's `Pages.By*` methods.**
Those exist on `page.Pages` and not on the dicts a normalised source produces,
so using them would force the branch Principle 2 forbids. Compute a sort key per
entry and sort on it, uniformly for every source.

**A source does not sort.** The taxonomy and term sources return their pages as
Hugo delivers them; their historic order — `ordersectionsby`, else by title — is
the `orderby` default for those kinds, so `auto` means the same everywhere.

**Multi-key ordering is one sort per term, applied from the least significant
term to the most significant.** That is correct only if Hugo's `sort` preserves
the order of equal keys.

It does. Measured on Hugo 0.165.0, across a 1000-entry slice with three distinct
keys, a 500-entry slice whose keys are all identical, a mixed-direction two-pass
(`sort` by the secondary ascending, then the primary descending), and a re-sort
of an already-sorted slice: ties held their order in every case. Mixed
directions therefore work, which is what `orderby="params.priority desc, title"`
needs.

Hugo does not document this as a guarantee, so it is pinned by a fixture rather
than trusted — see Verification. If a future Hugo breaks it, the fallback is a
single composite sort key and one direction for the whole `orderby`.

An expression has no value when it evaluates to an empty string, as a missing
front matter value, a front matter list or map, an unset date, a weight of `0` —
unweighted, as for Hugo's `ByWeight` — or a failed date function do; there is
no separate null. Numbers, dates among them, and text are ordered apart - the
numbers by value, then the text as text, in either direction - as Hugo's `sort`
compares text with a number as if it were one or else as `0`, which is no
consistent order. Pages whose `groupby` has no value after `coalesce` collect in the group
flagged `Fallback`, labelled from i18n, placed last in both `asc` and `desc` —
it is not part of the ordered domain.

## Display parameters

| Parameter | Default | Meaning |
|---|---|---|
| `display` | `tree` | names a partial under `layouts/partials/pages/` |
| `headinglevel` | `2` | level of the group heading |
| `columns` | see kind defaults | 1–5, clamped; `sections` has no list of its own to split and drops the columnize classes from the lists nested below its headings |
| `description` | `false` | per-entry summary |
| `breadcrumb` | see kind defaults | per-entry breadcrumb |
| `image` | `true` | `display=cards` only |
| `cardtemplate` | `default` | `display=cards` only |
| `params` | — | arbitrary values as a map or a JSON, TOML or YAML string, like the `cards` shortcode's `params`; handed to every display and merged into each card's `params`, where the theme's own keys win |

**`display` must be guarded.** It resolves to a partial name and is
author-supplied — a typo, or a value inherited through `cascade`, would abort the
whole build with "partial not found". Check `templates.Exists` first and fall
back to `tree` with a warning naming the missing display. `children` falls
through to its default renderer for an unknown `type`; do not regress that.

`display` resolving a partial is otherwise the point: a user drops
`layouts/partials/pages/mine.html` in place and writes `display="mine"`. It
receives exactly what the built-ins receive.

**Classes.** `pages` passes `pages pages-<display>`; the shim passes
`children children-type-<type>` unchanged, so existing user CSS and the stored
baselines survive until `children` is removed. Columnize classes are appended by
the entry point, not by the display.

## Front matter

Every parameter above but `pageref` is settable under `params.pages.*`, using
the **same spelling as the shortcode** — all lowercase, no camelCase variants.
A reference only makes sense on the call. A parameter given on the shortcode
call wins over front matter. As everywhere in the theme, an empty value counts
as unset and a value of only whitespace resets a parameter to empty, which is how
`groupby=" "` switches off the grouping of taxonomy and term pages.

Front matter is honoured on every page kind, not only taxonomy and term, which
makes Hugo's `cascade` usable to set a listing style for a whole subtree. This
is a behaviour change and needs a release note.

`params.children.*` keeps working for as long as `children` exists: the shim
reads that namespace and translates it with the same mapping it applies to
shortcode parameters. A user's existing content must not need editing. This
repository's own content uses `params.pages` only; the legacy path is covered by
the test suite, not by the docs.

```toml
[params.pages]
  groupby = 'linktitle | left 1 | upper'
  orderby = 'title'
  display = 'cards'
  columns = 3
```

## Worked examples

These are the specification; each must produce the stated result.

An A–Z index, which is what `children` does by default today:

````
{{%/* pages groupby="linktitle | left 1 | upper" */%}}
````

A taxonomy or term listing — no parameters, because every one of them comes from
the defaults for that page kind:

````
{{%/* pages */%}}
````

An archive — leaves only, newest first, grouped by year and month descending and
still in chronological order, because the `Sort` comes from the date's shown
parts rather than from the formatted key:

````
{{%/* pages levels="999" kind="leaf" flatten="true"
      groupby="date | format '2006-01'" grouporder="desc"
      orderby="date desc" display="list" */%}}
````

Months pooled across years, labelled by name and in calendar order, as the layout
shows only the month:

````
{{%/* pages groupby="date | format 'January'" */%}}
````

Grouped by a parameter with a fallback, ordered on two keys:

````
{{%/* pages groupby="params.flavor | coalesce 'Other'"
      orderby="params.priority desc, title" display="cards" */%}}
````

The five most recent published leaves:

````
{{%/* pages levels="999" kind="leaf" flatten="true"
      where="params.status = published"
      orderby="date desc" limit="5" display="headings" */%}}
````

## Order of work

**Step 0 — prototype the evaluator and measure it.** Write `pagesExpr.gotmpl`
for `groupby` alone and build the `docs` site with it. The evaluator runs per
page per expression and the theme ships a `performance` config for a reason. If
it is slow, stop: the two-stage split, the `Level`-carrying boundary and the
pluggable display are worth having on their own and can be built over the
existing parameters with no expression language at all.

**Step 1 — the query stage.** `pagesQuery.gotmpl` with every query parameter and
the kind defaults. Sources normalise here and nowhere else, producing `Page`,
`Label` and `Level` per entry. Groups carry `Key`, `Sort`, `Label`, `Fallback`,
`Pages`.

**Step 2 — the displays.** Port `tree`, `list`, `index`, `flat` and `card` from
the inline definitions in `layouts/partials/shortcodes/children.html` as
`tree`, `headings`, `sections`, `list` and `cards` — named for what each page
turns into, as every display but `cards` is a list — each
taking the group slice, reading `Level` instead of recursing, emitting the
`class` it is given, and placing its own headings at `headinglevel + Level - 1`.

**Step 3 — the shortcode.** `layouts/shortcodes/pages.html` and
`layouts/partials/shortcodes/pages.html`, including the front-matter merge, the
heading-depth adjustment, the class list and the `display` existence guard.

**Step 4 — `where`.** A second small grammar: pipeline, operator, literal. It is
separable and nothing above depends on it; drop it from the first version if it
is not paying for itself.

**Step 5 — rewrite `children` as a shim.** Map, from both the shortcode call and
`params.children.*`:

| `children` | `pages` |
|---|---|
| `type=tree\|list\|flat\|card` | `display=tree\|headings\|list\|cards` |
| `type=group` | `display=tree`, `groupby="linktitle \| left 1 \| upper"` |
| `sort` | `orderby`, with `auto` for `default`, `linktitle` for `title`, `linktitle` and Learn's undocumented `name`, `lastmod` for `modifieddate` |
| `showhidden` | `hidden` |
| `depth` | `levels` |
| `headingdepth` | `headinglevel` |
| `description`, `breadcrumb`, `image`, `cardtemplate` | unchanged |
| `containerstyle`, `style` | `display`, keeping the existing deprecation warning |
| `context` | `page`, keeping the existing deprecation warning |
| — | `axis` derived from `$page.Kind` |

The shim passes the legacy class list and emits a deprecation warning naming the
`pages` equivalent. Then delete `childrenGroups.gotmpl`, `pagesGroupBy.gotmpl`,
`groupMerge.gotmpl`, `parseGroupSortParam.gotmpl` and `extractInitialRunes.gotmpl`
— but not `pages.gotmpl`, `pagesTaxonomy.gotmpl` or `pagesTerm.gotmpl`. If two
engines survive this work, it has made things worse.

**Step 6 — repoint the three callers.** `taxonomy.html` and `term.html` need
only `page` and `headinglevel`, since everything else now comes from the kind
defaults. `toc-id.html` calls `pagesQuery.gotmpl` through `partialCached`, keyed
by the page path, so the query runs once per page rather than once for the table
of contents and again for the body.

**Step 7 — CSS.** `theme.css:939` truncates descriptions to one line for
`.children-type-group` alone. That rule exists because grouped taxonomy listings
default to three columns, so its subject is the narrow column: move it to
`.columnize li > p + p`. Add `pages-*` equivalents of the `children-type-*`
rules in `theme.css` and `format-print.css`.

**Step 8 — docs and release notes.** A `pages` page under
`docs/content/shortcodes/`, stating the front-matter channel once in prose as
`params.pages.<name>` rather than repeating it per parameter, together with the
kind defaults. Release
notes for: `type=group` deprecated, the `children` shortcode deprecated, and
front matter now honoured on every page kind.

## Verification

The infra repo (`../hugo-theme-relearn-infra`) holds the suite; run `npm test`
from there, and `node tests/run.js --build=<name> --update` to regenerate.

- The `pages` case (`tests/sites/pages`) has one section per question, fixtures
  shaped so a wrong answer reads as wrong. It covers each field, each function,
  each source, `Level` at `levels > 1`, `flatten` and `kind`, the `Fallback`
  group, numeric group keys past 9, a `groupby` ending in `format`, multi-key
  `orderby` with mixed directions, `where`, `limit`, every display and the
  listing shape, and values that are not plain text: a missing weight, zero,
  lists and maps, and mixed types in one key.
- It covers the seams as well as the features: the `display` fallback guard,
  front matter losing to a shortcode parameter, an empty value against a
  whitespace reset, `cascade`, taxonomy and term pages listed by `pageref`, and
  the `children` shim - whose deprecation warnings, naming the `pages` call
  each is translated into, are listed in full in `warnings.txt`.
- `children-sort` keeps calling `children` and lists its translations in its own
  `warnings.txt`; `params.children.*` on a taxonomy is covered there too.
- **Pin the sort stability multi-key ordering rests on.** A fixture whose pages
  share a grouping key but differ in a secondary one, listed with a two-term
  `orderby` in mixed directions, fails the moment Hugo stops preserving ties.
  Nightly runs against the latest Hugo are what make this worth having.
- Invalid expressions belong in their own section with the warnings listed in
  the site's `warnings.txt` — there, a warning is the assertion.
- Output must be identical on Windows and Linux, and a template's own line
  endings must never reach the content stream.

## Appendix — defects in the current implementation

Do not reproduce these. Where one changes the output of a released `children`
listing, its baseline moves and the diff is the proof.

| Where | Defect |
|---|---|
| `pagesGroupBy.gotmpl:200,209,215,221,227`, `groupMerge.gotmpl:34` | Go's `.Format` cannot read Hugo's `:date_*` tokens, and `:date_long` is the default layout |
| `pagesGroupBy.gotmpl:235,289,317`, `groupMerge.gotmpl:49` | case-sensitive `index` paired with case-insensitive `merge` silently discards a whole group's pages |
| `pagesGroupBy.gotmpl:380` | group order is inferred by searching the layout string for `2006` and `Mon`; the weekday test wins over the year test and matches literal text |
| `pagesGroupBy.gotmpl:257-267` | `grouporder` is passed to Hugo's `GroupByDate`, which also reorders pages inside each group |
| `pagesGroupBy.gotmpl:335-343` | `$needsSort` is false whenever the sort parameters equal the group parameters, so `group=title sort=title` silently keeps Hugo's default order — and `sortorder` alone never applies, because the unset `sort` leaves the field at `default` |
| `pagesGroupBy.gotmpl:234,288` | a page whose grouping field is empty is dropped from the listing without warning |
| `pagesGroupBy.gotmpl:261` | a page with no date groups under the zero time, producing an `0001` heading |
| `pagesGroupBy.gotmpl:273-278` | `group=title` reads `.Title` on one path and `.LinkTitle` on the other |
| `pagesGroupBy.gotmpl:354` | wrapped collections always sort by `.LinkTitle`, ignoring `sort` |
| `pagesTerm.gotmpl:4` | builds its label from `.Title` while every other call site uses `.LinkTitle`, so a page with a distinct `linkTitle` displays inconsistently on term pages |
| `childrenGroups.gotmpl:14` | `sortOrder` is not forwarded, so `sortorder` is ignored for every type but `group` |
| `children.html:35` | a `\| default` chain cannot distinguish `breadcrumb = false` from unset |
| `children.html:87` | `type=index` puts the columnize classes on nested sub-lists, and emits no list at `depth=1` |
| `theme.css:2599` | the mobile `.columnize` rule is dead: equal specificity, declared before `.columnize-N` |
| `toc-id.html:5` | `partialCached` replaced by `partial`, so taxonomy and term pages run the grouping twice |
| `docs/content/categories/_index.en.md` | the `[[cascade]]` block was dropped, so `breadcrumb`/`description` no longer reach term pages |
