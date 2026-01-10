---
name: hugo-runner
description: Guide for running Hugo static site generator. This skill should be used when users want to test changes.
---

# Hugo

## Overview

[Hugo](https://github.com/gohugoio/hugo) converts source files from content formats to output formats. In production it only creates files. For development it has an integrated webserver.

The conversion from content to output is controlled by configuration and template files.

The docs are at [https://gohugo.io/documentation/](https://gohugo.io/documentation/)

## Preparation Before Run

- If a specific Hugo version is required use [hvm](hvm.md) to install it in the working directory; this also applies to version keywords like `latest`, `oldest`, `minimal`

  `latest` is supported by `hvm`. If the user requiers `oldest` or `minimal`, look into `theme.toml` under `module.hugoVersion.min`:

  - `hvm use latest` - Use the latest Hugo version
  - `hvm use 0.166.0` - Use a specific version if minimal version is 0.166.0

## Usage

Run the webserver for testing changes.

### Run the Webserver

Run the Hugo's development webserver on a non-default port of 3131.

```cmd
cd <directory-of-content-directory> && hugo server -p 3131
```

To run Hugo's webserver on the default port 1313 (which is often blocked)

```cmd
cd <directory-of-content-directory> && hugo server
```

To only generate the website to the filesystem but don't serve it

```cmd
cd <directory-of-content-directory> && hugo build
```

### Parameters Help

If you need a full understanding of all available parameters

```cmd
hugo help
```

### Usage Notes

- Always run Hugo from inside the working directory
- Access the site at [http://localhost:3131](http://localhost:3131)
- The files that Hugo generates and afterwards serves are stored in `public` of the working directory
- Source Markdown files of `content/*` can be accessed as their output representation by `http://localhost:3131/*` or `public/*`
- Press Ctrl+C to stop the server
- Watch stdout/stderr for build warnings and errors

### Build Validation (AI agents)

**Run `hugo build` to capture build output afterwards.** The server never exits, so any attempt to wait for its output (e.g. `TaskOutput`) will time out.

For build validation, run a **one-shot build** that exits after completion:

```bash
cd <directory-of-content-directory> && hugo build --printPathWarnings --printI18nWarnings --cleanDestinationDir --logLevel info 2>&1
```

`-p` is a `hugo server` option. `hugo build` serves nothing and has no port, so passing it there fails with `unknown shorthand flag: 'p'`.

The generated HTML is written to `public/` and can be inspected directly with `grep` or file-read tools afterwards.
