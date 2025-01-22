import type { ToggleProps, ButtonPropsWeb } from '@tallo/core-ui-library';

export type FlexibleRowActionType = 'linktext' | 'groupedButton' | 'radio' | 'check' | 'switch' | undefined;
export type FlexibleRowActionProps = string | ButtonPropsWeb | ToggleProps | undefined;
