import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Input({ label, error, ...props }) {
  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={[styles.input, error && styles.inputError]} {...props} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: 4, fontWeight: '600', color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#dbe1ee',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#222'
  },
  inputError: { borderColor: '#e03636' },
  error: { color: '#e03636', marginTop: 2, fontSize: 13 }
});
