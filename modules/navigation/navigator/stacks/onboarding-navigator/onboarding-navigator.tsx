import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { AnimationType } from '@tallo/constants/animation-constants';
import { TheWizard } from '@tallo/wizard/src/components';
import { Easing } from 'react-native';
import type { NavigationPayload } from '../../../types';
import { NavigableRoute } from '../../routes';

export type OnboardingStackNavigatorParamList = {
  [NavigableRoute.ONBOARDING_NAV]: NavigationPayload<undefined>;
  [NavigableRoute.ONBOARDING_LANDING]: NavigationPayload<undefined>;
  [NavigableRoute.EMAIL_SIGNIN]: NavigationPayload<undefined>;
  [NavigableRoute.EMAIL_VERIFICATION]: NavigationPayload<undefined>;
  [NavigableRoute.BIOMETRICS]: NavigationPayload<undefined>;
};

const Stack = createStackNavigator();

export const OnboardingStackNavigator: React.FC = () => {
  return <OnboardingStackRoutes />;
};

const OnboardingStackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavigableRoute.ONBOARDING_NAV}
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen
        name={NavigableRoute.ONBOARDING_NAV}
        component={TheWizard}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: AnimationType.Opens,
                easing: Easing.out(Easing.ease),
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: AnimationType.ExitsAndClosings,
                easing: Easing.out(Easing.ease),
              },
            },
          },
        }}
      />
    </Stack.Navigator>
  );
};
