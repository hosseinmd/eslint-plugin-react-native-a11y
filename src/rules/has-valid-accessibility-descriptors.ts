/**
 * @fileoverview Ensures that Touchable* components have appropriate props to communicate with assistive technologies
 * @author JP Driver
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType, hasAnyProp } from 'jsx-ast-utils';
import isTouchable from '../util/isTouchable';
import { generateObjSchema } from '../util/schemas';
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  () => 'https://example.com/rule-docs'
);
const errorMessage =
  'Missing a11y props. Expected one of: accessibilityRole OR role OR BOTH accessibilityLabel + accessibilityHint OR BOTH accessibilityActions + onAccessibilityAction';

const schema = generateObjSchema();

const hasSpreadProps = (attributes) =>
  attributes.some((attr) => attr.type === 'JSXSpreadAttribute');

export default createRule({
  name: 'has-valid-accessibility-descriptors',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensures that accessible components have appropriate props to communicate with assistive technologies',
      url: 'https://example.com/rule-docs',
    },
    schema: [schema],
    fixable: 'whitespace',
    messages: {
      missingA11yProps: errorMessage,
    },
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      if (isTouchable(node, context) || elementType(node) === 'TextInput') {
        if (
          !hasAnyProp(node.attributes, [
            'role',
            'accessibilityRole',
            'accessibilityLabel',
            'accessibilityActions',
            'accessible',
            'importantForAccessibility',
            'accessibilityElementsHidden',
          ]) &&
          !hasSpreadProps(node.attributes)
        ) {
          context.report({
            node,
            messageId: 'missingA11yProps',
            fix: (fixer) => {
              return fixer.insertTextAfterRange(
                // $FlowFixMe
                node.name.range,
                isTouchable(node, context)
                  ? ' accessibilityRole="button"'
                  : ' accessibilityLabel={}'
              );
            },
          });
        }
      }
    },
  }),
});
