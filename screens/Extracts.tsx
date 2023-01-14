import { Divider } from '@rneui/themed';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Header } from '../components/Header';
import { StyledText } from '../components/StyledText';
import { View as ThemedView } from '../components/Themed';
import { Ticket } from '../components/Ticket';
import { colors } from '../constants/Colors';
import { mockTickets } from '../dtos/Ticket';
import useColorScheme from '../hooks/useColorScheme';

export function Extracts() {
  const data = mockTickets;
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <Header size="md" />

      <ThemedView style={styles.container}>
        <View style={styles.heading}>
          <StyledText
            color={colors[colorScheme].texts.heading}
            fontFamily="Lexend-SemiBold"
            style={styles.title}
          >
            Meus extratos
          </StyledText>
          <StyledText
            color={colors[colorScheme].texts.body}
            fontFamily="Inter-Regular"
            style={styles.titleSpan}
          >
            {`${data.length} pagos`}
          </StyledText>
        </View>

        <Divider
          width={1}
          color={colors[colorScheme].shapes.stroke}
          style={styles.divider}
        />

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Ticket ticket={item} />}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    marginHorizontal: 24,
  },
  title: {
    fontSize: RFValue(20),
    lineHeight: RFValue(25),
  },
  titleSpan: {
    fontSize: RFValue(13),
    lineHeight: RFValue(16),
  },
  divider: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
});
