# Releasing

We are using [gren](https://github.com/github-tools/github-release-notes) to generate the changelog and release notes automatically.

## Once:

- Generate API Token as described in [gren's README.md](https://github.com/github-tools/github-release-notes)
- On Windows do `setx GREN_GITHUB_TOKEN <API TOKEN>` and restart your shell

## Per release:

- Close all issues of the milestone or push them back to an open milestone
- Close the milestone
- Tag and push the repo

  ```shell
  git tag --message "" <tag>
  git push origin <tag>
  ```

- Regenerate CHANGELOG.md with _gren_

  ```shell
  npx github-release-notes@0.17.1 changelog --generate --override --tags=all
  ```

- Add the changelog to git and update the tag

  ```shell
  git add exampleSite/content/basics/CHANGELOG.md
  git commit --message "Ship tag <tag>"
  git push origin main
  git tag --message "" --force <tag>
  git push --force origin <tag>
  ```

- Generate release with _gren_

  ```shell
  npx github-release-notes@0.17.1 release --tags <tag>
  ```
