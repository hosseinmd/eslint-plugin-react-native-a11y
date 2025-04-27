// @flow
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
import type { JSXOpeningElement, JSXElement } from 'ast-types-flow';

/**
 * Recursively searches for an child element within a
 * JSXOpeningElement that matches the condition specificed in
 * `callback`
 */
export default function findChild(
  node: TSESTree.JSXChild | TSESTree.SpreadElement | TSESTree.Expression,
  callback: (child: JSXOpeningElement) => boolean
): JSXOpeningElement | null {
  const { type } = node;

  if (type === 'JSXElement' || type === 'JSXFragment') {
    if (type === 'JSXElement') {
      if (node.openingElement && node.openingElement.name) {
        if (callback(node.openingElement)) {
          return node.openingElement;
        }
      }
    }

    const { children } = node;

    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i += 1) {
        // $FlowFixMe
        const child: JSXElement = children[i];

        if (child.openingElement && child.openingElement.name) {
          if (callback(child.openingElement)) {
            return child.openingElement;
          }
        }
        const foundChild = findChild(child, callback);
        if (foundChild) {
          return foundChild;
        }
      }
    }
  } else if (type === 'JSXExpressionContainer') {
    const child = node.expression;
    if (AST_NODE_TYPES.ConditionalExpression === child?.type) {
      for (const element of [child.consequent, child.alternate]) {
        if (element) {
          if (AST_NODE_TYPES.ArrayExpression === element?.type) {
            const foundChild = findChildInArray(element, callback);
            if (foundChild) {
              return foundChild;
            }
          } else {
            const foundChild = findChild(element, callback);
            if (foundChild) {
              return foundChild;
            }
          }
        }
      }
    }
  }

  return null;
}

function findChildInArray(
  { elements }: TSESTree.ArrayExpression,
  callback: (child: JSXOpeningElement) => boolean
) {
  if (elements && elements.length > 0) {
    for (let i = 0; i < elements.length; i += 1) {
      const child = elements[i];

      const foundChild = findChild(child, callback);
      if (foundChild) {
        return foundChild;
      }
    }
  }
}
