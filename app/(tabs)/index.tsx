import React from 'react'
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import BrandLogo from '../../src/components/BrandLogo'
import { colors, radius, space } from '../../src/theme/tokens'

export default function HomeTab() {
  const { width } = useWindowDimensions()
  const isWide = width >= 900

  const buttonBase = { paddingVertical: 14, paddingHorizontal: 20, borderRadius: radius.md, width: 280, alignItems: 'center' } as const

  return (
    <SafeAreaView style={[styles.page, { backgroundColor: colors.bg.base }]}>
      <View style={[styles.layout, { flexDirection: isWide ? 'row' : 'column' }]}>
        <View style={[styles.left, { padding: isWide ? space.xl : space.lg }]}>
          <BrandLogo variant="courier" size={isWide ? 360 : 220} />
          <View style={{ height: space.lg }} />
          <View style={[styles.roundRow, { gap: space.lg }]}>
            <Link href="/(tabs)/courier-dashboard" asChild>
              <Pressable accessibilityLabel="Futár mód" style={({ pressed }) => [styles.roundCta, { backgroundColor: colors.brand.accent, opacity: pressed ? 0.85 : 1 }]}>
                <Text style={styles.roundCtaText}>Futár</Text>
              </Pressable>
            </Link>
            <Link href="/(tabs)/create-package" asChild>
              <Pressable accessibilityLabel="Ügyfél mód" style={({ pressed }) => [styles.roundCta, { borderWidth: 2, borderColor: colors.fg.muted, opacity: pressed ? 0.85 : 1, backgroundColor: 'transparent' }]}>
                <Text style={styles.roundCtaText}>Ügyfél</Text>
              </Pressable>
            </Link>
          </View>
        </View>
        <View style={[styles.right, { padding: isWide ? space.xl : space.lg }]}>
          <Text style={styles.title}>BullBox</Text>
          <Text style={styles.subtitle}>Gyors, közösségi csomagküldés</Text>
          <View style={{ height: space.xl }} />
          <Link href="/(tabs)/courier-dashboard" asChild>
            <Pressable style={({ pressed }) => [buttonBase, { backgroundColor: colors.brand.accent, opacity: pressed ? 0.9 : 1 }]} accessibilityLabel="Futárként belépek">
              <Text style={styles.btnText}>Futárként belépek</Text>
            </Pressable>
          </Link>
          <View style={{ height: space.md }} />
          <Link href="/(tabs)/create-package" asChild>
            <Pressable style={({ pressed }) => [buttonBase, { borderWidth: 1, borderColor: colors.fg.muted, opacity: pressed ? 0.9 : 1 }]} accessibilityLabel="Ügyfélként feladok">
              <Text style={styles.btnText}>Ügyfélként feladok</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  layout: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.xl },
  left: { alignItems: 'center', justifyContent: 'center' },
  right: { alignItems: 'center', justifyContent: 'center', minWidth: 320 },
  title: { color: colors.fg.primary, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.fg.muted, fontSize: 14, marginTop: 6, textAlign: 'center' },
  btnText: { color: colors.fg.primary, fontWeight: '700' },
  roundRow: { alignItems: 'center', justifyContent: 'center' },
  roundCta: { width: 112, height: 112, borderRadius: 9999, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 4 },
  roundCtaText: { color: colors.fg.primary, fontWeight: '800', fontSize: 16 }
})