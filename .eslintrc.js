module.exports = {
  // eslint的校验环境
  env: {
    // 在浏览器环境校验
    browser: true,
    // 校验es的语法
    es2021: true,
    node: true,
    jest: true,
  },
  parser: 'vue-eslint-parser',
  // 规则的继承
  extends: [
    // 全部规则默认是关闭的，这个配置项开启推荐规则
    // 比如：函数不能重名，对象不能出现重复的key
    'eslint:recommended',
    // ts语法规则
    'plugin:@typescript-eslint/recommended',
    // vue3语法规则
    'plugin:vue/vue3-essential',
    'plugin:prettier/recomended',
  ],
  // 要为特定类型的文件指定处理器
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    // 校验ECMA最新版本
    ecmaVersion: 'latest',
    // TS解析器
    parser: '@typescript-eslint/parser',
    // 设置为script（默认）或者module
    sourceType: 'module',
    jsxPrama: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // ESLint支持使用第三方插件，在使用插件之前，必须npm安装它
  // 该eslint-plugin-前缀可以省略
  // 比如eslint-plugin-vue
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    'no-var': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0, // 禁止使用console
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0, // 禁止使用debugger
    'space-before-function-paren': 0, // 函数定义时括号前面要不要有空格
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    'no-unexpected-multiline': 'error', // 禁止空余的多行
    'no-trailing-spaces': 0, // 一行结束后面不要有空格
    'eol-last': 0, // 文件以单一的换行符结束
    'no-unused-vars': 0, // 不能有声明后未被使用的变量或参数
    'padded-blocks': 0, // 块语句内行首行尾是否要空行
    'space-before-blocks': [0, 'always'], // 不以新行开始的块{前面要不要有空格
    indent: [0, 2], //缩进风格

    // typeScript（https://typescript-eslint.io/rules）
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // eslint-plugin-vue (https://eslint.vue.js.org/rules)
    'vue/multi-word-component-names': 'off',
    'vue/script-setup-uses-vars': 'error',
    'vue/no-mutating-props': 'off', // 不允许组件prop改变
    'vue/attribute-hyphenation': 'off',
  },
}
