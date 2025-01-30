import { LogoutDialog } from '@tallo/authentication';

import { ProfileMain } from '@tallo/user';
import { ModalDialogOverlayOptions } from './common-options';
import { NavigableRoute } from './routes';
// import { PodCastNavigator } from './stacks/podcast-stack/podcast-stack';

export const commonRoutes = [
  // {
  //   name: NavigableRoute.PODCAST_APP,
  //   component: PodCastNavigator,
  //   options: FullScreenModalOptions,
  // },

  //{
  //  name: 'AFFIRM_REJECT_MODAL',
  //  component: ProfileMain,
  //  options: { headerShown: false },
  //},

  // {
  //   name: NavigableRoute.DATE_PICKER_MODAL,
  //   component: DatePickerModal,
  //   options: { ModalDialogOverlayOptionsSide },
  // },
  //{
  //  name: 'COMPLETION_MODAL',
  //  component: ProfileMain,
  //  options: { headerShown: false },
  //},
  // {
  //   name: 'SELECT_PLAN_MODAL',
  //   component: SelectPlanModal,
  //   options: { ModalDialogOverlayOptions },
  // },
  //{
  //  name: NavigableRoute.LOGOUT_DIALOG,
  //  component: LogoutDialog,
  //  options: ModalDialogOverlayOptions,
  //},
  {
    name: 'LOCATION_REQUEST',
    component: ProfileMain,
    options: { headerShown: false },
  },
  {
    name: 'PUSHNOTIFICATION_REQUEST',
    component: ProfileMain,
    options: { headerShown: false },
  },
 
];
