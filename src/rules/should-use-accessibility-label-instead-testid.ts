import { hasProp, getLiteralPropValue, getProp } from 'jsx-ast-utils';
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  () => 'https://example.com/rule-docs'
);

const errorMessage = 'should use accessibilityLabel instead of testID';
const errorMessageAccessibilityLabel =
  "accessibilityLabel desn't work with importantForAccessibility='no-hide-descendants'";
const errorMessageTestID =
  "testID desn't work with importantForAccessibility='no-hide-descendants'";

export default createRule({
  name: 'should-use-accessibility-label-instead-testid',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'testID should be replaced with accessibilityLabel for better accessibility',
    },
    messages: {
      'missing-a11y-props/should-use-accessibilitylabel-instead-testid':
        errorMessage,
      'missing-a11y-props/should-use-accessibilitylabel-instead-testid-accessibilitylabel':
        errorMessageAccessibilityLabel,
      'missing-a11y-props/should-use-accessibilitylabel-instead-testid-testid':
        errorMessageTestID,
    },
    schema: [
      {
        type: 'object',
        properties: {},
        required: false,
      },
    ],
    fixable: 'code',
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      if (hasProp(node.attributes, 'importantForAccessibility')) {
        const important = getLiteralPropValue(
          getProp(node.attributes, 'importantForAccessibility')
        );

        if (important === 'no-hide-descendants') {
          if (hasProp(node.attributes, 'accessibilityLabel')) {
            const accessibilityLabelProp = getProp(
              node.attributes,
              'accessibilityLabel'
            );

            context.report({
              node,
              messageId:
                'missing-a11y-props/should-use-accessibilitylabel-instead-testid-accessibilitylabel',
              fix: (fixer) => {
                return [fixer.remove(accessibilityLabelProp)];
              },
            });
          }

          if (hasProp(node.attributes, 'testID')) {
            const testIDProp = getProp(node.attributes, 'testID');

            context.report({
              node,
              messageId:
                'missing-a11y-props/should-use-accessibilitylabel-instead-testid-testid',
              fix: (fixer) => {
                return [fixer.remove(testIDProp)];
              },
            });
          }
        }
      }
      if (hasProp(node.attributes, 'testID')) {
        const testIDProp = getProp(node.attributes, 'testID');

        if (hasProp(node.attributes, 'accessibilityLabel')) {
          context.report({
            node,
            messageId:
              'missing-a11y-props/should-use-accessibilitylabel-instead-testid',
            fix: (fixer) => {
              return [fixer.remove(testIDProp)];
            },
          });

          return;
        }

        const testIDValue = getLiteralPropValue(testIDProp);

        context.report({
          node,
          messageId:
            'missing-a11y-props/should-use-accessibilitylabel-instead-testid',
          fix: (fixer) => {
            return [
              fixer.replaceText(
                testIDProp,
                `accessibilityLabel={${testIDValue}}`
              ),
            ];
          },
        });
      }
    },
  }),
});
