# Hugo Relearn Theme

This repository contains a theme for [Hugo](https://gohugo.io/).

Visit the [theme documentation](https://relearn.netlify.com/en/) to see what is going on. It is actually built with this theme.

[![wercker status](https://app.wercker.com/status/233466a2be73fcea400e7dc02ef6adf9/s/master "wercker status")](https://app.wercker.com/project/byKey/233466a2be73fcea400e7dc02ef6adf9)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FMcShelby%2Fhugo-theme-relearn.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FMcShelby%2Fhugo-theme-relearn?ref=badge_shield)

## Main features

- Automatic Search
- Multilingual mode
- Unlimited menu levels
- Automatic next/prev buttons to navigate through menu entries
- Image resizing, shadow…
- Attachments files
- List child pages
- Mermaid diagram (flowchart, sequence, gantt)
- Customizable look and feel and themes variants
- Buttons, Tip/Note/Info/Warning boxes, Expand

## Installation

Navigate to your themes folder in your Hugo site and use the following commands:

```shell
cd themes/
git clone https://github.com/McShelby/hugo-theme-relearn.git
```

Check that your Hugo version is minimum `0.25` with `hugo version`.

![Overview](https://github.com/McShelby/hugo-theme-relearn/raw/master/images/tn.png)

## Usage

- [Visit the documentation](https://relearn.netlify.com/en/)

## Credits

Many thanks to [@vjeantet](https://github.com/vjeantet/) for the fork [docdock](https://github.com/vjeantet/hugo-theme-docdock). The v2 of this theme is mainly based on his work !

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FMcShelby%2Fhugo-theme-relearn.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FMcShelby%2Fhugo-theme-relearn?ref=badge_large)

## Releasing

Somewhat work-in-progress steps to release with [gren](https://github.com/github-tools/github-release-notes)

- Check all MRs assigned to the milestone are closed or pushed back to another release
- Close the milestone
- Check merged MRs on the milestone have a tag (Bug, Enhancement, etc.)
- Tag and push the repo

  ```shell
  git tag <tag>
  git push origin <tag>
  ```

- Generate CHANGELOG.md with _gren_

  ```shell
  gren changelog  --override --generate --tags=all
  ```

- Fix the date for the current release in CHANGELOG.md
- Add the changelog to git and update the tag

  ```shell
  git add CHANGELOG.md
  git commit -m "Ship tag <tag>"
  git push origin master
  git tag -f <tag>
  git push --force origin <tag>
  ```

- Generate release with _gren_

  ```shell
  gren release -t <tag>
  ```
