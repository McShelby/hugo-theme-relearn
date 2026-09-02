+++
categories = ['explanation', 'howto']
description = 'How to run and extend the automated test suite'
title = 'Testing'
weight = 3
+++

The test suite lives in the [infra repository](development/developing) and runs against a theme checkout. See [Developing](development/developing) for how the two are wired together.

## Requirements

**Node.js** at the version `.nvmrc` pins. Install it through a version manager - [nvm](https://github.com/nvm-sh/nvm), or [nvm-windows](https://github.com/coreybutler/nvm-windows) - rather than as a system package, so the version can follow the project rather than the machine. `nvm use` in the infra checkout reads that file, and so does CI, so the two cannot drift.

The pin is not arbitrary. Before v26.8.1, Node's `fs.rmSync` silently removed nothing on Windows when a path contained a non-ASCII character, which made "replace this directory" quietly mean "merge into it" - and a suite whose whole job is comparing directories cannot live with that.

**Hugo** at least the minimum the theme declares in its `theme.toml`. The plain edition is enough, as the theme uses no Sass. Install it the same way, through [hvm](https://github.com/jmooring/hvm), which keeps several versions side by side - the suite can then build against any of them, including the declared minimum, rather than only the one on your `PATH`.

## Running the Tests

Check both repositories out side by side, then:

````shell
cd hugo-theme-relearn-infra
npm ci
npm test
````

That checks the runner itself, then builds every case, and takes well under a minute.

`npm test` is a wrapper around `tests/run.js`, which is the actual runner. Either form works - these two are the same command:

````shell
npm test -- --build=<name>
node tests/run.js --build=<name>
````

Flags reach the runner directly; through `npm` they have to follow a `--` separator first. The examples below use the runner, being the shorter of the two.

## The Vocabulary

Five words, because a run is not simply a list of sites any more.

| Term | Meaning |
|------|---------|
| Site | content plus the configuration it needs to be itself |
| Axis | a dimension of configuration, each of whose values is a config directory |
| Case | what to build, and how deeply to check it |
| Build | one Hugo invocation - one site, one configuration |
| Result | one output tree, compared as a whole |

Most cases are one site, one configuration, one result. A case that varies an axis produces a result per combination. A case whose builds only mean something as a pair - a versioned site, or the docs and the exampleSite as GitHub Pages serves them - produces several builds sharing one result.

Cases live in `tests/cases/<name>/case.toml` in the infra repository, and reading them is the quickest way to see what the suite covers.

## Shaping a Run

Three parameters, all optional:

| Parameter | Selects | Default |
|-----------|---------|---------|
| `--build` | which builds to run | all of them |
| `--hugo` | which Hugo to build with | each site's own, see below |
| `--update` | rewrite the stored output instead of comparing against it | compare |

### `--build` - run part of the suite

````shell
node tests/run.js --build=minimal
node tests/run.js --build=url-permutations
node tests/run.js --build=url-permutations/urls-relative
````

`--build` matches a path prefix, so naming a case runs everything in it and naming a combination runs the one. A small case takes about a second, which is cheap enough to run on every save while working on one thing.

The accepted names are the ones a run prints. To see them without waiting for a full run, ask for something that does not exist and the runner lists them:

````shell
node tests/run.js --build=?
````

A sequence is the exception: its builds share one tree, so it is named as a whole and a prefix reaching inside it is rejected. A build lifted out of a sequence proves nothing, which is what makes it a sequence.

### `--hugo` - build with a particular version

Left out, each site is built with the version an interactive shell would use in its own directory: the one its `.hvm` file names, or the `hugo` on your `PATH` when there is none. A pin therefore applies to the site it sits beside, and a run can legitimately span several versions. Each site a pin applies to says so in the output, so a result never looks like it came from a version it did not.

Passing `--hugo` overrides every pin and holds the whole run to one version:

````shell
node tests/run.js --hugo=min
node tests/run.js --hugo=latest
node tests/run.js --hugo=v0.150.0
````

`min` is whatever the theme declares in its `theme.toml`, and `latest` the newest release. Anything not already installed is fetched for you.

Use `min` before pushing something that might rely on a newer Hugo feature, and `latest` to see a coming Hugo release before it reaches your users.

### `--update` - rewrite the expected output

When a change legitimately alters what the theme produces, record the new output as the expectation:

````shell
node tests/run.js --update
node tests/run.js --build=<name> --update
````

A full regeneration also prunes: a stored result no case produces any more is deleted rather than left behind. A filtered run does not, having no way to know whether a result it did not build still exists.

Commit the regenerated output together with the change that caused it, never as a commit of its own - otherwise the next person cannot tell which change produced which output.

{{% notice style="warning" %}}
The resulting diff **is** the test result. Read it before committing. An unreviewed regeneration turns the suite from a safety net into a rubber stamp.
{{% /notice %}}

If the change spans both repositories, give both branches the same name; see [Developing](development/developing#working-across-both-repositories).

## Reading a Failure

Every result is checked in three layers, and the one that fails tells you what kind of problem you have.

| Layer | Asserts | A failure usually means |
|-------|---------|-------------------------|
| Build | the build exits cleanly, with no unexpected `WARN` or `ERROR` | a template error, or a Hugo deprecation |
| File set | exactly the expected files were generated | output formats, permalinks or a renamed page |
| Content | every file is what was stored, byte for byte bar line endings | either a regression, or a change you meant to make |

Layers are cumulative, and a case declares how deep to go with `layer`. It defaults to `content`, so a case opts down rather than up and always says why - the theme's own sites stop at the file set, because a content baseline over 2000 files would churn on every prose edit and be read by nobody.

A pinned older Hugo reduces every case to the build layer, since Hugo legitimately changes what it emits between releases and a baseline holds for the version that produced it. The run says when that happened, so a build check never reads as a content check.

## Adding a Case

First decide whether you need a new site at all. If an existing one already renders the thing you changed, extending its content is enough - add a page, regenerate, review the diff.

### A New Site

Everything lives in the infra repository.

1. Create `tests/sites/<name>/` with a `config/_default/` and `content/`. Keep the configuration about the site - a title, output formats, content wiring. Nothing about reproducibility belongs there; that is what naming the `testing` environment does.
2. Write the least content that demonstrates your case. Sites are meant to stay small - a readable diff is the whole point, and one needing hundreds of pages is testing the wrong thing.
3. Add `tests/cases/<name>/case.toml`:

   ````toml
   site        = "<name>"
   environment = "testing"
   ````

4. Generate its expected output, and read it:

   ````shell
   node tests/run.js --build=<name> --update
   ````

5. Look at `tests/expected/<name>/`. This is the moment the case is worth something or not: if the output does not show the behaviour you set out to pin, it will not catch a regression in it either.
6. Commit the site, the case and the expected output together.

### Varying a Configuration

Some behaviour only differs by configuration - URL generation being the standing example, where relative, absolute and ugly URLs are genuinely different paths through the theme.

That is what an axis is for. Each value is a config directory under `tests/axes/<axis>/<value>/`, and a case lists the values it wants:

````toml
site        = "url-permutations"
environment = "testing"

[axes]
  urls = ["relative", "absolute", "ugly"]
````

One content set, three results, compared separately. Adding a further mode is a directory and one more name. An axis with a single value still applies - it just does not branch the tree, so nothing is nested that carries no information.

### Builds That Belong Together

Some results are not one Hugo build. A versioned site is two, each configured to know about the other; the published GitHub Pages site is the docs with the exampleSite beneath it. Neither half says anything alone.

Those spell the sequence out, and share one output tree:

````toml
[[builds]]
  site        = "versioning-current"
  environment = "testing"

[[builds]]
  site        = "versioning-archived"
  environment = "testing"
  dest        = "0.666"
````

`dest` says where in the shared tree a build writes. The builds run in the order written, and the result is compared once, as a whole.

### Accepting a Known Warning

Any `WARN` or `ERROR` fails a build unless it is listed in a baseline. Three are consulted and their entries unioned:

| File | Holds |
|------|-------|
| `tests/warnings.txt` | theme-wide, mostly Hugo deprecations |
| `tests/sites/<site>/warnings.txt` | what a site's own content provokes |
| `tests/cases/<case>/warnings.txt` | what a configuration provokes |

A site's file is checked against the build of that site, so what the docs provoke applies wherever the docs are built. Each entry is a substring; a warning containing it is accepted.

These baselines record outstanding work, not noise to be silenced. Adding an entry means consciously accepting a defect, so delete it as soon as the underlying issue is fixed and let a regression fail the suite again.

## Continuous Integration

This repository runs the suite on every branch and every pull request, and nightly against the latest Hugo release - which is how a Hugo change that breaks the theme is found in CI rather than in an issue report. The infra repository runs nothing; one run tests the pair, and this is where it happens.

That is why a change spanning both repositories is pushed to infra first, then here, and why a change to the suite alone has to be started by hand: see [Developing](development/developing#working-across-both-repositories).

The suite never releases, deploys or publishes anything.
