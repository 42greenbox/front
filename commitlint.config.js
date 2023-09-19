module.exports = {
  rules: {
    "type-case": [2, "always", "start-case"],
    "type-enum": [
      2,
      "always",
      [
        "Feat",
        "Update",
        "Docs",
        "Style",
        "Design",
        "Fix",
        "Refact",
        "Chore",
        "Test",
        "Rename",
        "Remove",
        "Build",
      ],
    ],
    "type-empty": [2, "never"],
  },
};
