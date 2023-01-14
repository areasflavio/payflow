import { Divider } from '@rneui/themed';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Header } from '../../components/Header';
import { StyledText } from '../../components/StyledText';
import { View as ThemedView } from '../../components/Themed';
import { colors } from '../../constants/Colors';
import { mockTickets, Ticket as TicketDTO } from '../../dtos/Ticket';
import useColorScheme from '../../hooks/useColorScheme';

import { BottomSheet } from './components/BottomSheet';
import { Heading } from './components/Heading';
import { Ticket } from './components/Ticket';

export function Home() {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketDTO | null>(null);

  const data = mockTickets;
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <Header size="lg" />

      <ThemedView style={styles.container}>
        <Heading ticketsCount={data.length} />

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
            <Ticket
              onBottomSheetVisible={setIsBottomSheetVisible}
              onSelectedTicket={setSelectedTicket}
              ticket={item}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>

      <BottomSheet
        isVisible={isBottomSheetVisible}
        onBackdropPress={setIsBottomSheetVisible}
        selectedTicket={selectedTicket!}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
