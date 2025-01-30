import LogRocket from '@logrocket/react-native';
import { useIsFocused } from '@react-navigation/native';
import { ErrorFaceIcon, FaceIDIcon, FingerprintIcon } from '@tallo/assets';
import { Flex, Margin, Separator, Stack, SVG, Text } from '@tallo/core-ui-library';
import { Button } from '@tallo/core-ui-library/button';
import { DropdownAlert, Screen, SelectableContextProvider, SelectableRow, SelectableRowProps, ValidatedFormButton, ValidatedInput } from '@tallo/core-ui-widgets';
import { EmailValidator, isTablet, RequiredValidator, useScale } from '@tallo/utilities';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, ScrollView, useWindowDimensions, Image, Linking } from 'react-native';
import { useSignIn } from '../hooks/useSignin';
import Config from 'react-native-config';
import { getReadableVersion } from 'react-native-device-info';
import { useAuthBootstrap } from '../hooks/useAuthBootstrap';
import { ValidatedForm, ValidatedRowSelect } from '@tallo/core-ui-widgets/forms';


export const EmailSignin = () => {
  const { t } = useTranslation();
  const dimensions = useWindowDimensions();
  const { ms } = useScale(dimensions);
  // const { termsAccept, setTerms } = useAuthBootstrap();
  // const { width: SCREEN_WIDTH } = useWindowDimensions();
  // const { signInWithBioMetrics, setEmail, signInWithEmail, username, setPassword, loading, isBiometricsEnabled, error, } =
  //   useSignIn();
  const [initialItem, setInitialItem] = useState<string>('');
  const isFocused = useIsFocused();
  const [terms, setLocalTerms] = useState<boolean>(false);



  const url = Config.FORGOT_PASSWORD_URL;
  const reset = async () => {
    if (url)
      await Linking.openURL(url);
  }
  const version = getReadableVersion();


  const biometricIcon = Platform.OS === 'ios' ? FaceIDIcon : FingerprintIcon;

  const BASE_MARGINS = {
    marginLeftStep: isTablet ? ms(10) : ms(5),
    marginRightStep: isTablet ? ms(10) : ms(5),
  };



  return (
    <Screen safeAreaMode="all" screenName="email_login" backgroundColor='primary' >
      <ScrollView>
       
        <Margin axisDistribution="center" crossAxisDistribution="center">
          <Text textType="bodyRegular4">{`Hi BOB`}</Text>
        </Margin>
      </ScrollView>

    </Screen>
  );
};
