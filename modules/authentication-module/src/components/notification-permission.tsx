import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { BellIcon } from '@tallo/assets';
import { Button, Margin, Overlay, SVG, Stack, Text } from '@tallo/core-ui-library';
import { Screen } from '@tallo/core-ui-widgets';
import { NavigableRoute } from '@tallo/navigation';
import { StorageController, USER_PRESENTED_NOTIFICATION, ms } from '@tallo/utilities';

async function checkApplicationPermission(navigation: any) {
  const userPresentedNotification = StorageController(USER_PRESENTED_NOTIFICATION);
  try {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      userPresentedNotification.setItem('true');
      navigation.navigate(NavigableRoute.EMAIL_PREFERENCES);
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
      userPresentedNotification.setItem('true');
      navigation.navigate(NavigableRoute.EMAIL_PREFERENCES);
    } else {
      console.log('User has notification permissions disabled');
      userPresentedNotification.setItem('false');
      navigation.navigate(NavigableRoute.EMAIL_PREFERENCES);
    }
  } catch (error) {
    console.log('Error checking notification permissions: ', error);
  }
}

export const NotificationPermission = () => {
  const navigation = useNavigation<any>();
  const userPresentedNotification = StorageController(USER_PRESENTED_NOTIFICATION);
  const requestPushPermission = async () => {
    const options = {
      alert: true,
      badge: true,
      sound: true,
      provisional: false,
    };
    checkApplicationPermission(navigation);
  };

  const onNotNow = async () => {
    userPresentedNotification.setItem('false');
    navigation.navigate(NavigableRoute.EMAIL_PREFERENCES);
  };

  return (
    <Screen safeAreaMode={'all'} screenName={'permissions-location'}>
      {/* <Border color={'onBackground'} cornerRadius={'large'}>
        <Margin height={100} width={"100%"} direction="column" marginStep={2} axisDistribution='center' crossAxisDistribution='center'>
          <Text >LOGO PLACEHOLDER</Text>
        </Margin>
      </Border> */}
      <Margin
        grow={1}
        direction={'column'}
        marginTopStep={6}
        crossAxisDistribution="center"
        marginLeftStep={4}
        marginRightStep={4}
      >
        <Stack direction={'column'} crossAxisDistribution="center" childSeparationStep={8}>
          <SVG
            tint={'brand'}
            localSVG={{
              ...BellIcon,
              size: { width: ms(60), height: ms(60) },
            }}
          />
          <Text textAlign="left" textType="headerBold1">
            {'Enable Notifications'}
          </Text>
          <Margin direction="column" marginTopStep={4} marginBottomStep={4}>
            <Text textType="bodyRegular1" textAlign="left">
              {'Enable Notifications to receive important updates and alerts.'}
            </Text>
          </Margin>
        </Stack>
      </Margin>
      <Margin>
        <Overlay grow={1} direction="row" insetBottomStep={15}>
          <Margin grow={1} direction={'column'} axisDistribution={'center'} marginLeftStep={4} marginRightStep={4}>
            <Margin marginBottomStep={2} direction="column">
              <Button
                accessibilityLabel={'ENABLE_NOTIFICATIONS'}
                testID={'notification-permission.allow'}
                buttonType={'primary'}
                buttonSize={'large'}
                title={'Enable Notifications'}
                onClick={() => requestPushPermission()}
              />
            </Margin>
            <Button
              buttonSize="large"
              buttonType="inverse"
              tint="brandAlt"
              titleColor="brand"
              title={'Not Now'}
              onClick={() => onNotNow()}
            />
          </Margin>
        </Overlay>
      </Margin>
    </Screen>
  );
};
