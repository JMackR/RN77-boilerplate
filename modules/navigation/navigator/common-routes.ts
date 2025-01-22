import { LogoutDialog } from '@tallo/authentication';

import { GeneralPlanSelection, PlanOverview, PlanSelection, SelectedWorkout, TrainingMain } from '@tallo/training';
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

  {
    name: 'AFFIRM_REJECT_MODAL',
    component: ProfileMain,
    options: { headerShown: false },
  },
  {
    name: 'DATE_ENTRY',
    component: ProfileMain,
    options: { headerShown: false },
  },
  // {
  //   name: NavigableRoute.DATE_PICKER_MODAL,
  //   component: DatePickerModal,
  //   options: { ModalDialogOverlayOptionsSide },
  // },
  {
    name: 'COMPLETION_MODAL',
    component: ProfileMain,
    options: { headerShown: false },
  },
  // {
  //   name: 'SELECT_PLAN_MODAL',
  //   component: SelectPlanModal,
  //   options: { ModalDialogOverlayOptions },
  // },
  {
    name: NavigableRoute.LOGOUT_DIALOG,
    component: LogoutDialog,
    options: ModalDialogOverlayOptions,
  },
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
  {
    name: NavigableRoute.VIEW_PLAN,
    component: TrainingMain,
    options: { headerShown: false },
  },

  {
    name: NavigableRoute.TRAINING_PLANS_SELECT,
    component: SelectedWorkout,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.CHANGE_PLAN_GENERAL,
    component: GeneralPlanSelection,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.CHANGE_PLAN_SELECTION,
    component: PlanSelection,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.CHANGE_PLAN_OVERVIEW,
    component: PlanOverview,
    options: { headerShown: false },
  },
];
