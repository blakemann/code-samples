export default {
  plugins: [
    '@stylistic/stylelint-plugin',
    'stylelint-scss',
  ],
  ignoreFiles: [
    '**/node_modules/**/*',
    '**/dist/**/*',
  ],
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
  ],
  rules: {
    // core
    'no-empty-source': null,
    'at-rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    'declaration-empty-line-before': null,
    'selector-max-id': null,
    'max-nesting-depth': [4, {
      ignore: ['blockless-at-rules'],
      ignoreAtRules: ['include', 'media'],
    }],
    'selector-class-pattern': null,
    'selector-no-qualifying-type': null,
    'color-named': ['never', {
      ignore: ['inside-function'],
    }],
    'keyframe-selector-notation': 'percentage-unless-within-keyword-only-block',
    'number-max-precision': null,
    'no-descending-specificity': null,
    'custom-property-empty-line-before': null,
    'property-no-vendor-prefix': null,
    'media-feature-range-notation': 'prefix',
    // scss
    'scss/at-rule-no-unknown': true,
    'scss/at-extend-no-missing-placeholder': true,
    'scss/dollar-variable-colon-space-before': null,
    'scss/dollar-variable-empty-line-before': null,
    'scss/partial-no-import': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/at-import-partial-extension': null,
    'scss/double-slash-comment-empty-line-before': null,
    // Stylistic
    '@stylistic/indentation': 2,
    '@stylistic/function-parentheses-newline-inside': 'never-multi-line',
    '@stylistic/function-parentheses-space-inside': 'never-single-line',
    '@stylistic/string-quotes': 'single',
    '@stylistic/color-hex-case': 'lower',
    '@stylistic/unit-case': 'lower',
    '@stylistic/property-case': 'lower',
    '@stylistic/block-closing-brace-newline-after': 'always',
    '@stylistic/block-opening-brace-space-before': 'always',
    '@stylistic/block-opening-brace-space-after': 'always-single-line',
    '@stylistic/block-closing-brace-space-before': 'always-single-line',
    '@stylistic/selector-attribute-brackets-space-inside': 'never',
    '@stylistic/selector-attribute-operator-space-after': 'never',
    '@stylistic/selector-attribute-operator-space-before': 'never',
    '@stylistic/selector-combinator-space-before': 'always',
    '@stylistic/selector-combinator-space-after': 'always',
    '@stylistic/selector-descendant-combinator-no-non-space': true,
    '@stylistic/selector-max-empty-lines': 0,
    '@stylistic/selector-pseudo-class-case': 'lower',
    '@stylistic/selector-pseudo-class-parentheses-space-inside': 'never',
    '@stylistic/selector-pseudo-element-case': 'lower',
    '@stylistic/selector-list-comma-newline-after': 'always-multi-line',
    '@stylistic/selector-list-comma-space-after': 'always-single-line',
    '@stylistic/media-feature-colon-space-after': 'always',
    '@stylistic/media-feature-colon-space-before': 'never',
    '@stylistic/media-feature-name-case': 'lower',
    '@stylistic/media-feature-parentheses-space-inside': 'never',
    '@stylistic/media-feature-range-operator-space-after': 'always',
    '@stylistic/media-feature-range-operator-space-before': 'always',
    '@stylistic/at-rule-name-case': 'lower',
    '@stylistic/no-extra-semicolons': true,
  },
};
