import { useNavigation } from '@react-navigation/native';
import { DropdownAlert } from '@tallo/core-ui-widgets';
import { NavigableRoute } from '@tallo/navigation';
import { useAppDispatch } from '@tallo/store/index.native';
import { useGetApiUserCurrentUserInfoQuery, useLazyGetApiUserCurrentUserInfoQuery, usePostApiAuthLoginMutation } from '@tallo/store/upwardapi';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useBiometrics } from '../biometrics-provider/biometricsProvider';
import { setToken } from '../provider/authSlice';
import { useAuthBootstrap } from './useAuthBootstrap';
import { SVG } from '@tallo/core-ui-library';
import { ErrorFaceIcon } from '@tallo/assets';


export const useSignIn = () => {
  const { isBiometricsEnabled, promptBiometrics } = useBiometrics();
  const [username, setEmail] = useState<string | undefined>('');
  const [password, setPassword] = useState<string | undefined>('');
  const [appVersion, setAppVersion] = useState<string>('');
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { setUserAuthorizedState, setUserHasBeenEnrolled, locationPermission } = useAuthBootstrap();
  const [login, { data, isLoading, error }] = usePostApiAuthLoginMutation();

  const [getUserInfo] = useLazyGetApiUserCurrentUserInfoQuery();
  const { data: userInfoData, error: currentUserError } = useGetApiUserCurrentUserInfoQuery(undefined, { skip: !data?.hasUpwardRunningSubscription });

  console.log(":userInfoData", error);

  useEffect(() => {
    if (currentUserError) {
      getUserInfo()
    }
  }, [currentUserError, data?.hasUpwardRunningSubscription]);

  useEffect(() => {
    if (userInfoData && !userInfoData.hasViewedWelcomeVideo) {
      return navigation.navigate(NavigableRoute.WELCOME_VIDEO);
    } else if (userInfoData && userInfoData.currentChallengeID === 0) {
      return navigation.navigate(NavigableRoute.ONBOARDING_STACK)
    } else if (userInfoData && userInfoData.currentChallengeID !== 0 && locationPermission) {
      setUserAuthorizedState(true);
      setUserHasBeenEnrolled(true);
      return
    } else if (userInfoData && userInfoData.currentChallengeID !== 0 && !locationPermission) {
      return navigation.navigate(NavigableRoute.LOCATION_PERMISSIONS)
    }
  }, [userInfoData]);

  useEffect(() => {
    if (data && !data.hasUpwardRunningSubscription) {

      DropdownAlert.show({
        title: "Sorry",
        message: `No active subscription exists for this user. Please purchase a subscription.`,
        type: 'error',
        autoHide: false,
        renderIcon: () => (
          <SVG
            tint={'primary'}
            localSVG={{
              ...ErrorFaceIcon,
            }}
          />
        ),
      });
      // navigation.navigate(NavigableRoute.LOGIN_HELP);
    }
  }, [data]);


  useEffect(() => {
    if (data && data.upwrJWToken) {
      dispatch(setToken({ upwrJWToken: data.upwrJWToken }));
    }
  }, [data]);

  const signInWithBioMetrics = async () => {
    /**
     * SETUP BIOMETRICS LOGIN
     */
    try {
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const signInWithEmail = async () => {
    DropdownAlert.hideAll();

    if (username && password) {
      /**
       * TODO setup to listen to api response
       */
      try {
        await login({
          upwardIdentityCredentials: { username: username, password: password },
        });
        console.log('login ERROR:::', error);
        //console.log('LOGIN DATA:::', loginData);

        if (!error) {
          // if (userHasBeenEnrolled) {
          //   navigation.navigate(NavigableRoute.APP_STACK);
          // } else {

          // }
        }
      } catch (e) {
        console.log('ERROR:::', e);
      }
    }
    // dispatch(updateUserData({ name: 'BOB Hope', email: username, imageUrl: undefined }));
    // handleFooterButtonClicked();
    Keyboard.dismiss();
  };

  return {
    signInWithEmail,
    signInWithBioMetrics,
    setEmail,
    promptBiometrics,
    setAppVersion,
    setPassword,
    password,
    appVersion,
    loading: isLoading,
    isBiometricsEnabled,
    username,
    error
  };
};
