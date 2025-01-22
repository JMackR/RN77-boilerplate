import { BackgroundColors, TextColors } from '@tallo/themes';

export interface DropdownProps {
  items: Array<any>;
  setItems?: () => void;
  value?: null;
  setValue?: any;
  placeholder?: string;
  title?: string;
  testID: string;
  background: keyof BackgroundColors;
  color: keyof TextColors;
}
