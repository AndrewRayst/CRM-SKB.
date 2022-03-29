module.exports = {

	env: {
		browser: true,
		es2021: true,
		'lines-around-directive': 'always',
		"jest/globals": true
	},

	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],

	parser: '@typescript-eslint/parser',

	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},

		ecmaVersion: 'latest',

		sourceType: 'module',
	},

	plugins: ['react', '@typescript-eslint', 'prettier', "jest"],

	rules: {
		'prettier/prettier': 'error',
		"jest/no-disabled-tests": "warn",
		"jest/no-focused-tests": "error",
		"jest/no-identical-title": "error",
		"jest/prefer-to-have-length": "warn",
		"jest/valid-expect": "error"
	},
}
