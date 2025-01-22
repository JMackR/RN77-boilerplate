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
import { OpenURL } from '@tallo/user/src/components/linking-helper';
import { useAuthBootstrap } from '../hooks/useAuthBootstrap';
import { ValidatedForm, ValidatedRowSelect } from '@tallo/core-ui-widgets/forms';


export const EmailSignin = () => {
  const { t } = useTranslation();
  const dimensions = useWindowDimensions();
  const { ms } = useScale(dimensions);
  const { termsAccept, setTerms } = useAuthBootstrap();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { signInWithBioMetrics, setEmail, signInWithEmail, username, setPassword, loading, isBiometricsEnabled, error, } =
    useSignIn();
  const [initialItem, setInitialItem] = useState<string>('');
  const isFocused = useIsFocused();
  const [terms, setLocalTerms] = useState<boolean>(false);

  useEffect(() => {
    if (termsAccept) {
      setLocalTerms('0' as unknown as boolean);
      setInitialItem('0');
    }

  }, [termsAccept]);

  const url = Config.FORGOT_PASSWORD_URL;
  const reset = async () => {
    if (url)
      await Linking.openURL(url);
  }
  const version = getReadableVersion();
  useEffect(() => {
    if (username) {
      LogRocket.identify(username)
    }
  }, [username]);

  useEffect(() => {
    if (error) {

      DropdownAlert.show({
        title: "Sorry",
        message: `Please check your password and email.`,
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
  }, [error]);
  const biometricIcon = Platform.OS === 'ios' ? FaceIDIcon : FingerprintIcon;

  const BASE_MARGINS = {
    marginLeftStep: isTablet ? ms(10) : ms(5),
    marginRightStep: isTablet ? ms(10) : ms(5),
  };

  const handleTermsAndPrivacyNavigation = async (url: string) => {
    try {
      OpenURL(url);
    } catch (error) {
      console.log('handleTermsAndPrivacyNavigation error', error);
    }

  }
  const handleTerms = async (boolean: boolean) => {
    setLocalTerms(boolean);
    setTerms(boolean);
  }

  return (
    <Screen safeAreaMode="all" screenName="email_login" backgroundColor='brand' >
      <ScrollView>
        <ValidatedForm
          validators={{
            email: [RequiredValidator, EmailValidator],
            password: [RequiredValidator],
            terms: [RequiredValidator],
          }}
        >
          <Margin direction="column" axisDistribution="center" crossAxisDistribution="center">
            {/* <Border color={'onBackground'} cornerRadius={'large'}> */}
            <Image source={require('./images/logo.png')} resizeMode={'contain'} style={{
              width: SCREEN_WIDTH * 0.7,
              height: SCREEN_WIDTH * 0.5,
              marginTop: -30
            }} />
            {/* </Border> */}
          </Margin>
          <Margin direction="column">
            {/* <LocalImage source={require('./images/image1.png')} width={300} height={200} resizeMode="contain" /> */}
            <Margin shrink={0} direction="column" crossAxisDistribution="center" marginBottomStep={2} marginTopStep={8}>
              <Text textType="headerMedium1" color="light" textAlign="left">
                {t('onboard.SIGN_IN')}
              </Text>
            </Margin>
            <Margin direction="column" {...BASE_MARGINS}>
              <Flex width={'100%'} direction="column" style={{ flexShrink: 0 }}>
                <Margin shrink={0} direction="column" marginStep={4}>
                  <ValidatedInput
                    title={'Email'}
                    roleProp="email"
                    placeholder="Enter email"
                    textChangeHandler={(text) => setEmail(text)}
                    keyboardType="email-address"
                    returnKeyType="done"
                    trailingIcon={!loading && isBiometricsEnabled && isFocused ? biometricIcon : undefined}
                    onClick={() => signInWithBioMetrics()}
                    textColor={'primary'}
                    titleColor={'light'}
                    borderColor={'clear'}
                    textType="bodyRegular2"
                    background='primary'
                  />
                </Margin>

                <Margin shrink={0} direction="column" marginStep={4}>
                  <ValidatedInput
                    title={'Password'}
                    roleProp="password"
                    placeholder="Enter password"
                    textChangeHandler={(text) => setPassword(text)}
                    keyboardType="default"
                    returnKeyType="done"
                    borderColor={'clear'}
                    trailingIcon={!loading && isBiometricsEnabled && isFocused ? biometricIcon : undefined}
                    onClick={() => signInWithBioMetrics()}
                    textColor={'primary'}
                    titleColor={'light'}
                    textType="bodyRegular2"
                    secureTextEntry={true}
                    background='primary'
                  />
                </Margin>
                <Margin shrink={0} direction="column" marginBottomStep={4} crossAxisDistribution="flex-end">
                  <Button
                    title={'Forgot password?'}
                    accessibilityLabel={t('onboard.NEED_HELP')}
                    titleColor="light"
                    titleSize={16}
                    buttonSize="small"
                    buttonType="text"
                    onClick={async () => reset()}
                  />
                </Margin>
                <SelectableContextProvider multiSelect={false} initialSelections={[initialItem]}>
                  <ValidatedRowSelect
                    roleProp='terms'
                    selectId={terms ? '0' : '1'}
                    mainContent="By proceeding, I agree with the Terms of Use & Privacy Policy"
                    onDidSelect={() => handleTerms(true)}
                    onDidDeselect={() => handleTerms(false)}
                    errorMessage={"Please accept the terms of use and privacy policy"}
                  />
                </SelectableContextProvider>
                <Margin direction='row' axisDistribution='center' marginTopStep={1}>
                  <Stack direction='row' axisDistribution='center' childSeparationStep={4}>
                    <Margin>
                      <Button
                        title={'Privacy Policy'}
                        accessibilityLabel={"terms of service"}
                        titleColor="light"
                        titleSize={12}
                        buttonSize="small"
                        buttonType="text"
                        onClick={() => handleTermsAndPrivacyNavigation('https://upwardrunning.com/privacy-policy/')}
                      />
                      <Separator />
                    </Margin>
                    <Margin>
                      <Button
                        title={'Terms of Use'}
                        accessibilityLabel={'privacy policy'}
                        titleColor="light"
                        titleSize={12}
                        buttonSize="small"
                        buttonType="text"
                        onClick={() => handleTermsAndPrivacyNavigation('https://upwardrunning.com/terms-of-use/')}
                      />
                      <Separator />
                    </Margin>
                  </Stack>
                </Margin>
                <Margin shrink={0} direction="column" marginStep={4} marginTopStep={10}>
                  <ValidatedFormButton
                    onClick={() => signInWithEmail()}
                    loading={loading}
                    title={t('onboard.SIGN_IN_BUTTON')}
                    buttonSize="large"
                    buttonType={username?.length === 0 || initialItem?.length === 0 ? 'disabled' : 'brand-alt'}
                    accessibilityLabel={t('onboard.SIGN_IN_BUTTON')}
                    // disabled={initialItem?.length === 0}
                    loader
                  />
                </Margin>
              </Flex>
            </Margin>
          </Margin>
        </ValidatedForm>
        <Margin axisDistribution="center" crossAxisDistribution="center">
          <Text textType="bodyRegular4">{`${Config.ENV}: VERSION ${version}`}</Text>
        </Margin>
      </ScrollView>

    </Screen>
  );
};
