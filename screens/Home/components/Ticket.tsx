import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { StyledText } from '../../../components/StyledText';
import { View as ThemedView } from '../../../components/Themed';
import { colors } from '../../../constants/Colors';
import { Ticket } from '../../../dtos/Ticket';
import useColorScheme from '../../../hooks/useColorScheme';
import { currency, dateDayMonthYear } from '../../../utils/format';

interface Props {
  ticket: Ticket;
  onBottomSheetVisible: (value: boolean) => void;
  onSelectedTicket: (ticket: Ticket) => void;
}

export function Ticket({
  onBottomSheetVisible,
  onSelectedTicket,
  ticket,
}: Props) {
  const colorScheme = useColorScheme();

  return (
    <TouchableNativeFeedback
      onLongPress={() => {
        onBottomSheetVisible(true);
        onSelectedTicket(ticket);
      }}
      background={TouchableNativeFeedback.Ripple(
        colors[colorScheme].shapes.boxes,
        false
      )}
    >
      <ThemedView style={styles.container}>
        <View>
          <StyledText
            color={colors[colorScheme].texts.heading}
            fontFamily="Lexend-SemiBold"
            style={styles.title}
          >
            {ticket.title}
          </StyledText>
          <StyledText
            color={colors[colorScheme].texts.body}
            fontFamily="Inter-Regular"
            style={styles.date}
          >
            {`Vence em `}
            <StyledText
              color={colors[colorScheme].texts.body}
              fontFamily="Inter-SemiBold"
              style={styles.date}
            >
              {dateDayMonthYear(ticket.due)}
            </StyledText>
          </StyledText>
        </View>
        <StyledText
          color={colors[colorScheme].texts.heading}
          fontFamily="Inter-Regular"
          style={styles.value}
        >
          {`R$ `}
          <StyledText
            color={colors[colorScheme].texts.heading}
            fontFamily="Inter-SemiBold"
            style={styles.value}
          >
            {currency(ticket.value)}
          </StyledText>
        </StyledText>
      </ThemedView>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: RFValue(17),
    lineHeight: RFValue(21),
  },
  date: {
    fontSize: RFValue(13),
    lineHeight: RFValue(16),
    marginTop: 6,
  },
  value: {
    fontSize: RFValue(16),
    lineHeight: RFValue(19),
  },
});
