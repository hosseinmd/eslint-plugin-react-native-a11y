# should-use-native-properties

React Native provides native accessibility properties that should be used instead of ARIA properties from web development. This rule enforces the use of React Native's native accessibility properties to ensure proper accessibility support across iOS and Android platforms.

## Rule details

This rule detects ARIA properties and suggests their React Native native equivalents. It also provides automatic fixes to replace ARIA properties with the correct native properties.

### ARIA Properties and Their Native Equivalents

| ARIA Property      | React Native Property                | Description                                                 |
| ------------------ | ------------------------------------ | ----------------------------------------------------------- |
| `aria-label`       | `accessibilityLabel`                 | Provides an accessible name for the element                 |
| `aria-labelledby`  | `accessibilityLabelledBy`            | References other elements that describe the current element |
| `aria-describedby` | `accessibilityHint`                  | Provides additional description for the element             |
| `aria-hidden`      | `accessibilityElementsHidden`        | Hides the element from accessibility services               |
| `aria-valuemin`    | `accessibilityValue={{min: value}}`  | Minimum value for range controls                            |
| `aria-valuemax`    | `accessibilityValue={{max: value}}`  | Maximum value for range controls                            |
| `aria-valuenow`    | `accessibilityValue={{now: value}}`  | Current value for range controls                            |
| `aria-valuetext`   | `accessibilityValue={{text: value}}` | Human-readable text alternative for the current value       |
| `role`             | `accessibilityRole`                  | Defines the element's purpose or type                       |

### Succeed

```jsx
<View accessibilityLabel="Hello World" />
<Text accessibilityHint="This provides additional context" />
<TouchableOpacity accessibilityRole="button" />
<View accessibilityElementsHidden={true} />
<Slider accessibilityValue={{min: 0, max: 100, now: 50}} />
<Text accessibilityLabelledBy="header-id" />
```

### Fail

```jsx
<View aria-label="Hello World" />
<Text aria-describedby="This provides additional context" />
<TouchableOpacity role="button" />
<View aria-hidden={true} />
<Slider aria-valuemin={0} />
<Slider aria-valuemax={100} />
<Slider aria-valuenow={50} />
<Slider aria-valuetext="50 percent" />
<Text aria-labelledby="header-id" />
```

### Auto-fix Examples

The rule provides automatic fixes for all detected ARIA properties:

```jsx
// Before
<View aria-label="Hello" aria-hidden={true} />

// After (auto-fixed)
<View accessibilityLabel="Hello" accessibilityElementsHidden={true} />
```

```jsx
// Before
<Slider aria-valuemin={0} aria-valuemax={100} />

// After (auto-fixed)
<Slider accessibilityValue={{min: 0}} accessibilityValue={{max: 100}} />
```

### References

1. [React Native Docs - Accessibility](https://reactnative.dev/docs/accessibility)
2. [React Native Docs - accessibilityLabel](https://reactnative.dev/docs/accessibility#accessibilitylabel)
3. [React Native Docs - accessibilityHint](https://reactnative.dev/docs/accessibility#accessibilityhint)
4. [React Native Docs - accessibilityRole](https://reactnative.dev/docs/accessibility#accessibilityrole)
5. [React Native Docs - accessibilityValue](https://reactnative.dev/docs/accessibility#accessibilityvalue)
