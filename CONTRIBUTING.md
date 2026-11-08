# Contributing to the Relearn Theme

Thanks for thinking about contributing! Bug reports, fixes, new features, translations and documentation improvements are all welcome.

This file is the short version. The full guidelines live in the [Development](https://mcshelby.github.io/hugo-theme-relearn/development) section of the documentation.

## Asking Questions

If you need help with your site rather than want to report a defect, open a [discussion](https://github.com/McShelby/hugo-theme-relearn/discussions). Many questions are already answered in the [documentation](https://mcshelby.github.io/hugo-theme-relearn/).

## Reporting Issues

Open issues in the [theme repository](https://github.com/McShelby/hugo-theme-relearn/issues), even when they concern the tests or the tooling of the [infra repository](https://github.com/McShelby/hugo-theme-relearn-infra). Issues, milestones and releases are all tracked here.

Before opening a new issue, search the existing ones - open and closed - to see if it was already reported.

A good bug report contains

- the version of the theme and of Hugo you are using
- the browser and operating system, if the problem shows in the browser
- the steps to reproduce the problem, ideally with a minimal site or a link to a repository
- what you expected to happen and what happened instead, including messages from Hugo's output or the browser's console

Start the issue title with the affected part of the theme, like `table: make columns sortable`. Describe the problem you want solved rather than only the solution you have in mind.

## Making Changes

For anything beyond a small fix, open an issue first so we can agree on the approach before you invest time into a pull request.

### Setting Up

All you need is Git and [Hugo](https://gohugo.io/installation/) at least in the version declared in `theme.toml`.

````shell
git clone https://github.com/McShelby/hugo-theme-relearn.git
cd hugo-theme-relearn/docs
hugo server
````

This serves the documentation site, built with the theme itself. Swap `docs` for `exampleSite` to work against the simpler starting-point site.

This is enough for most changes. To run the test suite or regenerate the screenshots locally, check out the infra repository as a sibling - see [Developing](https://mcshelby.github.io/hugo-theme-relearn/development/developing) for the full setup and [Testing](https://mcshelby.github.io/hugo-theme-relearn/development/testing) for the suite. Without it, CI verifies your pull request.

### Guidelines

- **Every commit to `main` must be releasable.** Releases happen from `main` at any time without further notice.
- **Convention over configuration.** A site should work reasonably without (m)any configuration.
- **Stay close to Hugo.** Follow the way Hugo does things.
- **No build tools.** Don't add npm or any preprocessing to the theme; contributors may not be front-end developers.
- **Don't break existing features** if you don't have to.
- **Document what you add.** New or changed features need documentation in `docs`, and an entry on the [What's new](https://mcshelby.github.io/hugo-theme-relearn/introduction/releasenotes) page if users have to change their site.
- **Keep the output clean.** No new messages in the browser's console, no unnecessary whitespace and correct indentation of the resulting HTML.

Some things are not covered by the automated tests. Check them by hand against the `docs` site if your change touches them: search, print output, variant switching, shortcode rendering, mobile layout and multilingual navigation.

### Commit Messages

Write commit messages in the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format, always with a scope, followed by the number of the related issue:

````text
feat(table): make columns sortable #1339
````

[Contributing](https://mcshelby.github.io/hugo-theme-relearn/development/contributing#conventional-commits) explains how to pick the type and lists commonly used scopes.

### Pull Requests

- Keep a pull request focused on one issue and reference it in the description.
- If your change also alters what the tests in the infra repository expect, open a branch of the same name there and push it **first** - see [Working Across Both Repositories](https://mcshelby.github.io/hugo-theme-relearn/development/developing#working-across-both-repositories).
- Be prepared for feedback; a maintainer may ask for changes before merging.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](https://github.com/McShelby/hugo-theme-relearn?tab=MIT-1-ov-file) of this project.
