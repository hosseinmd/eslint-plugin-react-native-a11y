/**
 * @fileoverview Enforce if a view has accessible={true}, that there are no clickable elements inside
 * @author Alex Saunders
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { generateObjSchema } from '../util/schemas';
// import isTouchable from '../util/isTouchable';
// import findChild from '../util/findChild';
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  () => 'https://example.com/rule-docs'
);

const schema = generateObjSchema();

// ARIA properties that should be replaced with native React Native properties
const ARIA_LABEL_PROPS = [
  'aria-label',
  'aria-labelledby',
  'aria-describedby',
  'aria-hidden',
  'aria-valuemin',
  'aria-valuemax',
  'aria-valuenow',
  'aria-valuetext',
  'role',
];

// Mapping of ARIA properties to React Native native properties
const ARIA_TO_NATIVE_MAP: { [key: string]: string } = {
  'aria-label': 'accessibilityLabel',
  'aria-labelledby': 'accessibilityLabelledBy',
  'aria-describedby': 'accessibilityHint',
  'aria-hidden': 'accessibilityElementsHidden',
  'aria-valuemin': 'accessibilityValue',
  'aria-valuemax': 'accessibilityValue',
  'aria-valuenow': 'accessibilityValue',
  'aria-valuetext': 'accessibilityValue',
  role: 'accessibilityRole',
};

export default createRule({
  name: 'should-use-native-properties',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce use of native accessibility properties instead of ARIA properties',
      url: 'https://example.com/rule-docs',
    },
    messages: {
      useNativeProperty:
        'Use native React Native accessibility property "{{nativeProperty}}" instead of ARIA property "{{ariaProperty}}"',
    },
    schema: [schema],
    fixable: 'code',
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const { attributes } = node;

      // Check each attribute for ARIA properties
      attributes.forEach((attribute) => {
        if (
          attribute.type === 'JSXAttribute' &&
          attribute.name?.type === 'JSXIdentifier'
        ) {
          const propName = attribute.name.name;

          if (ARIA_LABEL_PROPS.includes(propName)) {
            const nativeProperty = ARIA_TO_NATIVE_MAP[propName];

            context.report({
              node: attribute,
              messageId: 'useNativeProperty',
              data: {
                ariaProperty: propName,
                nativeProperty: nativeProperty,
              },
              fix: (fixer) => {
                // Handle special cases for aria-value* properties
                if (propName.startsWith('aria-value')) {
                  const valueKey = propName.replace('aria-value', '');
                  let objectKey: string;

                  switch (valueKey) {
                    case 'min':
                      objectKey = 'min';
                      break;
                    case 'max':
                      objectKey = 'max';
                      break;
                    case 'now':
                      objectKey = 'now';
                      break;
                    case 'text':
                      objectKey = 'text';
                      break;
                    default:
                      objectKey = valueKey;
                  }

                  // Get the original value
                  const originalValue = attribute.value;
                  let valueText = '';

                  if (originalValue?.type === 'JSXExpressionContainer') {
                    // Handle {value} case
                    valueText = context
                      .getSourceCode()
                      .getText(originalValue.expression);
                  } else if (originalValue?.type === 'Literal') {
                    // Handle "value" case
                    valueText = context.getSourceCode().getText(originalValue);
                  } else {
                    // Fallback to the entire value
                    valueText = originalValue
                      ? context.getSourceCode().getText(originalValue)
                      : '""';
                  }

                  return fixer.replaceText(
                    attribute,
                    `accessibilityValue={{${objectKey}: ${valueText}}}`
                  );
                } else {
                  // For non-value properties, just replace the property name
                  return fixer.replaceText(attribute.name, nativeProperty);
                }
              },
            });
          }
        }
      });
    },
  }),
});
