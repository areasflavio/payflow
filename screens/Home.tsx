import { BottomSheet, Button, Divider } from '@rneui/themed';
import { Trash } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import BarCodeImg from '../assets/svg/barcode.svg';
import BarCodeDarkImg from '../assets/svg/barcode_dark.svg';
import { Header } from '../components/Header';
import { StyledText } from '../components/StyledText';
import { View as ThemedView } from '../components/Themed';
import { colors } from '../constants/Colors';
import { mockTickets, Ticket } from '../dtos/Ticket';
import useColorScheme from '../hooks/useColorScheme';
import { currency, dateDayMonthYear } from '../utils/format';

export function Home() {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const data = mockTickets;
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <Header size="lg" />

      <ThemedView style={styles.container}>
        <ThemedView
          backgroundColor={colors[colorScheme].brand.secondary}
          style={styles.heading}
        >
          {colorScheme === 'dark' ? (
            <BarCodeDarkImg width={56} />
          ) : (
            <BarCodeImg width={56} />
          )}
          <Divider
            orientation="vertical"
            width={1}
            color={colors[colorScheme].shapes.stroke}
            style={styles.headingDivider}
          />
          <StyledText
            color={colors[colorScheme].brand.background}
            fontFamily="Inter-Regular"
            style={styles.headingText}
          >
            {`Você tem `}
            <StyledText
              color={colors[colorScheme].brand.background}
              fontFamily="Inter-Bold"
              style={styles.headingText}
            >
              {`${data.length} boletos \n`}
            </StyledText>
            {`cadastrados para pagar`}
          </StyledText>
        </ThemedView>

        <StyledText
          color={colors[colorScheme].texts.heading}
          fontFamily="Lexend-SemiBold"
          style={styles.sectionTitle}
        >
          Meus boletos
        </StyledText>

        <Divider
          width={1}
          color={colors[colorScheme].shapes.stroke}
          style={styles.sectionDivider}
        />

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableNativeFeedback
              onLongPress={() => {
                setIsBottomSheetVisible(true);
                setSelectedTicket(item);
              }}
              background={TouchableNativeFeedback.Ripple(
                colors[colorScheme].shapes.boxes,
                false
              )}
            >
              <ThemedView style={styles.itemContainer}>
                <View>
                  <StyledText
                    color={colors[colorScheme].texts.heading}
                    fontFamily="Lexend-SemiBold"
                    style={styles.itemTitle}
                  >
                    {item.title}
                  </StyledText>
                  <StyledText
                    color={colors[colorScheme].texts.body}
                    fontFamily="Inter-Regular"
                    style={styles.itemDate}
                  >
                    {`Vence em `}
                    <StyledText
                      color={colors[colorScheme].texts.body}
                      fontFamily="Inter-SemiBold"
                      style={styles.itemDate}
                    >
                      {dateDayMonthYear(item.due)}
                    </StyledText>
                  </StyledText>
                </View>
                <StyledText
                  color={colors[colorScheme].texts.heading}
                  fontFamily="Inter-Regular"
                  style={styles.itemValue}
                >
                  {`R$ `}
                  <StyledText
                    color={colors[colorScheme].texts.heading}
                    fontFamily="Inter-SemiBold"
                    style={styles.itemValue}
                  >
                    {currency(item.value)}
                  </StyledText>
                </StyledText>
              </ThemedView>
            </TouchableNativeFeedback>
          )}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>

      <BottomSheet
        isVisible={isBottomSheetVisible}
        modalProps={{
          statusBarTranslucent: true,
        }}
        onBackdropPress={() => setIsBottomSheetVisible(false)}
        backdropStyle={{
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}
      >
        <ThemedView backgroundColor={colors[colorScheme].brand.background}>
          <View style={{ paddingHorizontal: 78, paddingVertical: 24 }}>
            <StyledText
              color={colors[colorScheme].texts.heading}
              fontFamily="Lexend-Regular"
              style={[styles.itemTitle, { textAlign: 'center' }]}
            >
              {`O boleto `}
              <StyledText
                color={colors[colorScheme].texts.heading}
                fontFamily="Lexend-SemiBold"
              >
                {selectedTicket?.title}
              </StyledText>
              {`\nno valor de R$ `}
              <StyledText
                color={colors[colorScheme].texts.heading}
                fontFamily="Lexend-SemiBold"
              >
                {currency(selectedTicket?.value!)}
              </StyledText>
              {`\nfoi pago ?`}
            </StyledText>
          </View>

          <View style={styles.bottomSheetButtonGroup}>
            <Button
              title="Ainda não"
              color={colors[colorScheme].shapes.boxes}
              size="lg"
              onPress={() => setIsBottomSheetVisible(false)}
              titleStyle={[
                styles.bottomSheetButtonTitle,
                {
                  color: colors[colorScheme].texts.heading,
                },
              ]}
              containerStyle={[
                styles.bottomSheetButton,
                {
                  backgroundColor: colors[colorScheme].shapes.boxes,
                },
              ]}
            />
            <Button
              title="Sim"
              color={colors[colorScheme].brand.primary}
              size="lg"
              titleStyle={[
                styles.bottomSheetButtonTitle,
                {
                  color: colors[colorScheme].brand.background,
                },
              ]}
              containerStyle={[
                styles.bottomSheetButton,
                {
                  backgroundColor: colors[colorScheme].brand.primary,
                },
              ]}
            />
          </View>

          <Button
            title="Deletar boleto"
            color={colors[colorScheme].brand.background}
            icon={
              <Trash
                size={18}
                color={colors[colorScheme].actions.delete}
                weight="regular"
              />
            }
            buttonStyle={styles.bottomSheetFooter}
            titleStyle={[
              styles.bottomSheetButtonTitle,
              {
                color: colors[colorScheme].actions.delete,
              },
            ]}
          />
        </ThemedView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -44,
    padding: 20,
    borderRadius: 5,
    margin: 24,
  },
  headingDivider: {
    marginHorizontal: 24,
    marginVertical: 6,
  },
  headingText: {
    fontSize: RFValue(13),
    lineHeight: RFValue(20),
  },
  sectionTitle: {
    fontSize: RFValue(20),
    lineHeight: RFValue(25),
    marginTop: 8,
    marginHorizontal: 24,
  },
  sectionDivider: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  itemTitle: {
    fontSize: RFValue(17),
    lineHeight: RFValue(21),
  },
  itemDate: {
    fontSize: RFValue(13),
    lineHeight: RFValue(16),
    marginTop: 6,
  },
  itemValue: {
    fontSize: RFValue(16),
    lineHeight: RFValue(19),
  },
  bottomSheetButtonGroup: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  bottomSheetButton: {
    width: '48%',
    borderRadius: 5,
  },
  bottomSheetButtonTitle: {
    fontFamily: 'Inter-Regular',
  },
  bottomSheetFooter: {
    padding: 16,
    paddingBottom: getBottomSpace() + 16,
  },
});
