import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Profile</ThemedText>
      <ThemedText>
        This is the Profile tab. Add user info, settings or logout buttons here.
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
});
