/**
 * @fileoverview Describes the current state of a component to the user of an assistive technology.
 * @author JP Driver
 * @flow
 */

import type { JSXOpeningElement } from 'ast-types-flow';
import {
  hasProp,
  getLiteralPropValue,
  getProp,
  getPropValue,
} from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import type { ESLintContext } from '../../flow/eslint';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessageElementsHidden =
  'Missing a11y props. Expected to have accessibilityElementsHidden={true} for importantForAccessibility="no-hide-descendants"';

const errorMessageImportant =
  'Missing a11y props. Expected to have importantForAccessibility="no-hide-descendants" for accessibilityElementsHidden={true}';

module.exports = {
  meta: {
    docs: {},
    schema: [generateObjSchema()],
    fixable: 'code',
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (hasProp(node.attributes, 'importantForAccessibility')) {
        const important = getLiteralPropValue(
          getProp(node.attributes, 'importantForAccessibility')
        );

        let elementsHidden: boolean;

        if (hasProp(node.attributes, 'accessibilityElementsHidden')) {
          elementsHidden = getPropValue(
            getProp(node.attributes, 'accessibilityElementsHidden')
          );
        }

        if (important === 'no-hide-descendants' && elementsHidden !== true) {
          context.report({
            node,
            message: errorMessageElementsHidden,
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

        let important: string;

        if (hasProp(node.attributes, 'importantForAccessibility')) {
          important = getPropValue(
            getProp(node.attributes, 'importantForAccessibility')
          );
        }

        if (elementsHidden === true && important !== 'no-hide-descendants') {
          context.report({
            node,
            message: errorMessageImportant,
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
};
