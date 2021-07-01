# Hugo Relearn Theme

A theme for [Hugo](https://gohugo.io/).

[![wercker status](https://app.wercker.com/status/062e9604da64b79944d87434cb63fa53/s/main "wercker status")](https://app.wercker.com/project/byKey/062e9604da64b79944d87434cb63fa53)

![Overview](https://github.com/McShelby/hugo-theme-relearn/raw/main/images/screenshot.png)

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
- Buttons, Tip/Note/Info/Warning boxes, Expand, Tabs

Visit the [documentation](https://relearn.netlify.app/) for a demo.

## Installation

Navigate to your themes folder in your Hugo site and use the following commands:

```shell
cd themes/
git clone https://github.com/McShelby/hugo-theme-relearn.git
```

Check that your Hugo version is minimum `0.25` with `hugo version`.

## Usage

- [Visit the documentation](https://relearn.netlify.app/)

## License

[MIT licensed.](https://en.wikipedia.org/wiki/MIT_License)

## Credits

Many thanks to [everyone who has contributed](https://github.com/McShelby/hugo-theme-relearn/graphs/contributors) to this project.

Special thanks to [@matcornic](https://github.com/matcornic) for his work on [learn](https://github.com/matcornic/hugo-theme-learn) and [@vjeantet](https://github.com/vjeantet) for his work on [docdock](https://github.com/vjeantet/hugo-theme-docdock), which hugo-theme-relearn is based on.

## Releasing

We are using [gren](https://github.com/github-tools/github-release-notes) to generate the changelog and releasenotes automatically.

In the latest gren release (0.17.3) is a bug in the date generation. Therefore we are using a historical but correct version directly thru `npx`.

Once:

- Generate API Token as described in grens [README.md](https://github.com/github-tools/github-release-notes)
- On Windows do `setx GREN_GITHUB_TOKEN <API TOKEN>` and restart your shell

Per release:

- Close all issues of the milestone or push them back to an open milestone
- Close the milestone
- Tag and push the repo

  ```shell
  git tag <tag>
  git push origin <tag>
  ```

- Generate CHANGELOG.md with _gren_

  ```shell
  npx github-release-notes@0.17.1 changelog --tags=all --generate --override
  ```

- Add the changelog to git and update the tag

  ```shell
  git add CHANGELOG.md
  git commit -m "Ship tag <tag>"
  git push origin main
  git tag -f <tag>
  git push --force origin <tag>
  ```

- Generate release with _gren_

  ```shell
  npx github-release-notes@0.17.1 release --tags <tag>
  ```
