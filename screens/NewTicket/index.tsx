import { yupResolver } from '@hookform/resolvers/yup';
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
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import * as yup from 'yup';

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

const schema = yup
  .object({
    title: yup.string().required('O nome do boleto é obrigatório'),
    due: yup.string().required('O vencimento do boleto é obrigatório'),
    value: yup
      .number()
      .positive('O valor do boleto deve ser um valor positivo')
      .required('O valor do boleto é obrigatório'),
    code: yup
      .number()
      .positive('O código do boleto deve ser um valor positivo')
      .integer('O código do boleto deve ser um valor inteiro')
      .required('O código do boleto é obrigatório'),
  })
  .required();

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
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={{ flex: 1 }}>
        <Header
          backgroundColor={colors[colorScheme].brand.background}
          leftComponent={
            <TouchableOpacity onPress={goBack}>
              <ArrowLeft color={colors[colorScheme].texts.inputs} size={24} />
            </TouchableOpacity>
          }
          statusBarProps={{
            barStyle:
              colorScheme === 'light' ? 'dark-content' : 'light-content',
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
              placeholder="Nome do Boleto"
              leftIcon={
                <FileText size={24} color={colors[colorScheme].brand.primary} />
              }
              errorMessage={errors.title?.message}
              {...register('title', {
                required: true,
              })}
            />
            <Input
              control={control}
              name="due"
              placeholder="Vencimento"
              leftIcon={
                <XCircle size={24} color={colors[colorScheme].brand.primary} />
              }
              errorMessage={errors.due?.message}
            />
            <Input
              control={control}
              name="value"
              placeholder="Valor"
              keyboardType="numeric"
              leftIcon={
                <Wallet size={24} color={colors[colorScheme].brand.primary} />
              }
              errorMessage={errors.value?.message}
            />
            <Input
              control={control}
              name="code"
              placeholder="Código"
              keyboardType="numeric"
              leftIcon={
                <Barcode size={24} color={colors[colorScheme].brand.primary} />
              }
              errorMessage={errors.code?.message}
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
    </TouchableWithoutFeedback>
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
