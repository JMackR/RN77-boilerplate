import { ContentReader, Dashboard } from '@tallo/dashboard';
import { NavigableRoute } from '@tallo/navigation';
import { WorkoutTracker } from '@tallo/training/index.native';
import { ManageAccount, ManageBiometrics, ManageNotifications, ManageProfile, ProfileMain, SupportForm } from '@tallo/user/index.native';
import { FadeInFullScreen } from '../common-options';

export const HomeStackNavigator = [
  {
    name: NavigableRoute.HOME,
    component: Dashboard,
    options: FadeInFullScreen,
  },
  {
    name: 'PROFILE_MAIN',
    component: ProfileMain,
    options: { headerShown: false },
  },
  {
    name: 'MANAGE_PROFILE',
    component: ManageProfile,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.MANAGE_ACCOUNT,
    component: ManageAccount,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.SUPPORT,
    component: SupportForm,
    options: { headerShown: false },
  },
  {
    name: 'NOTIFICATIONS_MANAGEMENT',
    component: ManageNotifications,
    options: { headerShown: false },
  },
  {
    name: 'BIOMETRICS_MANAGEMENT',
    component: ManageBiometrics,
    options: { headerShown: false },
  },
  {
    name: 'CONTENT_READER',
    component: ContentReader,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.RUN_TRACKER,
    component: WorkoutTracker,
    options: { headerShown: false },
  },
];
