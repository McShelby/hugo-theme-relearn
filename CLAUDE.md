# CLAUDE.md

This file provides guidance for AI agents when working with code in this repository.

## Overview

Hugo Relearn Theme is a documentation theme for the static site generator [Hugo](https://github.com/gohugoio/hugo), forked from the [Learn](https://github.com/matcornic/hugo-theme-learn) theme. It's designed for creating documentation sites with features like multilingual support, dark mode, search, print support, and extensive shortcodes.

This projects contains its documentation in `docs` which is built with Hugo and the theme itself (eat your own dogfood). A simplified example to be used as a starting point for new users is in `exampleSite`.

### Testing the Theme

The user starts Hugo webserver on the default port (1313). This is prohibited for AI agents which _must_ use port 3131.

```bash
cd docs && hugo server -p 3131 --printPathWarnings --printI18nWarnings --cleanDestinationDir --logLevel info
```

### Configurations

During development cycles, the server is started without an environment option which effectivley only loads the **_default** configuration.

The following other environments are available:

- **testing** - used to test the site during development using `test-hugo.bat`
- **github** - used to release the site on GitHub Pages
- **dev** - used to generate the site similar to GitHub Pages but usable locally
- **performance** - disables all performance intensive features to make building as fast as possible
- **versioning** - used to manually test the versioning feature

To run a specifig configuration

```bash
cd docs && hugo server -p 3131 -e performance
```

### Debugging

If necessary to find a problem, add debug output into the templates.

- To write to the console

  ````go
  {{ warnf "%d %q" math.Counter $thing_to_see }}
  ````

- To write into the resulting HTML (this only works in templates that don't `return` at the end)

  ````go
  {{ printf "\n%d %q" math.Counter $thing_to_see }}
  ````

## Tools

### Screenshots Tool

For development, a tool to automatically generate screenshots for the docs can be run with

```bash
cd tools
npm ci
npm run screenshots
```

## Architecture

### Directory Structure

- **layouts/** - Hugo templates organized by type
  - **_default/** - Base layouts (baseof.html, single.html, list.html, etc.)
  - **partials/** - Reusable template partials
    - **_relearn/** - Core theme helper functions (.gotmpl files)
  - **shortcodes/** - Theme shortcodes (badge, button, card, tabs, mermaid, etc.)
  - **chapter/**, **home/** - Specialized page layouts

- **assets/** - Source files processed by Hugo Pipes
  - **css/** - Stylesheets including theme variants and chroma syntax highlighting
  - **js/** - JavaScript modules (theme.js, search, clipboard, etc.)

- **i18n/** - Translation files (.toml) for 26+ languages

- **archetypes/** - Content templates (default.md, chapter.md, home.md)

- **exampleSite/** - Full demo site used for development
  - **config/_default/** - Base configuration
  - **config/testing/**, **config/github/**, etc. - Environment-specific configs

- **docs/** - Documentation site source (separate from exampleSite)
  - **config/_default/** - Base configuration
  - **config/testing/**, **config/github/**, etc. - Environment-specific configs

### Key Template Concepts

**Partials in `layouts/partials/_relearn/`:**
- `.gotmpl` extension indicates Hugo template functions
- Core utilities: `boxStyle`, `decoratedLink`, `imageAttributes`, `linkAttributes`, `menuObject`, `dependencies`
- These are helper functions, not rendered partials

**Shortcodes:**
- Highly modular - each shortcode in `layouts/shortcodes/`
- Support both inline and block syntax
- Examples: badge, button, card/cards, expand, icon, include, math, mermaid, notice, openapi, tab/tabs, tree

**Dependencies System:**
- Theme uses a dependency loading system defined in `hugo.toml` under `params.relearn.dependencies`
- Dependencies: Math, Mermaid, OpenApi, Search, Theme
- Loaded on-demand based on shortcode usage

### Output Formats

Theme supports custom output formats:
- **print** - Printable versions of pages
- **source** - Markdown source view
- Define in `hugo.toml` under `[outputFormats]`

### Theming System

**Color Variants:**
- Multiple built-in variants in `assets/css/theme-*.css`
- Variants: relearn-light, relearn-dark, relearn-bright, learn, neon, blue, green, red, zen-light, zen-dark
- Users can switch variants via the topbar
- Base theme variables in `assets/css/variables.css`

**Chroma Syntax Highlighting:**
- Separate chroma stylesheets for each variant: `chroma-*.css`

### Search Implementation

- Two search engines supported: Lunr and Orama
- Search files in `assets/js/search*.js`
- Search index generated at build time via `_relearn_searchindex.js`

### JavaScript Architecture

- **theme.js** - Main theme JavaScript
- Modular dependencies loaded from subdirectories:
  - `auto-complete/` - Search autocomplete
  - `clipboard/` - Copy-to-clipboard
  - `lunr/`, `orama/` - Search engines
  - `mathjax/`, `mermaid/`, `d3/` - Feature libraries
  - `perfect-scrollbar/` - Scrollbar customization

## Code Quality Standards

### Commit Message Format

Use [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format.

Common commit types:
- **Common:** build, browser, chore, docs, shortcodes, theme
- **Features:** a11y, archetypes, alias, generator, i18n, mobile, print, rss, variant
- **Structure:** favicon, search, menu, history, scrollbar, nav, toc, clipboard, syntaxhighlight, boxes
- **Shortcodes:** attachments, badge, button, children, expand, icon, include, math, mermaid, notice, openapi, piratify, siteparam, tabs

Example: `search: improve Orama integration for multilingual sites`

### Development Principles

- **Convention over configuration** - Site should work with minimal configuration
- **Stay close to Hugo** - Follow Hugo patterns and conventions
- **No build tools** - Avoid npm/preprocessing for theme itself (contributors may not be front-end developers)
- **Document features** - New features require documentation and release notes entries
- **Backwards compatibility** - Don't break existing features unless necessary
- **Clean output** - Remove console errors, check HTML whitespace and indentation

### Git Hooks

Python-based git hooks in `.githooks/`:
- `pre-push.py` - Pre-push validation

## Important Files

- **hugo.toml** - Theme configuration and module requirements
- **theme.toml** - Theme metadata (name, features, Hugo version)
- **go.mod** - Hugo module definition
- **.prettierrc.json** / **.prettierignore** - Code formatting (Prettier)
- **.editorconfig** - Editor configuration
- **CHANGELOG.md** - Detailed version history

## Content Development

### Front Matter

Standard front matter for content is in TOML format:

````toml
+++
title = "Page Title"
weight = 10  # Ordering in sidebar
+++
````

### Page Types

- **Home** - Site landing page (uses `layouts/home/`)
- **Chapter** - Section pages (uses `layouts/chapter/`)
- **Default** - Regular content pages

### Multilingual Sites

- Translation files in `i18n/*.toml`
- Content organized by language code: `content/en/`, `content/de/`, etc.
- Set `defaultContentLanguage` in hugo.toml

## Testing

Test against the `docs` directory which demonstrates all theme features. Verify:

- Search functionality (both Lunr and Orama)
- Print output
- Theme variant switching
- Shortcodes rendering
- Mobile responsiveness
- Multilingual navigation
- No console errors

## Release Process

Releases happen directly from the `main` branch without prior notice. Every commit to `main` must be production-ready and result in a releasable version.
