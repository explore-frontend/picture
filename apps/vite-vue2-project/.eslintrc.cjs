require('@rushstack/eslint-patch/modern-module-resolution');
module.exports = {
    root: true,
    extends: ['@pex/eslint-config/preset/vue2-ts'],
    overrides: [
        {
            files: ['**/*.ts', '**/*.vue'],
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: __dirname,
            },
        },
    ],
};
