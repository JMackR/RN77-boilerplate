import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {
  EmailPreferences,
  EmailSignin,
  LandingScreen,
  LocationPermissions,
  LoginHelpDialog,
  NotificationPermission,
  useAuthBootstrap,
  WelcomeVideo,
} from '@tallo/authentication';
import { AnimationType } from '@tallo/constants/animation-constants';
import { SplashScreen } from '@tallo/core-ui-widgets';
import { ModalContextProvider } from '@tallo/core-ui-widgets/modal-card/context/modal-provider';
import { NavigableRoute } from '@tallo/navigation';
import {
  ActivityOptionsModal,
  ActivitySavedModal,
  ChangePlansModal,
  DatePickerModal,
  DurationPickerModal,
  ManualTracking,
  PlanCompletionModal,
  PlanConfirmationModal,
  SelectPlanModal,
  UncheckCompletionModal,
  WorkoutCompletionModal,
  WorkoutReview,
  WorkoutTracker,
} from '@tallo/training/index.native';
import { TheWizard } from '@tallo/wizard/src/components';
import { Easing } from 'react-native';
import { AmityProviderNavigation } from './amity-provider-navigation';
import { ModalDialogOverlayOptions, PushPopStackAnimationOptions } from './common-options';
import { commonRoutes } from './common-routes';
import { OnboardingStackNavigator } from './stacks/onboarding-navigator';
import { commonPodcastRoutes } from './stacks/podcast-stack/common-podcast-routes';
import { TabNavigator } from './tab-navigator/tab-navigator';
import { AffirmRejectDialogScreen } from '@tallo/core-ui-widgets';

export const RootNavigator = () => {
  const Stack = createStackNavigator();
  const bootstrap = useAuthBootstrap();


  if (bootstrap.initializing) {
    return <SplashScreen />;
  }

  return (
    <>
      <NavigationContainer>
        <ModalContextProvider>
          {!bootstrap.userAuthorized ? (
            <Stack.Navigator initialRouteName={NavigableRoute.ONBOARDING_LANDING}>
              <Stack.Screen
                name={NavigableRoute.EMAIL_SIGNIN}
                component={EmailSignin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={NavigableRoute.LOGIN_HELP}
                component={LoginHelpDialog}
                options={ModalDialogOverlayOptions}
              />
              <Stack.Screen
                name={NavigableRoute.NOTIFICATION_PERMISSIONS}
                component={NotificationPermission}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={NavigableRoute.EMAIL_PREFERENCES}
                component={EmailPreferences}
                options={{ headerShown: false }}
              />
             
            </Stack.Navigator>
          ) : (
            <AmityProviderNavigation>
              <Stack.Navigator initialRouteName={NavigableRoute.APP_STACK} screenOptions={PushPopStackAnimationOptions}>
                <Stack.Screen
                  name={NavigableRoute.APP_STACK}
                  component={TabNavigator}
                  options={{
                    headerShown: false,
                  }}
                />
                {commonRoutes.map((route) => {
                  return (
                    <Stack.Screen
                      key={route.name}
                      name={route.name}
                      component={route.component}
                      options={route.options}
                    />
                  );
                })}
              </Stack.Navigator>
            </AmityProviderNavigation>
          )}
        </ModalContextProvider>
      </NavigationContainer>
    </>
  );
};
