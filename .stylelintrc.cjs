module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件
    'stylelint-config-recommended-vue/scss', // 配置vue中scss样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss样式格式化
    'stylelint-config-html/vue' // 配置vue中template样式格式化
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['**/*(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  ignoreFiles:[
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  rules: {
    'value-keyword-case': null, // 在css中使用v-bind不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖
    'function-url-quotes': 'always', // 要求或禁止URL的引号
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性（true为不允许）
    'block-opening-brace-space-before': 'always', // 大括号之前必须有一个空格
    'value-no-vendor-prefix': null, // 关闭属性值前缀 --webkit-box
    'preperty-no-vendor-prefix': null, // 关闭属性前缀 --webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许位置的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep']
      }
    ]
  }
}