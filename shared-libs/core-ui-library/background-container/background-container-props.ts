import type { BackgroundColors } from '@tallo/themes';

export interface BackgroundProps {
  /**
   * Determines background color
   * @default: background1
   */
  type?: keyof BackgroundColors;
  borderRadius?: number;
  topRadiusOnly?: boolean;
  /**
   * Optional border color
   */
  style?: any;
  borderColor?: keyof BackgroundColors;
  isOverlay?: boolean;
  children?: React.ReactNode;
  showShadow?: boolean;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
}
