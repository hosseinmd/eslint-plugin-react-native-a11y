/**
 * @fileoverview Enforce if a view has accessible={true}, that there are no clickable elements inside
 * @author Alex Saunders
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import {
  elementType,
  hasProp,
  getLiteralPropValue,
  getProp,
} from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import isTouchable from '../util/isTouchable';
import findChild from '../util/findChild';

const errorMessage =
  'Missing a11y props. Expected to elements without text have accessibilityLabel or ignored by importantForAccessibility';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
    fixable: 'whitespace',
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      if (!isTouchable(node, context)) {
        return;
      }

      if (hasProp(node.attributes, 'accessibilityLabel')) {
        return;
      }

      if (hasProp(node.attributes, 'importantForAccessibility')) {
        const important = getLiteralPropValue(
          getProp(node.attributes, 'importantForAccessibility')
        );

        if (important === 'no-hide-descendants' || important === 'no') {
          return;
        }
      }

      const { parent } = node;

      const textElements = findChild(
        parent,
        (child) =>
          elementType(child) === 'Text' ||
          elementType(child) === 'TextInput' ||
          elementType(child) === 'Animated.Text' ||
          elementType(child) === 'Animated.TextInput'
      );

      if (!textElements) {
        context.report({
          node,
          message: errorMessage,
          data: {
            description:
              'In some situations, it is necessary to add an accessibilityLabel to a touchable element that does not contain any text. This is because screen readers may not be able to determine the purpose of the element without a label. If another component handling this disable it',
          },

          fix: (fixer) => {
            return fixer.insertTextAfterRange(
              // $FlowFixMe
              node.name.range,
              ' accessibilityLabel={}'
            );
          },
        });
      }
    },
  }),
};
