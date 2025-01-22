import type { BackgroundColors } from '@tallo/themes/colors';

export interface BackgroundProps {
  /**
   * Determines background color. Choose from background color functions or transparent
   * @default: background1
   */
  type?: BackgroundColors;
  borderRadius?: number;
  isOverlay?: boolean;
  children?: React.ReactNode;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
}
