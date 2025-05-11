import {
  hasProp,
  getLiteralPropValue,
  getProp,
  getPropValue,
} from 'jsx-ast-utils';
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  () => 'https://example.com/rule-docs'
);

const errorMessageElementsHidden =
  'Missing a11y props. Expected to have accessibilityElementsHidden={true} for importantForAccessibility="no-hide-descendants"';

const errorMessageImportant =
  'Missing a11y props. Expected to have importantForAccessibility="no-hide-descendants" for accessibilityElementsHidden={true}';

export default createRule({
  name: 'has-important-for-accessibility',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'importantForAccessibility and accessibilityElementsHidden should be used together',
    },
    messages: {
      'missing-a11y-props/importantForAccessibilityAndAccessibilityElementsHidden':
        errorMessageElementsHidden,
      'missing-a11y-props/importantForAccessibility': errorMessageImportant,
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

        let elementsHidden: boolean | undefined = undefined;

        if (hasProp(node.attributes, 'accessibilityElementsHidden')) {
          elementsHidden = getPropValue(
            getProp(node.attributes, 'accessibilityElementsHidden')
          );
        }

        if (important === 'no-hide-descendants' && elementsHidden !== true) {
          context.report({
            node,
            messageId:
              'missing-a11y-props/importantForAccessibilityAndAccessibilityElementsHidden',
            fix: (fixer) => {
              return fixer.insertTextAfterRange(
                // $FlowFixMe
                node.name.range,
                ' accessibilityElementsHidden={true}'
              );
            },
          });
        }
      }

      if (hasProp(node.attributes, 'accessibilityElementsHidden')) {
        const elementsHidden = getPropValue(
          getProp(node.attributes, 'accessibilityElementsHidden')
        );

        let important: string = '';

        if (hasProp(node.attributes, 'importantForAccessibility')) {
          important = getPropValue(
            getProp(node.attributes, 'importantForAccessibility')
          );
        }

        if (elementsHidden === true && important !== 'no-hide-descendants') {
          context.report({
            node,
            messageId: 'missing-a11y-props/importantForAccessibility',
            fix: (fixer) => {
              return fixer.insertTextAfterRange(
                // $FlowFixMe
                node.name.range,
                ' importantForAccessibility="no-hide-descendants"'
              );
            },
          });
        }
      }
    },
  }),
});
