import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { CircleBackgroundIcon, ErrorFaceIcon, FaceIDIcon, FingerprintIcon } from '@tallo/assets';
import { useAuthBootstrap, useBiometrics } from '@tallo/authentication';
import { Button, Margin, SVG, Text } from '@tallo/core-ui-library';
import { DropdownAlert, Screen } from '@tallo/core-ui-widgets';
import { NavigableRoute } from '@tallo/navigation';
import { useColorForBackgroundColor, useTheme } from '@tallo/themes';
import { ms } from '@tallo/utilities';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, useWindowDimensions, View } from 'react-native';
import { getUniqueId } from 'react-native-device-info';

export const Biometrics = ({ route }: { route: any }) => {
  const email = route?.params?.email;
  const colorScheme = useTheme();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const { t } = useTranslation();

  const [enable, setEnableBiometrics] = useState<boolean>(false);
  const biometrics = useBiometrics();

  const themeBackground = useColorForBackgroundColor('baseBackground');
  const { setBiometricsEnable, userBiometricsEnabled, setUserAuthorizedState, setUserHasBeenEnrolled } = useAuthBootstrap();

  useEffect(() => {
    const checkBioMetrics = async () => {
      if (enable) {
        try {
          if (biometrics.isBiometricsSupported) {
            /**
             * NEEDED TO PROMPT USER THE FIRST TIME FOR PERMISSION FROM APPLE
             */

            await biometrics.promptBiometrics();
            /**
             * REQUEST PASSWORD FROM BSWIFT TO USE FOR BIOMETRIC LOGIN
             */

            getPassword(currentUser.uid);
          } else if (!biometrics.isBiometricsSupported) {
            /**
             * BIOMETRICS NOT ENABLED ON DEVICE ALLOW USER TO SETUP FACEID THEN COME BACK TO APP AND ENABLE
             */

            DropdownAlert.show({
              title: t('onboard.FACE_ID_ALERT_1'),
              message: t('onboard.FACE_ID_MESSAGE_1'),
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
          }
        } catch (error) {
          /**
           * ERROR SAVING DEVICE ID TO SERVER
           */

          DropdownAlert.show({
            title: t('onboard.SERVER_ERROR'),
            message: t('onboard.CONTACT_BSWIFT'),
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
        }
      }
    };
    checkBioMetrics();
  }, [enable, biometrics?.isBiometricsSupported]);

  useEffect(() => {
    const setDeviceId = async () => {
      if (!userBiometricsEnabled) {
        const userName: any = currentUser.email;
        /**
         * STORE EMAIL AND GENERATED PASSWORD IN KEYCHAIN
         */

        biometrics.enableBiometrics(userName, password);

        const deviceID = await getUniqueId();
        const token = await AsyncStorage.getItem('@AntiForgeryToken');
        /**
         * SEND DEVICE ID TO BSWIFT FOR DEVICE CHECK and BIOMETRIC LOGIN
         */
        if (deviceID && token) {
          setBiometricEnrolled({ deviceID, token });
        }
        setBiometricsEnable(true);
        setUserHasBeenEnrolled(true);
        setUserAuthorizedState(true);

        // setTimeout(() => {
        //   navigation.dispatch(StackActions.replace(NavigableRoute.NOTIFICATION_PERMISSION));
        // }, 500);
      }
    };
    setDeviceId();
  }, [userBiometricsEnabled]);

  const enableBiometrics = async () => {
    setEnableBiometrics(true);
  };

  const optOutBiometrics = async () => {
    setUserHasBeenEnrolled(true);
    setUserAuthorizedState(true);
    // navigation.dispatch(StackActions.replace(NavigableRoute.NOTIFICATION_PERMISSION));
  };

  const biometricIcon = Platform.OS === 'ios' ? FaceIDIcon : FingerprintIcon;

  return (
    <Screen
      safeAreaMode="all"
      screenName={NavigableRoute.BIOMETRICS}
      backgroundColor={themeBackground}
      barStyle={colorScheme.colorThemeId === 'dark_mode' ? 'light-content' : 'dark-content'}
    >
      <View>
        <View>
          <View>
            <SVG
              tint={colorScheme.colorThemeId === 'dark_mode' ? 'onSecondary' : 'onInverseOutline'}
              localSVG={{
                SVG: CircleBackgroundIcon.SVG,
                size: { width, height },
              }}
            />
          </View>
          <View>
            <SVG
              tint={'onBackground'}
              localSVG={{
                ...biometricIcon,
                size: { width: ms(60), height: ms(60) },
              }}
            />
          </View>
        </View>
        <View>
          <Margin marginBottomStep={4} marginTopStep={4} crossAxisDistribution="center" axisDistribution="center">
            <Text textType="headerBold1" textAlign="left">
              {t('onboard.BIOMETRIC_LOGIN')}
            </Text>
          </Margin>
          <Margin marginBottomStep={6} crossAxisDistribution="center" axisDistribution="center">
            <Text textType="bodyHeavy2" textAlign="left">
              {t('onboard.ACCESS_ACCOUNT')}
            </Text>
          </Margin>
        </View>
        <View>
          <Margin direction="column" marginBottomStep={4}>
            <Button
              onClick={() => enableBiometrics()}
              buttonSize="medium"
              buttonType="primary"
              title={t('onboard.ENABLE_BIOMETRIC')}
              testID="ENABLE_BIOMETRIC"
            />
          </Margin>

          <Button
            onClick={() => optOutBiometrics()}
            tint="onDisabled"
            buttonType={colorScheme.colorThemeId === 'dark_mode' ? 'dark' : 'inverse'}
            buttonSize="medium"
            title={t('onboard.NOT_NOW')}
            titleColor={colorScheme.colorThemeId === 'light_mode' ? 'onDisabled' : 'onBackground'}
            testID={t('onboard.NOT_NOW')}
          />
        </View>
      </View>
    </Screen>
  );
};
