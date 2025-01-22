import { useNavigation } from '@react-navigation/native';
import { XmarkIcon } from '@tallo/assets';
import { useAuthBootstrap } from '@tallo/authentication';
import { Button, Flex, Margin, SVG, Stack, Text } from '@tallo/core-ui-library';
import { Dialog } from '@tallo/core-ui-widgets';

export const LogoutDialog = () => {
  const navigation = useNavigation();
  const { setUserAuthorizedState, clearAuthState } = useAuthBootstrap();

  const logUserOut = async () => {
    clearAuthState(); // dev only - remove this line
    // setUserAuthorizedState(false);
  };

  const dismiss = () => {
    navigation.goBack();
  };

  return (
    <Dialog onPress={dismiss}>
      <Flex direction="column" height={200} style={{ padding: 16 }}>
        <Stack direction="row" axisDistribution="flex-end" childSeparationStep={4} grow={1}>
          <Margin direction="column" width={"80%"} marginBottomStep={4}>
            <Text textType="headerMedium2">{'Are you sure you want to sign out?'}</Text>
          </Margin>
          <Margin axisDistribution="flex-start">
            <SVG
              localSVG={{ SVG: XmarkIcon.SVG, size: { width: 22, height: 22 } }}
              tint="onBackground"
              onPress={dismiss}
            />
          </Margin>
        </Stack>
        <Stack direction="row" axisDistribution="flex-end" childSeparationStep={4}>
          <Button
            accessibilityLabel={'more.CANCEL_TXT'}
            onClick={async () => dismiss()}
            buttonSize="medium"
            buttonType="text"
            title={'Cancel'}
            titleColor="brand"
          />
          <Button
            accessibilityLabel={'more.LOGOUT_CONFIRM_ANSWER'}
            buttonSize="medium"
            buttonType="primary"
            title={'Confirm'}
            onClick={logUserOut}
          />
        </Stack>
      </Flex>
    </Dialog>
  );
};
