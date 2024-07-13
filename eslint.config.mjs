import { fixupConfigRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  ...fixupConfigRules(prettierConfig),
  pluginJs.configs.recommended,
  { ignores: ['node_modules', 'dist'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
];
