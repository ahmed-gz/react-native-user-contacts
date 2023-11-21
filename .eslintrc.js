module.exports = {
  root: true,
  extends: ["universe/native"],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "import/order": [
      "error",
      {
        "newlines-between": "always-and-inside-groups",
        pathGroups: [
          {
            pattern: "@components/**",
            group: "internal",
            position: "after",
          },
        ],
        distinctGroup: false,
      },
    ],
  },
};
