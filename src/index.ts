import hasAccessibilityHint from './rules/has-accessibility-hint';
import hasAccessibilityProps from './rules/has-accessibility-props';
import hasImportantForAccessibility from './rules/has-important-for-accessibility';
import hasValidAccessibilityActions from './rules/has-valid-accessibility-actions';
import hasValidAccessibilityComponentType from './rules/has-valid-accessibility-component-type';
import hasValidAccessibilityDescriptors from './rules/has-valid-accessibility-descriptors';
import hasValidAccessibilityIgnoresInvertColors from './rules/has-valid-accessibility-ignores-invert-colors';
import hasValidAccessibilityLiveRegion from './rules/has-valid-accessibility-live-region';
import hasValidAccessibilityRole from './rules/has-valid-accessibility-role';
import hasValidAccessibilityState from './rules/has-valid-accessibility-state';
import hasValidAccessibilityStates from './rules/has-valid-accessibility-states';
import hasValidAccessibilityTraits from './rules/has-valid-accessibility-traits';
import hasValidAccessibilityValue from './rules/has-valid-accessibility-value';
import hasValidImportantForAccessibility from './rules/has-valid-important-for-accessibility';
import noNestedTouchables from './rules/no-nested-touchables';
import shouldTouchablesHaveLabel from './rules/should-touchables-have-label';

const defaultConfig = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-native-a11y'],
};

const basicRules = {
  'react-native-a11y/has-accessibility-hint': 'error',
  'react-native-a11y/has-accessibility-props': 'error',
  'react-native-a11y/has-valid-accessibility-actions': 'error',
  'react-native-a11y/has-valid-accessibility-component-type': 'error',
  'react-native-a11y/has-valid-accessibility-descriptors': 'error',
  'react-native-a11y/has-valid-accessibility-role': 'error',
  'react-native-a11y/has-valid-accessibility-state': 'error',
  'react-native-a11y/has-valid-accessibility-states': 'error',
  'react-native-a11y/has-valid-accessibility-traits': 'error',
  'react-native-a11y/has-valid-accessibility-value': 'error',
  'react-native-a11y/no-nested-touchables': 'error',
  'react-native-a11y/should-touchables-have-label': 'error',
};

const iOSRules = {
  'react-native-a11y/has-valid-accessibility-ignores-invert-colors': 'error',
  'react-native-a11y/has-important-for-accessibility': 'error',
};

const AndroidRules = {
  'react-native-a11y/has-valid-accessibility-live-region': 'error',
  'react-native-a11y/has-valid-important-for-accessibility': 'error',
};

export default {
  rules: {
    'has-accessibility-hint': hasAccessibilityHint,
    'has-accessibility-props': hasAccessibilityProps,
    'has-important-for-accessibility': hasImportantForAccessibility,
    'has-valid-accessibility-actions': hasValidAccessibilityActions,
    'has-valid-accessibility-component-type':
      hasValidAccessibilityComponentType,
    'has-valid-accessibility-descriptors': hasValidAccessibilityDescriptors,
    'has-valid-accessibility-ignores-invert-colors':
      hasValidAccessibilityIgnoresInvertColors,
    'has-valid-accessibility-live-region': hasValidAccessibilityLiveRegion,
    'has-valid-accessibility-role': hasValidAccessibilityRole,
    'has-valid-accessibility-state': hasValidAccessibilityState,
    'has-valid-accessibility-states': hasValidAccessibilityStates,
    'has-valid-accessibility-traits': hasValidAccessibilityTraits,
    'has-valid-accessibility-value': hasValidAccessibilityValue,
    'has-valid-important-for-accessibility': hasValidImportantForAccessibility,
    'no-nested-touchables': noNestedTouchables,
    'should-touchables-have-label': shouldTouchablesHaveLabel,
  },
  configs: {
    basic: {
      ...defaultConfig,
      rules: basicRules,
    },
    ios: {
      ...defaultConfig,
      rules: {
        ...basicRules,
        ...iOSRules,
      },
    },
    android: {
      ...defaultConfig,
      rules: {
        ...basicRules,
        ...AndroidRules,
      },
    },
    all: {
      ...defaultConfig,
      rules: {
        ...basicRules,
        ...iOSRules,
        ...AndroidRules,
      },
    },
  },
};
