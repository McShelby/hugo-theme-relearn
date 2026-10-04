---
name: docs-versioning
description: Guide for adding an archived version of the theme's documentation to the docs. This skill should be used when users want to add the docs of an older release as a version, or when a release turns the current docs into an archived version.
---

# Versioning Old Content

## Overview

The docs can be built with archived versions of themselves, using Hugo's `versions` and the sites matrix of its mounts. The versions are declared in `hugo.toml` and put together by the mounts in `module.toml` of the docs' configuration.

An archived version is not a copy of the docs of its release. It is stored as the difference to the version that followed it:

```
docs/
  content/                    # the current version
  versions/
    <major>/<minor>/
      README.md               # the README of that release
      content/                # only what differs from the next newer version
  config/_default/
    hugo.toml                 # the versions
    module.toml               # the mounts that put each version together
```

A version is named `<major>.<minor>` without a prefix, as Hugo publishes it to a subdirectory of that name and the version switcher shows it as it is.

## How a Version Is Put Together

Each version has its own list of content mounts in `module.toml`, ordered from the version itself to the current content. For the same file, the mount listed first wins.

- The mount of `versions/<major>/<minor>/content` comes first.
- The mounts of every newer archived version follow, newest last.
- The mount of `content` comes last.
- Each mount of a newer source carries a `files` filter that leaves out what did not exist in this version yet. The filters accumulate: an older version repeats the filters of all versions between itself and the current one.

Only content can be versioned this way. Layouts, assets, data and the theme are shared, so an archived page is rendered by the current theme.

## Adding a Version

The version to add is always older than all existing archived versions, or it is the current version that a release is about to archive. Work against the next newer version, called the reference below. What the reference shows for a path is the first hit in its own mount list.

### 1. Get the Content of the Release

Extract `docs/content` and `README.md` of the release tag to a temporary directory inside the repo, as the paths below the scratchpad get too long for Windows.

```powershell
git archive --format=tar -o <scratchpad>\docs.tar <tag> docs/content README.md
tar -xf <scratchpad>\docs.tar -C docs\versions\_src
```

Write the archive to a file. Piping it corrupts it in Windows PowerShell. Remove `docs/versions/_src` when done.

### 2. Sort the Files

Compare each file of the release with what the reference shows for its path.

- **Only in the release**: the page was removed or moved later. Store it.
- **Only in the reference**: the page was added later. Add it to the `files` filters of this version, as a glob for its directory where the whole directory is new.
- **In both and different**: apply the patches of the next step to the old file first, then compare. Store it only if it still differs in substance.
- **Binary files that differ**, like the `featured.png` screenshots: don't store them, the version shows the newer one.

A difference is not substance, and the page stays on the newer file, if it is only

- a typo fix or a rewording without a change in meaning,
- a restyling, like a shortcode call turned into its Markdown notation or a code fence turned into `multiconfig`,
- a call of a docs-local shortcode adapted to its current parameters,
- a changed `weight`, minimal Hugo version or similar housekeeping.

A page that documents an option, a parameter or a behavior differently is substance. So is a page whose newer file links to a page or a heading this version does not have. Those are found by the build of step 5.

### 3. Patch the Stored Files

An archived page must build without a warning from the current theme. Patch as little as that takes and never touch code samples, which are the calls escaped with `/* */`.

- Rename a call of a deprecated shortcode to its replacement where the parameters are the same.
- Replace a live example of a deprecated shortcode by the call its deprecation warning names, so the example keeps rendering.
- Where an example is generated from its parameters by the `multishortcode` shortcode, it can not be replaced. Set `execute="false"`, which prints the example without rendering it.
- Store all text files with LF line endings and keep the file ending of the original.

If a patched file ends up equal to what the reference shows, don't store it.

### 4. README, Home and Config

- Store the `README.md` of the release as `docs/versions/<major>/<minor>/README.md` if its links differ from those of the reference, together with a home page `content/_index.en.md` that includes it from there.
- Add the version to `[versions]` in `hugo.toml`. If the docs have no archived version yet, also set `defaultContentVersion` to the current version and give the existing `content` mount a matrix of that version.
- Add its mounts and filters to `module.toml` as described above.
- If the current version is the one being archived, change `defaultContentVersion` and the version of the unfiltered `content` mount to the new current version.

### 5. Build and Iterate

```powershell
cd docs; hugo build --printPathWarnings --cleanDestinationDir
```

The build is the test. Every warning that the build did not have before the version was added points at something to fix:

- **A link to a page that is not there, in a shared file**: the newer page links to something this version lacks. Store the file of the release for that page.
- **A heading ID that is not found**: a heading was renamed later. Store the file of the release for the page that links to it.
- **A deprecation warning in a stored file**: patch it as in step 3.

Repeat until the build has the same warnings as before the version was added. Then check in the generated HTML of `docs/public` that

- pages added later are missing below the subdirectory of the version,
- pages removed later are present there,
- the version switcher of a page lists all versions and links to the same page in each,
- the warning at the top of an archived page links to the page of the current version.

## Moved Pages

The version switcher finds a page that moved by its aliases. When a page of the current docs moves, add its former path to its `aliases` front matter and keep the ones it already has. A page stored for an archived version keeps the aliases it had in its release.

## What Not to Do

- Don't store a page just because it differs. Every stored file has to be maintained by hand whenever the theme deprecates something it uses.
- Don't edit the text of a stored page beyond what a warning requires. It is the documentation of its release.
- Don't add the content of a release as a full copy, a git worktree or a module import. The docs must build from a plain checkout without network access.
