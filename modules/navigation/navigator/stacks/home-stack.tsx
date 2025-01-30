import { NavigableRoute } from '@tallo/navigation';
import { ProfileMain } from '@tallo/user';

export const HomeStackNavigator = [
 
  {
    name: NavigableRoute.PROFILE_MAIN,
    component: ProfileMain,
    options: { headerShown: true },
  },
  
];
