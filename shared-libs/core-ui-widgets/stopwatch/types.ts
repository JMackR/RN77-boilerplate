import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface StopwatchTimerProps {
  font: any;
  /**
   * The enter/exit animation duration in milliseconds of a digit.
   */
  animationDuration?: number;
  /**
   * The enter/exit animation delay in milliseconds of a digit.
   */
  animationDelay?: number;
  /**
   * The enter/exit animation distance in dp of a digit.
   */
  animationDistance?: number;
  /**
   * The style of the component View container.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Extra style applied only to each digit, excluding separators.
   */
  digitStyle?: StyleProp<TextStyle>;
  /**
   * Whether the component should work as a stopwatch or as a timer.
   */
  mode?: 'stopwatch' | 'timer';
  /**
   * Initial time in milliseconds
   */
  initialTimeInMs?: number;
  /**
   * The number of zeros for the minutes.
   */
  leadingZeros?: 1 | 2;
  /**
   * Whether the new digit should enter from the top or the bottom.
   */
  enterAnimationType?: 'slide-in-up' | 'slide-in-down';
  /**
   * Callback executed when the timer reaches 0 (only when working in timer mode and initialTimeInMs is provided).
   */
  onFinish?: () => void;
  /**
   * Extra style applied only to separators. In this case, the colon (:) and the comma (,)
   */
  separatorStyle?: StyleProp<TextStyle>;
  /**
   * The style applied to each individual character of the stopwatch/timer.
   */
  textCharStyle?: StyleProp<TextStyle>;
  /**
   * If 0, the component will only display seconds and minutes.
   * If 1, the component will display seconds, minutes and hundredth of ms.
   */
  trailingZeros?: 0 | 1 | 2;
  /**
   * Decimal separator for formatting time. Defaults to a comma (','), but any string can be used for custom formats.
   */
  decimalSeparator?: string;
  /**
   * The interval in milliseconds at which the stopwatch/timer should update. Defaults to 16ms.
   */
  intervalMs?: number;
}

export interface StopwatchTimerMethods {
  /**
   * Starts the stopwatch/timer or resumes it if paused. Has no effect if the stopwatch/timer is already running.
   */
  play: () => void;
  /**
   * Pauses the stopwatch/timer and returns the current elapsed time in milliseconds.
   */
  pause: () => number;
  /**
   * Resets the stopwatch/timer.
   */
  reset: () => void;
  /**
   * Returns the current elapsed time in milliseconds.
   */
  getSnapshot: () => number;
}
