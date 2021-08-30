# Guidelines

## For Development

- help us putting your code into production by opening a meaningful issue
- stay simple for the user by focusing on the mantra "convention over configuration"
- at installation the site should work reasonable without (m)any configuration
- stay close to the Hugo way
- don't use npm or any preprocessing, our contributors may not be front-end developers
- document new features in exampleSite
- don't break existing features if you don't have to
- remove reported issue from the browser's console
- be compatible to IE11, at least for main functionality, for Javascript this means:
  - test in IE11
  - check caniuse.com
  - don't use arrow functions
  - don't use template literals
  - don't use other fancy new ES5/6 stuff

## For Release

- create releases following [semver policy](https://semver.org/)
- we are using [gren](https://github.com/github-tools/github-release-notes) to generate the changelog and releases

### One Time Steps

- Generate API Token as described in [gren's README.md](https://github.com/github-tools/github-release-notes)
- On Windows do `setx GREN_GITHUB_TOKEN <API TOKEN>` and restart your shell

### Steps per Release

- close all issues of the milestone or push them back to an open milestone
- close the milestone
- Tag and push the repo

  ```shell
  git tag --message "" <tag>
  git push origin <tag>
  ```

- regenerate changelog with _gren_

  ```shell
  npx github-release-notes@0.17.1 changelog --generate --override --tags=all
  ```

- add the changelog to git and update the tag

  ```shell
  git add exampleSite/content/basics/CHANGELOG.md
  git commit --message "Ship tag <tag>"
  git push origin main
  git tag --message "" --force <tag>
  git push --force origin <tag>
  ```

- generate release with _gren_

  ```shell
  npx github-release-notes@0.17.1 release --tags <tag>
  ```
