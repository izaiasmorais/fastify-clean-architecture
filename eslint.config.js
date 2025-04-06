import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.config({
		plugins: ["unused-imports", "@typescript-eslint"],
		extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
		parser: "@typescript-eslint/parser",
		parserOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
		env: {
			es2021: true,
			node: true,
		},
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"unused-imports/no-unused-imports": "warn",
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
		},
	}),
];

export default eslintConfig;
