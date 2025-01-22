import type { ToggleProps, ButtonPropsNative } from '@tallo/core-ui-library';

export type FlexibleRowActionType = 'linktext' | 'radio' | 'check' | 'switch' | 'button' | undefined;
export type FlexibleRowActionProps = string | ButtonPropsNative | ToggleProps | undefined;
