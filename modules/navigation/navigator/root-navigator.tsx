import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {

  EmailSignin,

} from '@tallo/authentication/src/components/email-signin';

import { NavigableRoute } from '@tallo/navigation';
import { Text } from 'react-native';

const Bob = () => {
  return (
    <Text>Hi BOB</Text>
  )}

export const RootNavigator = () => {
  const Stack = createNativeStackNavigator();

// console.log('EmailSignin',EmailSignin)

  return (

      <NavigationContainer>
     
       
            <Stack.Navigator initialRouteName={"bob"} screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name={"bob"}
                component={EmailSignin}
                // options={{ headerShown: false }}
              />
             
             
            </Stack.Navigator>


      </NavigationContainer>

  );
};
