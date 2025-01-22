// import type { AnalyticsProps } from "@tallo/analytics";
import { BackgroundColors } from '@tallo/themes/';
import { FontWeight, TextColors, TextTypes } from '@tallo/themes/type-defs';
import type { ButtonProps, LayoutChangeEvent, ViewStyle } from 'react-native';
import type { LocalSVGSource } from '../image';


export type ButtonType =
  | 'primary'
  | 'inverse'
  | 'outline'
  | 'date-picker'
  | 'brand-alt'
  | 'text'
  | 'opaque'
  | 'floating-button'
  | 'back-button'
  | 'disabled';

export type ButtonSize = 'large' | 'medium' | 'small' | 'floating' | 'back';

export interface ButtonPropsBase extends ButtonProps {
  /**
   * Text to display inside the button
   */
  overRideTitleStyle?: ViewStyle;
  overideButtonStyle?: any;
  clearIcon?: JSX.Element | LocalSVGSource;
  titleSize?: number;
  pressedTitle?: string;
  header?: string;
  placeholder?: string;
  titleStyle?: any;
  /**
   * Optional, used to override the default color of text inside the button
   */
  titleColor?: keyof TextColors;
  pressedTitleColor?: keyof TextColors;
  titleDecoration?: 'none' | 'underline' | 'line-through' | 'underline line-through';
  /**
   * Optional subtitle to display below the button text
   */
  subtitle?: string;

  buttonType: ButtonType;
  buttonColor?: keyof BackgroundColors;
  buttonSize: ButtonSize;

  boxShadow?: string;

  /*
   * Removes left and right padding to the button
   */
  doNotApplySidePadding?: boolean;

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string | undefined;

  leftIcon?: JSX.Element | LocalSVGSource;
  centerIcon?: JSX.Element | LocalSVGSource;
  rightIcon?: JSX.Element | LocalSVGSource;
  /**
   * If true, disable all interactions for this component.
   */
  disabled?: boolean | undefined;
  onClear?: boolean | undefined;
  /**
   * TV next focus down (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusDown?: number | undefined;
  onPressHint?: string;
  /**
   * TV next focus forward (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusForward?: number | undefined;

  /**
   * TV next focus left (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusLeft?: number | undefined;

  /**
   * TV next focus right (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusRight?: number | undefined;

  /**
   * TV next focus up (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusUp?: number | undefined;

  /**
   * Text to display for blindness accessibility features
   */
  accessibilityLabel?: string | undefined;

  loading?: boolean;
  loader?: boolean;

  /**
   * When true, there is no button radius
   */
  noRadius?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  tint?: keyof TextColors;
  /**
   * Handler to be called when the user taps the button
   */
  onClick?: () => Promise<void>;

  onLongClick?: () => Promise<void>;

  weight?: FontWeight;
}
