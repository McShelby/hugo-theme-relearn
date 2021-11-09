+++
title = "Test page"
weight = 3
+++

## The page for test link

Good text end Good link
```text
[Content]({{\% relref "/cont/_index.en.md#content" \%}})
```
[Content]({{% relref "/cont/_index.en.md#content" %}}) good link

[Red variant]({{% relref "/basics/customization/_index.en.md#red-variant" %}}) good link

[Red variant]({{% relref "/basics/customization/_index.en.md#rred-vvarriant" %}}) bad link

---

good path bad link `[Basic configuration]({{\% relref "/cont/menushortcuts.en.md#bassiccc-config" \%}})`
[Basic configuration]({{< relref "/cont/menushortcuts.en.md#bassiccc-config" >}}) link to page
`#bassiccc-config` link and WARN is not exist,

---

good path good link `[Multilingual mode]({{\< relref "/cont/menushortcuts.en.md#i18n" \>}})`
#### relref: ({{< relref "/cont/menushortcuts.en.md#i18n" >}})
[Multilingual mode]({{< relref "/cont/menushortcuts.en.md#i18n" >}})
- link to page only, no WARN
---

page is not exist `[Multilingual mode]({{\% relref "/cont/menu-shortcustt.en.md#i18n" \%}})`
#### relref: ({{< relref "/cont/menu-shortcustt.en.md#i18n" >}})
[Multilingual mode]({{< relref "/cont/menu-shortcustt.en.md#i18n" >}})
- link to `http://localhost:1313/cont/test-page/` and WARN

---
