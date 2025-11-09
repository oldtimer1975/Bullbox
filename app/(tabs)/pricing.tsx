import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default function Pricing() {
  return (
    <View style={styles.root}>
      <Text style={styles.h1}>Árkalkuláció</Text>
      <Text style={styles.p}>Alap képlet + faktorok – később ide jön a tényleges számítás.</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#111827', padding: 24, gap: 8 },
  h1: { color: '#F8FAFC', fontSize: 22, fontWeight: '800' },
  p: { color: '#94A3B8' },
})
