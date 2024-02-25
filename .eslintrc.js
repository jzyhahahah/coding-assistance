module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-order'],
  rules: {
    'selector-class-pattern': null, // 选择器命名规则关闭
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ], // 忽略 react 中的 global
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['/^page/']
      }
    ],
    'no-descending-specificity': null, // 取消选择器逐级提高
    'scss/no-global-function-names': null, // 关闭全局函数检测
    'scss/at-extend-no-missing-placeholder': null, // 关闭占位符需求检测
    'font-family-no-missing-generic-family-keyword': null, // font-family 通用字体系列关键字检测关闭
    'no-invalid-position-at-import-rule': null, // 关闭检测 @import 位置
    'react/prop-types': null,
    'indent': null, // 关闭缩进检测
    'scss/dollar-variable-pattern': null, // 关闭scss变量命名规则检测
    'order/properties-order': [
      // css属性顺序
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'font-size',
      'font-family',
      'font-weight',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ]
  }
};
