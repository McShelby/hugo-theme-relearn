# Changelog

## 2.4.1 (2021-10-07)

### Fixes

- [**bug**] theme: remove runtime styles from print [#111](https://github.com/McShelby/hugo-theme-relearn/issues/111)

---

## 2.4.0 (2021-10-07)

### Enhancements

- [**feature**] lang: add vietnamese translation [#109](https://github.com/McShelby/hugo-theme-relearn/issues/109)
- [**feature**] theme: simplify stylesheet for color variants [#107](https://github.com/McShelby/hugo-theme-relearn/issues/107)
- [**feature**] hidden pages: remove from RSS feed, JSON, taxonomy etc [#102](https://github.com/McShelby/hugo-theme-relearn/issues/102)
- [**feature**] theme: announce alternative content in header [#101](https://github.com/McShelby/hugo-theme-relearn/issues/101)
- [**feature**] menu: frontmatter option to change sort predicate [#98](https://github.com/McShelby/hugo-theme-relearn/issues/98)
- [**feature**] menu: add default setting for menu expansion [#97](https://github.com/McShelby/hugo-theme-relearn/issues/97)
- [**feature**] theme: improve print style [#93](https://github.com/McShelby/hugo-theme-relearn/issues/93)
- [**feature**] theme: improve style [#92](https://github.com/McShelby/hugo-theme-relearn/issues/92)

### Fixes

- [**bug**] include: don't generate additional HTML if file should be displayed "as is" [#110](https://github.com/McShelby/hugo-theme-relearn/issues/110)
- [**bug**] attachments: fix broken links if multilang config is used [#105](https://github.com/McShelby/hugo-theme-relearn/issues/105)
- [**bug**] theme: fix sticky header to remove horizontal scrollbar [#82](https://github.com/McShelby/hugo-theme-relearn/issues/82)

### Maintenance

- [**task**] chore: update fontawesome [#94](https://github.com/McShelby/hugo-theme-relearn/issues/94)

---

## 2.3.2 (2021-09-20)

### Fixes

- [**bug**] docs: rename history pirate translation [#91](https://github.com/McShelby/hugo-theme-relearn/issues/91)

---

## 2.3.1 (2021-09-20)

### Fixes

- [**bug**] docs: rename english pirate translation to avoid crash on rendering [#90](https://github.com/McShelby/hugo-theme-relearn/issues/90)

---

## 2.3.0 (2021-09-13)

### Fixes

- [**bug**] theme: fix usage of section element [#88](https://github.com/McShelby/hugo-theme-relearn/issues/88)

### Maintenance

- [**task**] theme: ensure IE11 compatiblity [#89](https://github.com/McShelby/hugo-theme-relearn/issues/89)
- [**task**] docs: Arrr! showcase multilang featurrre [#87](https://github.com/McShelby/hugo-theme-relearn/issues/87)

---

## 2.2.0 (2021-09-10)

### Enhancements

- [**feature**] sitemap: hide hidden pages from sitemap and SEO indexing [#85](https://github.com/McShelby/hugo-theme-relearn/issues/85)

### Fixes

- [**bug**] theme: fix showVisitedLinks in case Hugo is configured to modify relative URLs [#86](https://github.com/McShelby/hugo-theme-relearn/issues/86)

### Maintenance

- [**task**] theme: switch from data-vocabulary to schema [#84](https://github.com/McShelby/hugo-theme-relearn/issues/84)

---

## 2.1.0 (2021-09-07)

### Enhancements

- [**feature**] search: open expand if it contains search term [#80](https://github.com/McShelby/hugo-theme-relearn/issues/80)
- [**feature**] menu: scroll active item into view [#79](https://github.com/McShelby/hugo-theme-relearn/issues/79)
- [**feature**] search: disable search in hidden pages [#76](https://github.com/McShelby/hugo-theme-relearn/issues/76)
- [**feature**] search: improve readablility of index.json [#75](https://github.com/McShelby/hugo-theme-relearn/issues/75)
- [**feature**] search: increase performance [#74](https://github.com/McShelby/hugo-theme-relearn/issues/74)
- [**feature**] search: improve search context preview [#73](https://github.com/McShelby/hugo-theme-relearn/issues/73)

### Fixes

- [**bug**] search: hide non-site content [#81](https://github.com/McShelby/hugo-theme-relearn/issues/81)
- [**bug**] menu: always hide hidden sub pages [#77](https://github.com/McShelby/hugo-theme-relearn/issues/77)

---

## 2.0.0 (2021-08-28)

### Enhancements

- [**feature**] tabs: enhance styling [#65](https://github.com/McShelby/hugo-theme-relearn/issues/65)
- [**feature**] theme: improve readability [#64](https://github.com/McShelby/hugo-theme-relearn/issues/64)
- [**feature**] menu: show hidden pages if accessed directly [#60](https://github.com/McShelby/hugo-theme-relearn/issues/60)
- [**feature**] theme: treat pages without title as hidden [#59](https://github.com/McShelby/hugo-theme-relearn/issues/59)
- [**feature**] search: show search results if field gains focus [#58](https://github.com/McShelby/hugo-theme-relearn/issues/58)
- [**feature**] theme: add partial templates for pre/post menu entries [#56](https://github.com/McShelby/hugo-theme-relearn/issues/56)
- [**feature**] theme: make chapter archetype more readable [#55](https://github.com/McShelby/hugo-theme-relearn/issues/55)
- [**feature**] children: add parameter for container style [#53](https://github.com/McShelby/hugo-theme-relearn/issues/53)
- [**feature**] theme: make content a template [#50](https://github.com/McShelby/hugo-theme-relearn/issues/50)
- [**feature**] menu: control menu expansion with alwaysopen parameter [#49](https://github.com/McShelby/hugo-theme-relearn/issues/49)
- [**feature**] include: new shortcode to include other files [#43](https://github.com/McShelby/hugo-theme-relearn/issues/43)
- [**feature**] theme: adjust print styles [#35](https://github.com/McShelby/hugo-theme-relearn/issues/35)
- [**feature**] code highligher: switch to standard hugo highlighter [#32](https://github.com/McShelby/hugo-theme-relearn/issues/32)

### Fixes

- [**bug**] arrow-nav: default sorting ignores ordersectionsby [#63](https://github.com/McShelby/hugo-theme-relearn/issues/63)
- [**bug**] children: default sorting ignores ordersectionsby [#62](https://github.com/McShelby/hugo-theme-relearn/issues/62)
- [**bug**] arrow-nav: fix broken links on (and below) hidden pages [#61](https://github.com/McShelby/hugo-theme-relearn/issues/61)
- [**bug**] theme: remove superflous singular taxonomy from taxonomy title [#46](https://github.com/McShelby/hugo-theme-relearn/issues/46)
- [**bug**] theme: missing --MENU-HOME-LINK-HOVER-color in documentation [#45](https://github.com/McShelby/hugo-theme-relearn/issues/45)
- [**bug**] theme: fix home link when base URL has some path [#44](https://github.com/McShelby/hugo-theme-relearn/issues/44)

### Maintenance

- [**task**] docs: include changelog in exampleSite [#33](https://github.com/McShelby/hugo-theme-relearn/issues/33)

---

## 1.2.0 (2021-07-26)

### Enhancements

- [**feature**] theme: adjust copy-to-clipboard [#29](https://github.com/McShelby/hugo-theme-relearn/issues/29)
- [**feature**] attachments: adjust style between notice boxes and attachments [#28](https://github.com/McShelby/hugo-theme-relearn/issues/28)
- [**feature**] theme: adjust blockquote contrast [#27](https://github.com/McShelby/hugo-theme-relearn/issues/27)
- [**feature**] expand: add option to open on page load [#25](https://github.com/McShelby/hugo-theme-relearn/issues/25)
- [**feature**] expand: rework styling [#24](https://github.com/McShelby/hugo-theme-relearn/issues/24)
- [**feature**] attachments: sort output [#23](https://github.com/McShelby/hugo-theme-relearn/issues/23)
- [**feature**] notice: make restyling of notice boxes more robust [#20](https://github.com/McShelby/hugo-theme-relearn/issues/20)
- [**feature**] notice: fix contrast issues [#19](https://github.com/McShelby/hugo-theme-relearn/issues/19)
- [**feature**] notice: align box colors to common standards [#18](https://github.com/McShelby/hugo-theme-relearn/issues/18)
- [**feature**] notice: use distinct icons for notice box type [#17](https://github.com/McShelby/hugo-theme-relearn/issues/17)

### Fixes

- [**bug**] attachments: support i18n for attachment size [#21](https://github.com/McShelby/hugo-theme-relearn/issues/21)
- [**bug**] notice: support i18n for box labels [#16](https://github.com/McShelby/hugo-theme-relearn/issues/16)
- [**bug**] notice: support multiple blocks in one box [#15](https://github.com/McShelby/hugo-theme-relearn/issues/15)

### Maintenance

- [**task**] dependency: upgrade jquery to 3.6.0 [#30](https://github.com/McShelby/hugo-theme-relearn/issues/30)

---

## 1.1.1 (2021-07-04)

### Maintenance

- [**task**] theme: prepare for new hugo theme registration [#13](https://github.com/McShelby/hugo-theme-relearn/issues/13)

---

## 1.1.0 (2021-07-02)

### Enhancements

- [**feature**] mermaid: expose options in config.toml [#4](https://github.com/McShelby/hugo-theme-relearn/issues/4)

### Fixes

- [**bug**] mermaid: config option for CDN url not used [#12](https://github.com/McShelby/hugo-theme-relearn/issues/12)
- [**bug**] mermaid: only highlight text in HTML elements [#10](https://github.com/McShelby/hugo-theme-relearn/issues/10)
- [**bug**] mermaid: support pan & zoom for graphs [#9](https://github.com/McShelby/hugo-theme-relearn/issues/9)
- [**bug**] mermaid: code fences not always rendered [#6](https://github.com/McShelby/hugo-theme-relearn/issues/6)
- [**bug**] mermaid: search term on load may bomb chart [#5](https://github.com/McShelby/hugo-theme-relearn/issues/5)

### Maintenance

- [**task**] mermaid: update to 8.10.2 [#7](https://github.com/McShelby/hugo-theme-relearn/issues/7)

---

## 1.0.1 (2021-07-01)

### Maintenance

- [**task**] Prepare for hugo showcase [#3](https://github.com/McShelby/hugo-theme-relearn/issues/3)

---

## 1.0.0 (2021-07-01)

### Maintenance

- [**task**] Fork project [#1](https://github.com/McShelby/hugo-theme-relearn/issues/1)
