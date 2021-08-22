module.exports = {
  changelogFilename: "CHANGELOG.md",
  dataSource: "milestones",
  groupBy: {
    "Enhancements": [
      "feature",
    ],
    "Bug Fixes": [
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
    "discussion",
    "documentation",
    "duplicate",
    "hugo",
    "invalid",
    "support",
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
