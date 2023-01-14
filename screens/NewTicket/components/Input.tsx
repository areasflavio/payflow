import { Input as RNEInput, InputProps } from '@rneui/themed';
import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { colors } from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

interface Props extends InputProps {
  control: any;
  name: string;
}

export function Input({ control, name, ...rest }: Props) {
  const colorScheme = useColorScheme();

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <RNEInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholderTextColor={colors[colorScheme].texts.inputs}
            cursorColor={colors[colorScheme].brand.primary}
            style={[
              styles.input,
              {
                color: colors[colorScheme].texts.body,
                borderColor: colors[colorScheme].shapes.stroke,
              },
            ]}
            leftIconContainerStyle={[
              styles.icon,
              {
                borderColor: colors[colorScheme].shapes.stroke,
              },
            ]}
            {...rest}
          />
        )}
        name={name}
        rules={{ required: true }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: RFValue(15),
    lineHeight: RFValue(18),
  },
  icon: {
    borderRightWidth: 1,
    marginRight: 16,
  },
});
