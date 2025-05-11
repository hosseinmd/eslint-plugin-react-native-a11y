/**
 * @fileoverview Enforce if a view has accessible={true}, that there are no clickable elements inside
 * @author Alex Saunders
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType, getProp, getPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import isTouchable from '../util/isTouchable';
import findChild from '../util/findChild';
import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const errorMessage =
  'Elements with accessible={true} must not have any clickable elements inside';

const schema = generateObjSchema();

const createRule = ESLintUtils.RuleCreator(
  () => 'https://example.com/rule-docs'
);

export default createRule({
  name: 'no-nested-touchables',
  defaultOptions: [],
  meta: {
    docs: {
      description:
        'Enforce if a view has accessible={true}, that there are no clickable elements inside',
    },
    messages: {
      noNested: errorMessage,
    },
    schema: [schema],
    type: 'problem',
  },

  create: (context) => {
    const importedComponents: Set<string> = new Set();

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        if (node.source.value === 'react-native') {
          node.specifiers.forEach((specifier) => {
            if (specifier.type === 'ImportSpecifier') {
              if (specifier.imported.type === 'Identifier') {
                importedComponents.add(specifier.imported.name);
              }
            }
          });
        }
      },

      JSXOpeningElement: (node) => {
        const { parent } = node;

        const accessibleProp = getProp(node.attributes, 'accessible');
        let accessible = getPropValue(accessibleProp);

        if (accessible || isTouchable(node, context)) {
          const clickableChild = findChild(parent, (child) => {
            if (parent.openingElement === child) {
              return false;
            }

            if (
              isTouchable(child, context) ||
              elementType(child) === 'Button'
            ) {
              const accessibleProp = getProp(child.attributes, 'accessible');
              let accessible = getPropValue(accessibleProp);

              if (accessible === false) {
                return false;
              }

              const importantForAccessibilityProp = getProp(
                child.attributes,
                'importantForAccessibility'
              );

              let importantForAccessibility = getPropValue(
                importantForAccessibilityProp
              );

              if (
                importantForAccessibility === 'no-hide-descendants' ||
                importantForAccessibility === 'no'
              ) {
                return false;
              }

              const elType = elementType(child);

              if (importedComponents.has(elType)) {
                return true;
              }
            }
          });
          if (clickableChild) {
            context.report({
              node,
              messageId: 'noNested',
            });
          }
        }
      },
    };
  },
});
