import AsyncStorage from '@react-native-async-storage/async-storage';
//import { RootState } from '@tallo/store';
import { useAppSelector, RootState } from '@tallo/store/index.native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useBiometrics } from '../biometrics-provider/biometricsProvider';

type AuthBootstrapTypes = {
  locationPermission: boolean;
  userHasBeenEnrolled: boolean; // USER has been enrolled in a plan
  currentlyEnrolled: boolean;
  userBiometricsEnabled: boolean;
  userAuthorized: boolean; // USER IS AUTHORIZED TO USE THE APP
  initializing: boolean;
  termsAccept: boolean;
  setTerms: (boolean: boolean) => void;
  setLocationPermission: (boolean: boolean) => void;
  setUserCurrentlyEnrolled: (boolean: boolean) => void;
  setUserHasBeenEnrolled: (boolean: boolean) => void;
  setUserAuthorizedState: (boolean: boolean) => void;
  setBiometricsEnable: (boolean: boolean) => void;
  setNotificationsEnable: (boolean: boolean) => void;
  clearAuthState: () => void;
};
const autBootstrap: AuthBootstrapTypes = {
  locationPermission: false,
  userHasBeenEnrolled: false,
  currentlyEnrolled: false,
  userBiometricsEnabled: false,
  userAuthorized: false,
  initializing: false,
  termsAccept: false,
  setTerms: () => { },
  setLocationPermission: () => { },
  setUserCurrentlyEnrolled: () => { },
  setUserHasBeenEnrolled: () => { },
  setUserAuthorizedState: () => { },
  setBiometricsEnable: () => { },
  setNotificationsEnable: () => { },
  clearAuthState: () => { },
};
const AuthBootStrapContext = createContext<AuthBootstrapTypes>(autBootstrap);

export const useAuthBootstrap = () => {
  const context = useContext(AuthBootStrapContext);
  if (!context) {
    throw new Error('This components context is not available');
  }
  return context;
};
const useAuthBootstrapProvider = () => {
  const isForcedLogout = useAppSelector((state: RootState) => state.auth.forcedLogout);
  const [userHasBeenEnrolled, setHasBeenEnrolled] = useState(false);
  const [currentlyEnrolled, setCurrentlyEnrolled] = useState(false);
  const [userBiometricsEnabled, setUserBiometricsEnable] = useState(false);
  const [userAuthorized, setUserAuthorized] = useState(false);
  const [userNotificationsEnabled, setUserNotificationsEnabled] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [locationPermission, setLocation] = useState(false);
  const [termsAccept, setTermsAccept] = useState(false);
  const biometrics = useBiometrics();

  const setTerms = async (terms: boolean) => {
    await AsyncStorage.setItem('terms', JSON.stringify(terms));
    setTermsAccept(terms);
  };
  const setLocationPermission = async (location: boolean) => {
    await AsyncStorage.setItem('location', JSON.stringify(location));
    setLocation(location);
  };
  const setUserHasBeenEnrolled = async (enrolled: boolean) => {
    await AsyncStorage.setItem('enrolled', JSON.stringify(enrolled));
    setHasBeenEnrolled(enrolled);
  };
  const setUserCurrentlyEnrolled = async (verifed: boolean) => {
    await AsyncStorage.setItem('currentlyEnrolled', JSON.stringify(verifed));
    setCurrentlyEnrolled(verifed);
  };
  const setUserAuthorizedState = async (signedIn: boolean) => {
    await AsyncStorage.setItem('userAuthorized', JSON.stringify(signedIn));
    setUserAuthorized(signedIn);
  };
  const setBiometricsEnable = async (isEnabled: boolean) => {
    setUserBiometricsEnable(isEnabled);
  };
  const setNotificationsEnable = async (isEnabled: boolean) => {
    await AsyncStorage.setItem('notificationsIsEnabled', JSON.stringify(isEnabled));
    setUserNotificationsEnabled(isEnabled);
  };

  const clearAuthState = async () => {
    await AsyncStorage.multiRemove(['enrolled', 'phoneVerified', 'userAuthorized', 'location']);
    setInitializing(false);
    setUserAuthorized(false);
  };

  useEffect(() => {
    /**
     * Dev purposes only to clear everything
     */
    // const clearAuthState = async () => {
    //   await AsyncStorage.multiRemove(['enrolled', 'phoneVerified', 'userAuthorized']);
    //   setInitializing(false);
    // };

    const createAuthState = async () => {
      try {
        const enrolled = await AsyncStorage.getItem('enrolled');
        const hasBeenEnrolledFromStorage = await AsyncStorage.getItem('hasBeenEnrolled');
        const notificationsEnabled = await AsyncStorage.getItem('notificationsIsEnabled');
        const userAuthorized = await AsyncStorage.getItem('userAuthorized');
        const location = await AsyncStorage.getItem('location');
        const terms = await AsyncStorage.getItem('terms');
        const biometricsEnabled = biometrics.isBiometricsEnabled;


        if (terms) {
          if (terms === 'true') {
            setTerms(true)
          } else {
            setTerms(false)
          }
        }
        if (location) {
          setLocationPermission(true)
        }
        if (enrolled) {
          setHasBeenEnrolled(true);
        }
        if (hasBeenEnrolledFromStorage) {
          setCurrentlyEnrolled(true);
        }
        if (biometricsEnabled) {
          setUserBiometricsEnable(true);
        }
        if (userAuthorized) {
          setUserAuthorized(true);
        }

        if (notificationsEnabled) {
          setUserNotificationsEnabled(true);
        }

        setInitializing(false);
      } catch (e) {
        setInitializing(false);
      }
    };
    if (!userAuthorized) {
      createAuthState();
    }

    // clearAuthState()
  }, []);

  /**
   * Clears authentication tokens and signs the user out for reauthentication
   */
  useEffect(() => {
    if (isForcedLogout) {
      async function logOutUser() {
        // if (__DEV__) {
        //   clearAuthState();
        // }
        setUserAuthorized(false);
      }

      logOutUser();
    }
  }, [isForcedLogout]);

  return {
    locationPermission,
    userHasBeenEnrolled,
    currentlyEnrolled,
    userBiometricsEnabled,
    userAuthorized,
    userNotificationsEnabled,
    initializing,
    termsAccept,
    setTerms,
    setLocationPermission,
    setUserHasBeenEnrolled,
    setUserCurrentlyEnrolled,
    setNotificationsEnable,
    setUserAuthorizedState,
    setBiometricsEnable,
    clearAuthState,
  };
};
interface BoostrapProps {
  children: React.ReactNode;
}
export const AuthBootstrapProvider = (props: BoostrapProps) => {
  const { children } = props;
  const authBootStrap = useAuthBootstrapProvider();

  return <AuthBootStrapContext.Provider value={authBootStrap}>{children}</AuthBootStrapContext.Provider>;
};
