module.exports = {
  changelogFilename: "exampleSite/content/basics/CHANGELOG.md",
  dataSource: "milestones",
  groupBy: {
    "Enhancements": [
      "feature",
    ],
    "Fixes": [
      "bug"
    ],
    "Maintenance": [
      "task",
    ],
    "Uncategorised": [
      "closed",
    ],
  },
  ignoreLabels: [
    "blocked",
    "browser",
    "helpwanted",
    "hugo",
    "mermaid",
    "needsfeedback",
    "undecided",
  ],
  ignoreIssuesWith: [
    "discussion",
    "documentation",
    "duplicate",
    "invalid",
    "unresolved",
    "wontfix",
  ],
  ignoreTagsWith: [
    "Relearn",
  ],
  milestoneMatch: "{{tag_name}}",
  onlyMilestones: true,
  template: {
    group: "\n### {{heading}}\n",
    release: ({ body, date, release }) => `## ${release} (` + date.replace( /(\d+)\/(\d+)\/(\d+)/, '$3-$2-$1' ) + `)\n${body}`,
  },
};
