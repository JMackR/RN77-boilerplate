import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ValidatedFormContext } from './validated-form';
import { WithValidatorsProps, isEmpty } from '@tallo/utilities';
import { LocalSVGSource, InputProps, Text } from '@tallo/core-ui-library';
import { SelectableRow } from '../selectable-row';

export interface ValidatedFormInputProps extends InputProps, Pick<WithValidatorsProps, 'validateOnChange'> {
    roleProp: string;
    style?: object;
    mainContent?: string;
    placeholder?: string;
    onSubmitEditing?: any;
    tint?: string;
    trailingIcon?: LocalSVGSource | JSX.Element;
    onClick?: () => void;
}

export const ValidatedRowSelect = (props: any) => {
    const { roleProp, errorMessage } = props;
    const { onSubmit, onChangeValue, value, error } = useContext(ValidatedFormContext);
    console.log("error", error);

    useEffect(() => {
        onChangeValue(roleProp, undefined);
        return () => onChangeValue(roleProp, undefined);
    }, []);

    const onChange = (newValue?: string) => {

        onChangeValue(roleProp, newValue);
        // Commenting out onChangeValue here because we have it already above(line 18), but leaving
        // in case we have issues with this commented out
    };

    return (<><SelectableRow
        selectId={props.selectId}
        mainContent={props.mainContent}
        onDidSelect={(selectedId: string) => {
            onChange(selectedId);
            if (props.onDidSelect) {
                props.onDidSelect(selectedId);
            }

        }}
        onDidDeselect={() => {
            onChange(undefined);
            if (props.onDidDeselect) {
                props.onDidDeselect('');
            }

        }}
        transparentBg={true}
        doNotApplyHorizontalPadding={false}
        leftIcon={true}
        noIcon={true}
        iconTint={'light'}
        mainContentTint={'light'}
        mainContentTextType={'bodyRegular1'}
    />
        {error[roleProp] && (<View style={styles.inputContainer} >
            <Text textType='bodyBold3' color='error'>{errorMessage}</Text></View>)}
    </>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
