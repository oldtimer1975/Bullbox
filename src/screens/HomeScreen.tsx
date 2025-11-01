import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BullHead from '../../components/BullHead';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BullBox</Text>
      <Text style={styles.subtitle}>Aranyos, vicces, szeretni való bika fej – csak Nektek! 🐂❤️</Text>
      <View style={styles.bullContainer}>
        <BullHead width={320} height={400} />
      </View>
      <Text style={styles.bottomText}>
        Készen áll a bika! Jöhetnek a gombok, funkciók, buli! 😄
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 40 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 6, color: '#A8793B', letterSpacing: 2 },
  subtitle: { fontSize: 19, marginBottom: 10, color: '#F87171', fontWeight: '500', textAlign: 'center' },
  bullContainer: { width: 320, height: 400, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  bottomText: { fontSize: 16, color: '#888', marginTop: 10, textAlign: 'center' }
});

export default HomeScreen;
