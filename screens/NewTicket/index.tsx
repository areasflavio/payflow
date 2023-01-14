import { useNavigation } from '@react-navigation/native';
import { Button, Header } from '@rneui/themed';
import {
  ArrowLeft,
  Barcode,
  FileText,
  Wallet,
  XCircle,
} from 'phosphor-react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import { StyledText } from '../../components/StyledText';
import { View as ThemedView } from '../../components/Themed';
import { colors } from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Input } from './components/Input';

const defaultValues = {
  title: '',
  due: '',
  value: undefined,
  code: undefined,
};

type FormData = {
  title: string;
  due: string;
  value: number;
  code: number;
};

export function NewTicket() {
  const colorScheme = useColorScheme();
  const { goBack } = useNavigation();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
  });

  const onSubmit = (data: any) => {
    console.log(data);
    Keyboard.dismiss();
  };

  const onChange = (arg: any) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log('errors', errors);

  return (
    <ThemedView style={{ flex: 1 }}>
      <Header
        backgroundColor={colors[colorScheme].brand.background}
        leftComponent={
          <TouchableOpacity onPress={goBack}>
            <ArrowLeft color={colors[colorScheme].texts.inputs} size={24} />
          </TouchableOpacity>
        }
        statusBarProps={{
          barStyle: colorScheme === 'light' ? 'dark-content' : 'light-content',
        }}
        containerStyle={{
          borderBottomWidth: 0,
          marginHorizontal: 24,
          marginVertical: 18,
        }}
      />

      <StyledText
        color={colors[colorScheme].texts.heading}
        fontFamily="Lexend-SemiBold"
        style={styles.title}
      >
        {`Preencha os dados\n do boleto`}
      </StyledText>

      <ScrollView style={styles.container}>
        <ThemedView>
          <Input
            control={control}
            name="title"
            placeholder="Nome do Boleto"
            leftIcon={
              <FileText size={24} color={colors[colorScheme].brand.primary} />
            }
          />
          <Input
            control={control}
            name="due"
            placeholder="Vencimento"
            leftIcon={
              <XCircle size={24} color={colors[colorScheme].brand.primary} />
            }
          />
          <Input
            control={control}
            name="value"
            placeholder="Valor"
            keyboardType="numeric"
            leftIcon={
              <Wallet size={24} color={colors[colorScheme].brand.primary} />
            }
          />
          <Input
            control={control}
            name="code"
            placeholder="Código"
            keyboardType="numeric"
            leftIcon={
              <Barcode size={24} color={colors[colorScheme].brand.primary} />
            }
          />
        </ThemedView>
      </ScrollView>

      <ThemedView style={styles.buttonContainer}>
        <Button
          title="Cancelar"
          type="outline"
          onPress={() => {
            reset(defaultValues);
            Keyboard.dismiss();
          }}
          titleStyle={[
            styles.buttonTitle,
            {
              color: colors[colorScheme].texts.body,
            },
          ]}
          buttonStyle={[
            styles.button,
            {
              borderColor: colors[colorScheme].shapes.stroke,
            },
          ]}
        />

        <Button
          title="Cadastrar"
          type="outline"
          onPress={handleSubmit(onSubmit)}
          titleStyle={[
            styles.buttonTitle,
            {
              color: colors[colorScheme].brand.primary,
            },
          ]}
          buttonStyle={[
            styles.button,
            {
              borderColor: colors[colorScheme].shapes.stroke,
            },
          ]}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    textAlign: 'center',
    fontSize: RFValue(20),
    lineHeight: RFValue(25),
  },
  buttonContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    width: Dimensions.get('window').width / 2,
    padding: 16,
    paddingBottom: getBottomSpace() + 16,
  },
  buttonTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: RFValue(15),
    lineHeight: RFValue(18),
  },
});
