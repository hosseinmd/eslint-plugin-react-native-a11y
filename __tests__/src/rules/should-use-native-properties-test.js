/* eslint-env jest */
/**
 * @fileoverview Enforce use of native accessibility properties instead of ARIA properties
 * @author Alex Saunders
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/should-use-native-properties';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run('should-use-native-properties', rule, {
  valid: [
    {
      code: '<View accessibilityLabel="Hello" />',
    },
    {
      code: '<Text accessibilityHint="This is a hint" />',
    },
    {
      code: '<TouchableOpacity accessibilityRole="button" />',
    },
    {
      code: '<View accessibilityElementsHidden={true} />',
    },
    {
      code: '<Slider accessibilityValue={{min: 0, max: 100, now: 50}} />',
    },
    {
      code: '<View accessibilityLabelledBy="some-id" />',
    },
    {
      code: '<View testID="test-element" />',
    },
    {
      code: '<View style={{backgroundColor: "red"}} />',
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: '<View aria-label="Hello" />',
      errors: [
        {
          message:
            'Use native React Native accessibility property "accessibilityLabel" instead of ARIA property "aria-label"',
          type: 'JSXAttribute',
        },
      ],
      output: '<View accessibilityLabel="Hello" />',
    },
    {
      code: '<Text aria-describedby="some-description" />',
      errors: [
        {
          message:
            'Use native React Native accessibility property "accessibilityHint" instead of ARIA property "aria-describedby"',
          type: 'JSXAttribute',
        },
      ],
      output: '<Text accessibilityHint="some-description" />',
    },
    {
      code: '<TouchableOpacity role="button" />',
      errors: [
        {
          message:
            'Use native React Native accessibility property "accessibilityRole" instead of ARIA property "role"',
          type: 'JSXAttribute',
        },
      ],
      output: '<TouchableOpacity accessibilityRole="button" />',
    },
    {
      code: '<View aria-hidden={true} />',
      errors: [
        {
          message:
            'Use native React Native accessibility property "accessibilityElementsHidden" instead of ARIA property "aria-hidden"',
          type: 'JSXAttribute',
        },
      ],
      output: '<View accessibilityElementsHidden={true} />',
    },
    {
      code: '<View aria-labelledby="some-id" />',
      errors: [
        {
          message:
            'Use native React Native accessibility property "accessibilityLabelledBy" instead of ARIA property "aria-labelledby"',
          type: 'JSXAttribute',
        },
      ],
      output: '<View accessibilityLabelledBy="some-id" />',
    },
    {
      code: '<Slider aria-valuemin={0} />',
      errors: [
        {
          message:
            'Use native React Native accessibility property "accessibilityValue" instead of ARIA property "aria-valuemin"',
          type: 'JSXAttribute',
        },
      ],
      output: '<Slider accessibilityValue={{min: 0}} />',
    },
    {
      code: '<Slider aria-valuemax={100} />',
      errors: [
        {
          message:
            'Use native React Native accessibility property "accessibilityValue" instead of ARIA property "aria-valuemax"',
          type: 'JSXAttribute',
        },
      ],
      output: '<Slider accessibilityValue={{max: 100}} />',
    },
    {
      code: '<Slider aria-valuenow={50} />',
      errors: [
        {
          message:
            'Use native React Native accessibility property "accessibilityValue" instead of ARIA property "aria-valuenow"',
          type: 'JSXAttribute',
        },
      ],
      output: '<Slider accessibilityValue={{now: 50}} />',
    },
    {
      code: '<Slider aria-valuetext="50 percent" />',
      errors: [
        {
          message:
            'Use native React Native accessibility property "accessibilityValue" instead of ARIA property "aria-valuetext"',
          type: 'JSXAttribute',
        },
      ],
      output: '<Slider accessibilityValue={{text: "50 percent"}} />',
    },
    {
      code: '<Slider aria-valuemin="0" />',
      errors: [
        {
          message:
            'Use native React Native accessibility property "accessibilityValue" instead of ARIA property "aria-valuemin"',
          type: 'JSXAttribute',
        },
      ],
      output: '<Slider accessibilityValue={{min: "0"}} />',
    },
    {
      code: '<Slider aria-valuemax={maxValue} />',
      errors: [
        {
          message:
            'Use native React Native accessibility property "accessibilityValue" instead of ARIA property "aria-valuemax"',
          type: 'JSXAttribute',
        },
      ],
      output: '<Slider accessibilityValue={{max: maxValue}} />',
    },
    {
      code: '<View aria-label="Hello" aria-hidden={true} />',
      errors: [
        {
          message:
            'Use native React Native accessibility property "accessibilityLabel" instead of ARIA property "aria-label"',
          type: 'JSXAttribute',
        },
        {
          message:
            'Use native React Native accessibility property "accessibilityElementsHidden" instead of ARIA property "aria-hidden"',
          type: 'JSXAttribute',
        },
      ],
      output:
        '<View accessibilityLabel="Hello" accessibilityElementsHidden={true} />',
    },
  ].map(parserOptionsMapper),
});
