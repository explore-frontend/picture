module.exports = {
  root: true,
  extends: ['@kwai-explore/eslint-config/preset/vue2-ts'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.vue'],
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
};
