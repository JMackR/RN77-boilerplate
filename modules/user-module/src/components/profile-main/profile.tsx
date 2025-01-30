import React from 'react';
//import { View, Text } from 'react-native';
import { styles } from './profile-main-styles';
import { Margin } from '@tallo/core-ui-library/margin/margin';
import { Text } from '@tallo/core-ui-library/text/text';
export const ProfileMain = () => {

	return (
		<Margin direction={'row'} crossAxisDistribution={'center'} axisDistribution={'center'}>
			<Text color={'brand'}>ProfileMain</Text>
		</Margin>
	);
}