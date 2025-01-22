import { PermissionsLocationIcon } from '@tallo/assets';
import { Button, Margin, Overlay, SVG, Stack, Text } from '@tallo/core-ui-library';
import { Screen } from '@tallo/core-ui-widgets/screen';
import { NavigableRoute } from '@tallo/navigation';
import { useEffect, } from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { useAuthBootstrap } from '../hooks/useAuthBootstrap';

export const LocationPermissions = ({ navigation }) => {
  const { setLocationPermission } = useAuthBootstrap();

  useEffect(() => {
    setLocationPermission(true)
  }, []);


  const requestAlways = async () => {
    request(Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION : PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)')
            break
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable')
            navigation.navigate(NavigableRoute.NOTIFICATION_PERMISSIONS);

            break
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible')
            break
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            navigation.navigate(NavigableRoute.NOTIFICATION_PERMISSIONS);

            break
          case RESULTS.BLOCKED:
            console.log('The ALWYAYS permission is denied and not requestable anymore')
            navigation.navigate(NavigableRoute.NOTIFICATION_PERMISSIONS);
            break
        }
      })
      .catch((error) => { })
  }
  const requestLocation = async () => {
    request(Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then((result) => {
        console.log('what is the result?', result);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            navigation.navigate(NavigableRoute.NOTIFICATION_PERMISSIONS);
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            requestAlways()
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            navigation.navigate(NavigableRoute.NOTIFICATION_PERMISSIONS);
            break;
        }
      })
      .catch((error) => { });
  };


  return (
    <Screen safeAreaMode={'all'} screenName={'permissions-location'}>

      <Margin
        grow={1}
        direction={'column'}
        marginTopStep={6}
        crossAxisDistribution="center"
        marginLeftStep={4}
        marginRightStep={4}
      >
        <Stack direction={'column'} crossAxisDistribution="center" childSeparationStep={8}>
          <SVG localSVG={{ SVG: PermissionsLocationIcon.SVG, size: { height: 85, width: 76 } }} tint={'brand'} />
          <Text textType="headerBold1" color="primary" textAlign={'center'} testID={'permissions-location.title'}>
            Allow Location Access
          </Text>
          <Text textType="bodyMedium1" color="primary" textAlign={'center'} testID={'permissions-location.body'}>
            Upward Run Club uses your location to track your runs to provide you info like the route and pace. This data is only collected while you're using the tracker in the background or foreground. This data is not shared and only stored if you choose to save the activity.
          </Text>
        </Stack>
      </Margin>
      <Margin>
        <Overlay grow={1} direction="row" insetBottomStep={15}>
          <Margin grow={1} direction={'column'} axisDistribution={'center'} marginLeftStep={4} marginRightStep={4}>
            <Margin marginBottomStep={2} direction="column">
              <Button
                testID={'permissions-location.allow'}
                title={'Continue'}
                buttonType={'primary'}
                buttonSize={'large'}
                onClick={requestLocation}
              />
            </Margin>

          </Margin>
        </Overlay>
      </Margin>
    </Screen>
  );
};
