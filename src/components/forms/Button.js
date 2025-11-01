import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ text, onPress, type = "primary", style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.base,
        type === "primary" ? styles.primary : styles.outline,
        style
      ]}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          type === "primary" ? styles.textPrimary : styles.textOutline
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minWidth: 80,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3,
  },
  primary: {
    backgroundColor: '#5a63ff',
    borderWidth: 0,
  },
  outline: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#5a63ff',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  textPrimary: {
    color: '#fff',
  },
  textOutline: {
    color: '#5a63ff',
  },
});
