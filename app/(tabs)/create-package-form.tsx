import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default function CreatePackageForm() {
  return (
    <View style={styles.root}>
      <Text style={styles.h1}>Csomag indítása</Text>
      <Text style={styles.p}>Itt jön a részletes űrlap (méret, súly, fotók, címek…)</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#111827', padding: 24, gap: 8 },
  h1: { color: '#F8FAFC', fontSize: 22, fontWeight: '800' },
  p: { color: '#94A3B8' },
})
