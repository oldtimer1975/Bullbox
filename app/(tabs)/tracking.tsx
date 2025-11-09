import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default function Tracking() {
  return (
    <View style={styles.root}>
      <Text style={styles.h1}>Követés</Text>
      <Text style={styles.p}>Itt lehet majd élőben követni a csomagot / futárt.</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#111827', padding: 24, gap: 8 },
  h1: { color: '#F8FAFC', fontSize: 22, fontWeight: '800' },
  p: { color: '#94A3B8' },
})
