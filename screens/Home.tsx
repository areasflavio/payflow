import { Divider } from '@rneui/themed';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import BarCodeImg from '../assets/svg/barcode.svg';
import BarCodeDarkImg from '../assets/svg/barcode_dark.svg';
import { Header } from '../components/Header';
import { StyledText } from '../components/StyledText';
import { View as ThemedView } from '../components/Themed';
import { colors } from '../constants/Colors';
import { mockTickets } from '../dtos/Ticket';
import useColorScheme from '../hooks/useColorScheme';
import { currency, dateDayMonthYear } from '../utils/format';

export function Home() {
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
          )}
          ItemSeparatorComponent={() => <ThemedView style={{ height: 32 }} />}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -64,
    padding: 20,
    borderRadius: 5,
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
    marginTop: 32,
  },
  sectionDivider: {
    marginTop: 24,
    marginBottom: 32,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
