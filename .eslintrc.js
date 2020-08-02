module.exports = {
    extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
      'plugin:vue/recommended'
    ],
    rules: {
  
      "semi": [2, "never"],
      // override/add rules settings here, such as:
      'vue/no-unused-vars': 'error',
      "vue/no-dupe-keys": ["error", {
        "groups": []
      }],
  
      "vue/no-duplicate-attributes": ["error", {
        "allowCoexistClass": true,
        "allowCoexistStyle": true
      }],
  
      "vue/no-unused-components": ["error", {
        "ignoreWhenBindingPresent": true
      }],
  
      "vue/html-indent": ["error", 2, {
        "attribute": 1,
        "baseIndent": 1,
        "closeBracket": 0,
        "alignAttributesVertically": true,
        "ignores": []
      }],

      "vue/no-multi-spaces": ["error", {
        "ignoreProperties": false
      }],
  
      "vue/prop-name-casing": ["error", "camelCase"],
  
      "vue/singleline-html-element-content-newline": ["error", {
        "ignoreWhenNoAttributes": true,
        "ignoreWhenEmpty": true,
        "ignores": ["pre", "textarea"]
      }],
  
      "vue/v-bind-style": ["error", "shorthand"],
      "vue/v-on-style": ["error", "shorthand"],
      "vue/script-indent": ["error", 2, {
        "baseIndent": 0,
        "switchCase": 0,
        "ignores": []
      }],
      "vue/html-quotes": ["error", "double"],
      "vue/html-self-closing": ["error", {
        "html": {
          "void": "never",
          "normal": "always",
          "component": "always"
        },
        "svg": "always",
        "math": "always"
      }]
    },
  }
  
  // module.exports = {
  //   root: true,
  //   env: {
  //     node: true
  //   },
  //   'extends': [
  //     'plugin:vue/essential',
  //     'eslint:recommended'
  //   ],
  //   rules: {
  //     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  //   },
  //   parserOptions: {
  //     parser: 'babel-eslint'
  //   }
  // }