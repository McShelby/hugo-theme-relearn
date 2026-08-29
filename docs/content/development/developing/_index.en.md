+++
categories = ['explanation', 'howto']
description = 'How to set up, and how the theme and its tooling are split'
title = 'Developing'
weight = 2
+++

The theme is developed across two repositories.

| Repository | Contents |
|------------|----------|
| [hugo-theme-relearn](https://github.com/McShelby/hugo-theme-relearn) | The theme itself. Everything here is shipped to users. |
| [hugo-theme-relearn-infra](https://github.com/McShelby/hugo-theme-relearn-infra) | Tests, tooling and CI automation. Nothing here is shipped to users. |

The rule for deciding where something belongs is a single question: **does somebody installing the theme need this file?** If not, it belongs in the infra repository.

{{% notice style="important" title="Where to report" %}}
Open issues in the [theme repository](https://github.com/McShelby/hugo-theme-relearn/issues), even when they concern the tests or the tooling.

Issues, milestones and releases are all tracked there, and a release is cut from a milestone in that repository. A second tracker would split that history apart.
{{% /notice %}}

## Why the Split

For a Hugo theme the repository *is* the distributed artifact. Anything committed to it is downloaded by every user, so a test suite, a screenshot generator and a set of CI actions would be dead weight for every consumer.

The `docs` and `exampleSite` directory stay in the theme repository despite not being needed to run the theme to make the theme self-contained and help to quickly set up a test installation.

## Setting Up

There are two setups. Pick the smaller one unless you need what the larger one adds - most contributions never do.

### The Simple Setup

One repository and Hugo. Nothing else to install.

````shell
git clone https://github.com/McShelby/hugo-theme-relearn.git
cd hugo-theme-relearn/docs
hugo server
````

That serves the documentation site, built with the theme itself, so your changes show up as you save. Swap `docs` for `exampleSite` to work against the simpler starting-point site instead.

This is enough for most changes. If that is what you came to do, stop here.

{{% notice style="note" %}}
You cannot run the test suite in this setup, so your change gets verified by CI rather than by you. Take the second setup if you want the answer before pushing.
{{% /notice %}}

### The Full Setup

Add the infra repository as a sibling of the theme. This is what you need to run the [test suite](development/testing), regenerate the [screenshots](development/screenshooting), or change the CI workflows.

````tree
repos/
├── hugo-theme-relearn/
└── hugo-theme-relearn-infra/
````

````shell
cd hugo-theme-relearn-infra
npm ci
npm test
````

The tooling finds the theme by looking at the `RELEARN_THEME_DIR` environment variable, then a sibling directory named `hugo-theme-relearn`, then the parent directory. The theme is never copied into the infra repository, so the tests always run against a real checkout.

To point the tooling at a checkout somewhere else:

````shell
RELEARN_THEME_DIR=/path/to/hugo-theme-relearn npm test
````

### Git Hooks

Optional, and independent of which setup you chose - the hooks live in the theme repository, in the `.githooks` root folder. Documentation for each hook is contained in each file.

The `post-commit` hook updates the version number on each commit, which is what makes a build from `main` distinguishable from a release when debugging user reports. Nothing depends on you having it.

````sh {title=".git/hooks/post-commit"}
#!/bin/sh
python3 .githooks/post-commit.py
````

## Working Across Both Repositories

When a change spans both repositories - a theme change that alters what the tests expect - give both branches the same name. Every workflow looks for a branch of that name in the other repository, falling back to `main`, and takes that repository's actions from the same checkout. A matching pair is therefore tested against itself.

Each workflow is described on the page for the thing it does: the [test suite](development/testing#continuous-integration) and [releases](development/maintaining#making-releases).
