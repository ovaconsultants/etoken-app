import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {styles} from './TokenManagementTVScreen.styles';

// Component to display the token table
export const TokenTable = ({tokens}) => (
  <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
    <View>
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>Token No</Text>
        <Text style={styles.tableHeader}>Patient Name</Text>
        <Text style={styles.tableHeader}>Status</Text>
        <Text style={styles.tableHeader}>Fee Status</Text>
        <Text style={styles.tableHeader}>Emergency</Text>
      </View>

      {(tokens ?? []).map(token => (
        <View key={token.token_id} style={styles.tableRow}>
          <Text style={styles.tableCell}>{token.token_no}</Text>
          <Text style={styles.tableCell}>{token.patient_name}</Text>
          <Text style={styles.tableCell}>{token.status}</Text>
          <Text style={styles.tableCell}>{token.fee_status}</Text>
          <Text style={styles.tableCell}>
            {token.emergency === 'Y' ? 'Yes' : 'No'}
          </Text>
        </View>
      ))}
    </View>
  </ScrollView>
);
