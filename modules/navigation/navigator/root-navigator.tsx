import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {

  //EmailSignin,

  //LocationPermissions,
  //LoginHelpDialog,
  //NotificationPermission,
  useAuthBootstrap,
 
} from '@tallo/authentication';
//import { AnimationType } from '@tallo/constants/animation-constants';
//import { SplashScreen } from '@tallo/core-ui-widgets';
//import { ModalContextProvider } from '@tallo/core-ui-widgets/modal-card/context/modal-provider';
import { NavigableRoute } from '@tallo/navigation';

//import { Easing } from 'react-native';
//import {  PushPopStackAnimationOptions } from './common-options';
//import { commonRoutes } from './common-routes';
import { TabNavigator } from './tab-navigator/tab-navigator';
import React from 'react';
//import { HomeStackNavigator } from './stacks/home-stack';
//import { ProfileMain } from '@tallo/user';

export const RootNavigator = () => {
  const Stack = createStackNavigator();
  //const bootstrap = useAuthBootstrap();


  //if (bootstrap.initializing) {
  //  return <SplashScreen />;
  //}

  return (

						  <Stack.Navigator initialRouteName={NavigableRoute.APP_STACK}  >
							<Stack.Screen
								name={NavigableRoute.APP_STACK}
								component={TabNavigator}
								options={{
									headerShown: false,
								}}
							/>
				</Stack.Navigator>

    
  );
};
