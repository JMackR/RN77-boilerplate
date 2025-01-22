import { useNavigation } from '@react-navigation/native';
import { HelpIcon } from '@tallo/assets';
import { Background, Border, Button, Margin, SVG, Stack, Text } from '@tallo/core-ui-library';
import { Dialog, ValidatedInput } from '@tallo/core-ui-widgets';
import { hs } from '@tallo/utilities';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import Config from 'react-native-config';

const HELP_ICON_SIZE = 50;

export const LoginHelpDialog = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const url = Config.FORGOT_PASSWORD_URL;
  const INNER_MARGINS = {
    marginLeftStep: hs(2),
    marginRightStep: hs(2),
  };

  const dismiss = () => {
    navigation.goBack();
  };
  const reset = async () => {
    await Linking.openURL(url);
  }
  return (
    <Dialog onPress={dismiss}>
      <Border width={'100%'} cornerRadius="large" direction="column" {...INNER_MARGINS} color="alwaysLight">
        <Background borderRadius={5} type={'baseBackground'} />
        <Margin axisDistribution="center" crossAxisDistribution="center" marginStep={4}>
          <SVG
            tint={'primary'}
            localSVG={{
              ...HelpIcon,
              size: {
                width: HELP_ICON_SIZE,
                height: HELP_ICON_SIZE,
              },
            }}
          />
        </Margin>
        <Stack direction="column">
          <Margin direction="column" marginLeftStep={4} marginRightStep={4}>
            <Text testID="need_help" textType="headerMedium1" textAlign="left">{`${t('onboard.NEED_HELP')}`}</Text>
            <Text testID="message_1" textType="bodyRegular2">
              {`${t('onboard.HELP_MESSAGE_1')}`}
              <Text testID="message_2" textType="bodyMedium2">
                {t('onboard.HELP_MESSAGE_2')}
              </Text>
              {`${t('onboard.HELP_MESSAGE_3')}`}
            </Text>
            <Text testID="message_4" textType="bodyRegular2">
              {t('onboard.HELP_MESSAGE_4')}
            </Text>
          </Margin>
        </Stack>
        <Margin shrink={0} direction="column" marginStep={4}>
          <ValidatedInput
            title={'Email'}
            roleProp="email"
            placeholder="Enter email"
            textChangeHandler={(text) => setEmail(text)}
            keyboardType="email-address"
            returnKeyType="done"
            textColor={'primary'}
            tintColor={'primary'}
            borderColor={'clear'}
            textType="bodyRegular2"
          />
        </Margin>
        <Margin
          marginTopStep={6}
          marginBottomStep={4}
          direction="column"
          marginLeftStep={4}
          marginRightStep={4}
          axisDistribution="center"
        >
          <Button
            testID="close"
            buttonSize="medium"
            buttonType="primary"
            title={"Reset Password"}
            onClick={async () => reset()}
          />
        </Margin>
      </Border>
    </Dialog>
  );
};
